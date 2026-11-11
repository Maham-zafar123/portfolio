// All portfolio content lives here, so updating the site means editing this file only.

export const profile = {
  name: 'Maham Zafar',
  firstName: 'Maham',
  title: 'AI Engineer & Full-Stack Developer',
  roles: ['AI Engineer', 'Software Engineer', 'LLM & RAG Architect', 'Agentic AI Developer', 'Full-Stack Developer'],
  headline:
    'I build production-ready Agentic RAG systems, fine-tune transformer models, and ship complete web applications with Vue.js, Django and FastAPI.',
  intro:
    'a Software & AI Engineer building production-ready LLM, RAG and agentic systems, and the Vue.js, Django and FastAPI apps around them.',
  summary: [
    'Results-driven Software Engineer and AI Engineer with enterprise-level experience in Generative AI, Large Language Models (LLMs), Retrieval-Augmented Generation (RAG) and R2R Agentic pipelines, complemented by hands-on full-stack web development with Vue.js, Django and SQL.',
    'I have architected and deployed Agentic RAG systems, fine-tuned Vision-Language models for intelligent document processing, built automation workflows, and delivered end-to-end web applications. I care about scalable, data-driven AI that solves real-world problems.',
  ],
  location: 'Pakistan',
  email: 'mahamzafar231@gmail.com',
  linkedin: 'https://www.linkedin.com/in/maham-zafar-84695726b/',
  github: 'https://github.com/Maham-zafar123',
  resume: 'Maham_Zafar_CV.pdf',
  photo: 'images/profile.png',
}

export const stats = [
  { value: 4, suffix: '', label: 'Internships' },
  { value: 8, suffix: '+', label: 'Projects Built' },
  { value: 95, suffix: '%', label: 'IDP Accuracy' },
  { value: 3.68, suffix: '', label: 'CGPA / 4.0', decimals: 2 },
]

// Two disciplines, shown side by side so both AI and web recruiters find their fit fast.
export const tracks = [
  {
    id: 'ai',
    eyebrow: 'Track 01',
    title: 'AI Engineering',
    tagline: 'LLMs, RAG and agents that solve real problems, not demos.',
    icon: 'fa-solid fa-brain',
    points: [
      'Agentic RAG pipelines with LangChain, LangGraph, R2R and vector search',
      'Fine-tuning & evaluating transformers and Vision-Language models',
      'Document AI: 95% field accuracy on handwritten forms without OCR',
      'Inference services and AI APIs with FastAPI',
    ],
    stack: ['Python', 'PyTorch', 'Hugging Face', 'LangChain', 'LangGraph', 'Google Gemini', 'ChromaDB', 'FastAPI'],
    proof: [
      { label: 'DonutDoc · VLM fine-tune', href: '#projects' },
      { label: 'DocuMind AI · multi-doc RAG', href: '#projects' },
      { label: 'Multi-agent research system', href: '#projects' },
    ],
    roles: ['AI Engineer', 'ML Engineer', 'LLM / GenAI Engineer'],
  },
  {
    id: 'web',
    eyebrow: 'Track 02',
    title: 'Full-Stack Web',
    tagline: 'Clean, responsive products from database to pixel.',
    icon: 'fa-solid fa-code',
    points: [
      'Component-driven Vue.js and React frontends with Tailwind CSS',
      'REST APIs and backends in Django, FastAPI, Node.js and Express',
      'Relational and document data: SQL, MySQL, SQLite, MongoDB',
      'Auth, file uploads, history and dashboards, shipped with Git & Agile',
    ],
    stack: ['Vue.js', 'React', 'JavaScript', 'Tailwind CSS', 'Django', 'Node.js', 'Express', 'MongoDB'],
    proof: [
      { label: 'Rasant Solutions · Vue + Django', href: '#experience' },
      { label: 'DonutDoc · React + Node + FastAPI', href: '#projects' },
      { label: 'This site · Vue 3 + Vite + Tailwind', href: '#top' },
    ],
    roles: ['Full-Stack Developer', 'Frontend (Vue / React)', 'Backend (Django / Node)'],
  },
]

