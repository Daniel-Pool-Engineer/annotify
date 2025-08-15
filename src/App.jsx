import { useState } from 'react';
import App1 from './App1.jsx';
import './App.css';

function App() {
  const [text, setText] = useState('');
  const [annotations, setAnnotations] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const OR_KEY = import.meta.env.VITE_OPENROUTER_KEY;

  const handlePaste = (e) => {
    const pastedText = e.clipboardData.getData('text');
    setText(pastedText);
  };

  const handleChange = (e) => {
    setText(e.target.value);
  };

  async function query(data) {
    const res = await fetch('https://openrouter.ai/api/v1/chat/completions', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${OR_KEY}`,
        'Content-Type': 'application/json',
        'HTTP-Referer': window.location.origin,
        'X-Title': 'Annotation Demo',
      },
      body: JSON.stringify(data),
    });
    if (!res.ok) {
      let msg = `HTTP ${res.status}`;
      try {
        const j = await res.json();
        msg = j?.error?.message || j?.message || msg;
      } catch {
        msg = (await res.text()) || msg;
      }
      throw new Error(msg);
    }
    return res.json();
  }

  const processResponse = (content) => {
    const normalized = content
      .replace(/\r/g, '')
      .replace(/^\s*[-*\d.]+\s+/gm, '');
    return normalized
      .split('\n\n')
      .map((b) => b.trim())
      .filter(Boolean)
      .map((block) => {
        const lines = block.split('\n').map((l) => l.trim()).filter(Boolean);
        const quote = (lines[0] || '').replace(/^"(.*)"$/, '$1').trim() || 'Text excerpt';
        const typeLine = lines[1] || '';
        const typeMatch = typeLine.match(/Type:\s*(Clarify|Connect|Extend|Note)/i);
        const type = typeMatch ? typeMatch[1] : 'Note';
        let annotation = '';
        if (typeLine.includes(':')) {
          annotation = typeLine.split(':').slice(1).join(':').replace(/^[\s–—-]+/, '');
        }
        if (!annotation) annotation = lines.slice(1).join(' ');
        return { quote, type, annotation: annotation || '—' };
      })
      .slice(0, 5);
  };

  const handleGenerate = async () => {
    if (!text.trim()) {
      return alert('Please ensure the text is between 100 and 1000 words.');
    }

    setIsLoading(true);
    setError(null);
    setAnnotations([]);

    try {
      const response = await query({
        //model: 'openai/gpt-oss-20b:novita', //<============================================================================================================================================
        temperature: 0.7,
        max_tokens: 800,
        messages: [
          {
            role: 'system',
content:
  'Generate annotations for key topics of the provided passage.\n' +
  'For each annotation, output exactly two lines:\n' +
  'Quote: copy a short, relevant line from the passage.\n' +
  'Type: Clarify | Connect | Extend — Explanation\n' +
  'Do not include any other text or formatting.'
          },
          { role: 'user', content: `Generate annotations from any parts of the article: ${text}` },
        ],
      });

      const content = response.choices?.[0]?.message?.content ?? '';
      if (!content.trim()) throw new Error('Empty response from API');
      setAnnotations(processResponse(content));
    } catch (e) {
      console.error('Generation failed:', e);
      // Avoid calling an undefined helper; just show the message
      setError(e instanceof Error ? e.message : 'Request failed');

      // Create fallback annotations
      const fallbackAnnotations = text
        .split(/[.!?]/)
        .map((s) => s.trim())
        .filter((s) => s.length > 20)
        .slice(0, 5)
        .map((sentence) => ({
          quote: sentence,
          type: 'General',
          annotation: "Couldn't generate analysis. Showing original text.",
        }));
      setAnnotations(fallbackAnnotations);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="paste-container">
      <div className="paste-box">
        <textarea
          value={text}
          onChange={handleChange}
          onPaste={handlePaste}
          placeholder="Minimum of 100 words. Maximum of 1000 words. Please paste in the text that you would like to annotate."
          className="paste-textarea"
        />
        <div className="stats">
          <p>Character Count: {text.length}&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; Word Count: {text.trim() ? text.trim().split(/\s+/).length : 0}
             &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
            <button 
            onClick={handleGenerate} 
            disabled={!text.trim() || isLoading}
            className= "generate-btn"
          >annotatify</button>
          </p>
        </div>
      </div>
      {annotations.length > 0 && (
        <App1 annotations={annotations} error={error} textToAnnotate={text} />
      )}
    </div>
  );
}

export default App;