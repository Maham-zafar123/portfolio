// Logo for every skill / tech name used on the site.
//   dv: Devicon colour SVG (file name under icons/<name>/)
//   si: Simple Icons monochrome mark, tinted with `color` (omit to follow the text colour)
//   fa: Font Awesome class, for concepts that have no logo
const DEVICON = 'https://cdn.jsdelivr.net/npm/devicon@2.18.0/icons'
const SIMPLE_ICONS = 'https://cdn.jsdelivr.net/npm/simple-icons@16.36.0/icons'

const registry = {
  // Languages
  Python: { dv: 'python-original' },
  JavaScript: { dv: 'javascript-original' },
  'C++': { dv: 'cplusplus-original' },
  Java: { dv: 'java-original' },
  SQL: { dv: 'azuresqldatabase-original' },
  JSON: { dv: 'json-original' },

  // Web
  'Vue.js': { dv: 'vuejs-original' },
  React: { dv: 'react-original' },
  Django: { si: 'django' },
  FastAPI: { dv: 'fastapi-original' },
  'Node.js': { dv: 'nodejs-original' },
  Express: { si: 'express' },
  Streamlit: { dv: 'streamlit-original' },
  'Tailwind CSS': { dv: 'tailwindcss-original' },
  'REST APIs': { fa: 'fa-solid fa-plug' },
  REST: { fa: 'fa-solid fa-plug' },

  // AI / ML
  TensorFlow: { dv: 'tensorflow-original' },
  Keras: { dv: 'keras-original' },
  PyTorch: { dv: 'pytorch-original' },
  OpenCV: { dv: 'opencv-original' },
  'Scikit-learn': { dv: 'scikitlearn-original' },
  'Hugging Face': { si: 'huggingface', color: '#FFD21E' },
  Transformers: { si: 'huggingface', color: '#FFD21E' },
  Donut: { si: 'huggingface', color: '#FFD21E' },
  'LLM Fine-Tuning': { fa: 'fa-solid fa-sliders' },
  'LLM Evaluation': { fa: 'fa-solid fa-gauge-high' },
  NLP: { fa: 'fa-solid fa-language' },
  'Feature Engineering': { fa: 'fa-solid fa-gears' },
  CNN: { fa: 'fa-solid fa-network-wired' },

  // Generative & agentic AI
  RAG: { fa: 'fa-solid fa-magnifying-glass-chart' },
  'Agentic Pipelines': { fa: 'fa-solid fa-diagram-project' },
  R2R: { fa: 'fa-solid fa-route' },
  LangChain: { si: 'langchain' },
  LangGraph: { si: 'langgraph' },
  CrewAI: { si: 'crewai', color: '#FF5A50' },
  ChromaDB: { fa: 'fa-solid fa-cubes-stacked' },
  FAISS: { si: 'meta', color: '#0467DF' },
  'Google Gemini': { si: 'googlegemini', color: '#8E75B2' },
  Groq: { fa: 'fa-solid fa-bolt' },
  Tavily: { fa: 'fa-solid fa-globe' },
  'Vision-Language Models': { fa: 'fa-solid fa-eye' },
  'Prompt Engineering': { fa: 'fa-solid fa-terminal' },

  // Data
  Pandas: { si: 'pandas' },
  NumPy: { dv: 'numpy-original' },
  Matplotlib: { dv: 'matplotlib-original' },
  Plotly: { dv: 'plotly-original' },
  'Data Cleaning': { fa: 'fa-solid fa-broom' },
  EDA: { fa: 'fa-solid fa-chart-column' },
  MySQL: { dv: 'mysql-original' },
  MongoDB: { dv: 'mongodb-original' },
  'Oracle SQL': { dv: 'oracle-original' },
  SQLite: { dv: 'sqlite-original' },
  FPDF: { fa: 'fa-solid fa-file-pdf' },

  // Tools & methods
  Git: { dv: 'git-original' },
  GitHub: { si: 'github' },
  'VS Code': { dv: 'vscode-original' },
  'Google Colab': { dv: 'googlecolab-original' },
  CUDA: { si: 'nvidia', color: '#76B900' },
  Jupyter: { dv: 'jupyter-original' },
  'Agile / Scrum': { fa: 'fa-solid fa-arrows-spin' },
  SDLC: { fa: 'fa-solid fa-recycle' },
  'AI Automation': { fa: 'fa-solid fa-robot' },
}

const fallback = { fa: 'fa-solid fa-code' }

export function iconFor(name) {
  const entry = registry[name] ?? fallback
  if (entry.dv) {
    const folder = entry.dv.replace(/-(original|plain).*$/, '')
    return { type: 'img', src: `${DEVICON}/${folder}/${entry.dv}.svg`, invert: !!entry.invert }
  }
  if (entry.si) return { type: 'mask', src: `${SIMPLE_ICONS}/${entry.si}.svg`, color: entry.color }
  return { type: 'fa', className: entry.fa }
}