export const focusAreas = [
  { icon: 'fa-solid fa-diagram-project', title: 'LLM & RAG', text: 'Retrieval-augmented systems with chunking, embeddings, semantic search and grounded generation.' },
  { icon: 'fa-solid fa-robot', title: 'Agentic AI', text: 'Multi-agent pipelines with LangGraph and R2R that research, reason, act and refine.' },
  { icon: 'fa-solid fa-wand-magic-sparkles', title: 'Generative AI', text: 'Fine-tuning and evaluating transformer and Vision-Language models for real tasks.' },
  { icon: 'fa-solid fa-layer-group', title: 'Full-Stack', text: 'Vue.js and React frontends on Django, FastAPI and Express backends with SQL and MongoDB.' },
]

export const experience = [
  {
    role: 'Software Engineer Intern',
    company: 'Rasant Solutions',
    period: 'Sep 2026 – Oct 2026',
    type: 'Full-Stack',
    points: [
      'Built and maintained web application features as a full-stack developer, using Vue.js on the frontend and Django on the backend.',
      'Developed responsive, component-based Vue.js interfaces and connected them to Django REST endpoints for dynamic data.',
      'Designed SQL queries, managed database models and worked with relational data for application features and reporting.',
      'Collaborated on debugging, code reviews and feature delivery in an Agile workflow with Git.',
    ],
    tech: ['Vue.js', 'Django', 'SQL', 'REST', 'Git'],
  },
  {
    role: 'Software Engineer Intern (FYP)',
    company: 'NASTP',
    location: 'Rawalpindi, Pakistan',
    period: 'Sep 2025 – Jul 2026',
    type: 'AI Engineering',
    points: [
      'Developed AI-powered document processing with Python, FastAPI and Hugging Face Transformers to extract structured data from scanned and handwritten documents.',
      'Fine-tuned and evaluated Donut Vision-Language models on a domain-specific dataset of NASTP leave-application forms.',
      'Built RESTful APIs with FastAPI and Node.js/Express connecting AI inference services to web apps and storage.',
      'Contributed to an end-to-end Generative AI document workflow: ingestion, processing, structured JSON extraction and result management.',
    ],
    tech: ['Python', 'FastAPI', 'Hugging Face', 'Donut', 'Node.js'],
  },
  {
    role: 'Data Analyst Intern',
    company: 'Punjab Group of Colleges',
    location: 'Kabirwala, Pakistan',
    period: 'Jun 2025 – Aug 2025',
    type: 'Data Analytics',
    points: [
      'Analysed student attendance, academic performance and enrollment data to surface patterns, trends and inconsistencies.',
      'Used Python, Pandas, NumPy and Matplotlib for cleaning, preprocessing, analysis and visualisation.',
      'Prepared analytical reports and visualisations to support data-driven decision-making.',
    ],
    tech: ['Python', 'Pandas', 'NumPy', 'Matplotlib'],
  },
  {
    role: 'Exploratory Data Analyst Intern',
    company: 'AICP',
    location: 'Remote, Lahore',
    period: 'Jan 2025 – Mar 2025',
    type: 'Data Analytics',
    points: [
      'Performed exploratory data analysis (EDA) to identify patterns, trends, inconsistencies and insights.',
      'Prepared reports and visualisations communicating data-driven insights for decision-making.',
    ],
    tech: ['Python', 'Pandas', 'EDA', 'Matplotlib'],
  },
]

