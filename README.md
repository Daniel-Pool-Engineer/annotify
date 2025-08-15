# annotify

A React-based web application that allows users to paste in text (100–1000 words) and automatically generate five annotations using the [OpenRouter API](https://openrouter.ai). Each annotation includes a quoted excerpt, an annotation type (`Clarify`, `Connect`, `Extend`, or `Note`), and a short explanation. The results are displayed in a sidebar with navigation controls.

This project was inspired by [Perusall](https://www.perusall.com/) to create annotation that upholds a certain standard of the quality of annotations. 
Perusall is an online social-interactive platform that allows a group of students to annotate as they read an assigned article. This software is used by many US universities today.

---

## ✨ Features
- **Paste & Edit Text**: Users can paste or type text directly into the input box.
- **Character & Word Count**: Displays real-time statistics.
- **Annotation Generation**: Automatically requests 5 annotations from the OpenRouter API.
- **Fallback Mode**: Generates simple annotations if API fails.
- **Annotation Navigation**: Navigate between annotations with a card-style sidebar.
- **Responsive Design**: Styled with custom CSS for clean presentation.


---

## ⚙️ Requirements
- **Node.js** v16+
- **npm** or **yarn**
- An **OpenRouter API key**

---

## 🚀 Setup & Installation

1. **Clone the repository**
   ```bash
   git clone <your-repo-url>
   cd <project-folder>

2. **Install dependencies**
  npm install

3. **Set up environment variables**
  Create a .env file in the project root:

     VITE_OPENROUTER_KEY=your_openrouter_api_key_here

4. **Run the development server**
    '''bash
    npm run dev

---

## 🖥 Usage

    1. Paste or type text (between 100 and 1000 words) into the text area.

    2. Click "Generate Annotations".

    3. View annotations in the right-hand sidebar and navigate between them using arrows.

    4. If the API fails, fallback annotations will be shown.

---
## 🛠 Technologies Used

    1. React (Frontend framework)

    2. Vite (Build tool & dev server)

    3. OpenRouter API (Annotation generation)

    4. CSS (Custom styling)

---
## 📜 License
This project is licensed under the MIT License.

---
## 🎥 Demonstration
