import React, { useState } from 'react';
import './App1.css';

function App1({ annotations, error, textToAnnotate }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const currentAnnotation = annotations[currentIndex];

  return (
    <div className="annotation-sidebar">

      <div className="annotation-card">
        <div className="card-header">
          <span className={`annotation-type ${currentAnnotation.type.toLowerCase()}`}>
            {currentAnnotation.type}
          </span>
          <div className="annotation-nav">
            <button
              className="nav-button"
              onClick={() => setCurrentIndex(prev => Math.max(prev - 1, 0))}
              disabled={currentIndex === 0}
            >
              &lt;
            </button>
            <span className="nav-counter">{currentIndex + 1} / {annotations.length}</span>
            <button
              className="nav-button"
              onClick={() => setCurrentIndex(prev => Math.min(prev + 1, annotations.length - 1))}
              disabled={currentIndex === annotations.length - 1}
            >
              &gt;
            </button>
          </div>
        </div>
        <div className="card-content">
          <div className="text-preview">
            {highlightText(textToAnnotate, currentAnnotation.quote)}
          </div>
          <div className="quote-container">
            <p className="quote">"{currentAnnotation.quote}"</p>
          </div>
          <p className="annotation-text">{currentAnnotation.annotation}</p>
        </div>
      </div>
      {error && (
        <div className="error-message">
          <p>⚠️ {error}</p>
          <p>Using simplified annotations instead.</p>
        </div>
      )}
    </div>
  );
}


export default App1;