export const skillGroups = [
  {
    id: 'ai',
    label: 'AI / Machine Learning',
    icon: 'fa-solid fa-brain',
    skills: ['LLM Fine-Tuning', 'LLM Evaluation', 'NLP', 'Feature Engineering', 'TensorFlow', 'Keras', 'PyTorch', 'Hugging Face', 'CNN', 'Transformers', 'OpenCV', 'Scikit-learn'],
  },
  {
    id: 'genai',
    label: 'Generative & Agentic AI',
    icon: 'fa-solid fa-robot',
    skills: ['RAG', 'Agentic Pipelines', 'R2R', 'LangChain', 'LangGraph', 'CrewAI', 'ChromaDB', 'FAISS', 'Google Gemini', 'Groq', 'Vision-Language Models', 'Prompt Engineering'],
  },
  {
    id: 'languages',
    label: 'Languages',
    icon: 'fa-solid fa-code',
    skills: ['Python', 'JavaScript', 'C++', 'Java', 'SQL', 'JSON'],
  },
  {
    id: 'web',
    label: 'Web & Frameworks',
    icon: 'fa-solid fa-layer-group',
    skills: ['Vue.js', 'React', 'Django', 'FastAPI', 'Node.js', 'Express', 'Streamlit', 'Tailwind CSS', 'REST APIs'],
  },
  {
    id: 'data',
    label: 'Data & Databases',
    icon: 'fa-solid fa-database',
    skills: ['Pandas', 'NumPy', 'Matplotlib', 'Plotly', 'Data Cleaning', 'MySQL', 'MongoDB', 'Oracle SQL', 'SQLite'],
  },
  {
    id: 'tools',
    label: 'Tools & Methods',
    icon: 'fa-solid fa-screwdriver-wrench',
    skills: ['Git', 'GitHub', 'VS Code', 'Google Colab', 'CUDA', 'Jupyter', 'Agile / Scrum', 'SDLC', 'AI Automation'],
  },
]

export const projectFilters = [
  { id: 'all', label: 'All' },
  { id: 'genai', label: 'Generative AI' },
  { id: 'agentic', label: 'Agentic AI' },
  { id: 'dl', label: 'Deep Learning' },
]

export const projects = [
  {
    title: 'DonutDoc',
    subtitle: 'Intelligent Document Processing System',
    badge: 'Final Year Project · Sponsored by NASTP',
    featured: true,
    category: 'dl',
    image: 'images/projects/donutdoc.jpeg',
    description:
      'Full-stack, OCR-free document processing system that uses the Donut Vision-Language Model to extract structured data from scanned and handwritten NASTP leave-application forms with 95% accuracy.',
    points: [
      'Fine-tuned Donut (Swin Transformer encoder + BART decoder) on handwritten and synthetic forms for structured field extraction without traditional OCR.',
      'FastAPI inference service integrated with a Node.js/Express backend and React frontend for upload, processing, JSON generation and result management.',
      'Supports JPG, PNG and multi-page PDFs with document history, processing status, authentication and archived results.',
    ],
    tech: ['Python', 'Donut', 'Hugging Face', 'FastAPI', 'Node.js', 'Express', 'React', 'MongoDB', 'CUDA'],
    github: 'https://github.com/Maham-zafar123/DonutDoc-OCR-Free-Document-Generator',
    metrics: [
      { value: '95%', label: 'field accuracy' },
      { value: '0', label: 'OCR engines' },
      { value: '4', label: 'file formats' },
    ],
    pipeline: [
      { label: 'Upload', icon: 'fa-solid fa-cloud-arrow-up' },
      { label: 'Donut VLM', icon: 'fa-solid fa-brain' },
      { label: 'JSON', icon: 'fa-solid fa-code' },
      { label: 'Archive', icon: 'fa-solid fa-box-archive' },
    ],
  },
  {
    title: 'DocuMind AI',
    subtitle: 'Multi-Document RAG Platform',
    category: 'genai',
    image: 'images/projects/documind-ai.png',
    description:
      'Multi-document RAG system that processes PDF, DOCX, PPTX and TXT files and answers context-aware questions grounded in the uploaded documents.',
    points: [
      'Document chunking, vector embeddings, semantic retrieval and contextual generation.',
      'Summarisation, document comparison, quizzes, flashcards and PDF report generation.',
    ],
    tech: ['Python', 'Google Gemini', 'RAG', 'LangChain', 'ChromaDB', 'Streamlit'],
    github: 'https://github.com/Maham-zafar123/DocuMind-AI',
  },
  {
    title: 'AI Interview Coach',
    subtitle: 'Mock Interview Platform',
    category: 'genai',
    image: 'images/projects/ai-interview-coach.png',
    description:
      'AI-powered interview preparation platform that uses Google Gemini to run interactive HR, technical and behavioural interviews and evaluate responses.',
    points: [
      'AI-driven response scoring with personalised feedback, insights and improvement suggestions.',
      'Authentication and interview history in SQLite, Plotly performance charts and automated PDF reports.',
    ],
    tech: ['Python', 'Streamlit', 'Google Gemini', 'SQLite', 'Plotly', 'FPDF'],
    github: 'https://github.com/Maham-zafar123/AI-Interview-Coach',
  },
  {
    title: 'CodePilot AI',
    subtitle: 'AI Software Engineering Assistant',
    category: 'genai',
    image: 'images/projects/codepilot-ai.png',
    description:
      'Intelligent assistant that understands, analyses and improves complete software projects using retrieval over the codebase and agentic reasoning.',
    points: ['Codebase indexing with ChromaDB and RAG.', 'LangGraph workflows for analysis and improvement suggestions.'],
    tech: ['Python', 'Google Gemini', 'LangGraph', 'RAG', 'ChromaDB', 'Streamlit'],
    github: 'https://github.com/Maham-zafar123/CodePilot-AI',
  },
  {
    title: 'AI Research Paper Generator',
    subtitle: 'Multi-Agent Research System',
    category: 'agentic',
    image: 'images/projects/research-generator.png',
    description:
      'Multi-agent system that researches, writes, evaluates and refines full research papers from a single topic.',
    points: ['Agents for research, drafting, critique and refinement orchestrated with LangGraph.', 'Live web research through Tavily and fast inference with Groq.'],
    tech: ['LangGraph', 'LangChain', 'Tavily', 'Groq', 'Python', 'Streamlit'],
    github: 'https://github.com/Maham-zafar123/AI-Research-Assistant-Agent',
  },
  {
    title: 'Research Paper Summarizer',
    subtitle: 'Summarisation Agent',
    category: 'agentic',
    image: 'images/projects/research-summarizer.png',
    description: 'AI agent built with LangGraph and Groq LLMs that turns research papers into structured, readable insights.',
    points: ['Structured extraction of contributions, methods and results.', 'Prompt-engineered agent graph for consistent output.'],
    tech: ['LangGraph', 'Groq', 'Prompt Engineering', 'Python', 'Streamlit'],
    github: 'https://github.com/Maham-zafar123/AI-Research-Assistant',
  },
  {
    title: 'Facial Expression Recognition',
    subtitle: 'Deep Learning · Computer Vision',
    category: 'dl',
    image: 'images/projects/facial-expression.jpg',
    description:
      'CNN-based system that classifies seven emotions (angry, disgust, fear, happy, sad, surprise, neutral) from facial images, with real-time prediction.',
    points: ['Image preprocessing, training, validation and evaluation in TensorFlow and Keras.', 'OpenCV integration for real-time facial expression prediction.'],
    tech: ['Python', 'TensorFlow', 'Keras', 'CNN', 'OpenCV'],
    github: 'https://github.com/Maham-zafar123/Facial-Expression-Recognition-using-Deep-Learning',
  },
]

export const education = {
  degree: 'Bachelor of Software Engineering',
  school: 'University of Engineering and Technology, Taxila',
  period: '2022 – 2026',
  cgpa: '3.68 / 4.0',
}

export const awards = [
  { title: 'PEC Merit Scholarship', text: 'Outstanding academic performance in Matriculation.' },
  { title: 'Full Merit-Based Scholarship', text: 'Punjab Group of Colleges.' },
  { title: '3rd Position, Multan Board', text: 'Intermediate examinations.' },
  { title: "Prime Minister's Laptop Award", text: 'Merit-based award for academic excellence.' },
]

export const certifications = [
  { title: 'Crash Course on Python Programming', issuer: 'Google · Coursera', year: '2023' },
  { title: 'Supervised Machine Learning & Advanced Learning Algorithms', issuer: 'Stanford · Coursera (Andrew Ng)', year: '2024' },
  { title: 'Operating System Interaction with Python', issuer: 'Google · Coursera', year: '2024' },
  { title: 'ChatGPT Prompt Engineering & LangChain for LLMs', issuer: 'DeepLearning.AI', year: '2025' },
]

export const navLinks = [
  { id: 'expertise', label: 'Expertise' },
  { id: 'about', label: 'About' },
  { id: 'experience', label: 'Experience' },
  { id: 'skills', label: 'Skills' },
  { id: 'projects', label: 'Projects' },
  { id: 'education', label: 'Education' },
  { id: 'contact', label: 'Contact' },
]
