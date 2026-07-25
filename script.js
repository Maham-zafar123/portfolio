// Portfolio Data
const portfolioData = {
  skills: [
    // AI & LLMs
   

     

    // Programming Languages
    { name: "Python", category: "programming", icon: "🐍" },
    { name: "C++", category: "programming", icon: "C++" },
    { name: "Java", category: "programming", icon: "♨️" },


     // Machine Learning
    { name: "Pandas", category: "machinelearning", icon: "🐼" },
    { name: "Machine Learning", category: "machinelearning", icon: "🤖" },
    { name: "NumPy", category: "machinelearning", icon: "🔢" },
    { name: "Matplotlib", category: "machinelearning", icon: "📈" },
    { name: "Scikit-learn", category: "machinelearning", icon: "🛠️" },
    { name: "Plotly", category: "machinelearning", icon: "📊" },


     // Deep Learning
    { name: "TensorFlow ", category: "deeplearning", icon: "🔶" },
    { name: "Keras", category: "deeplearning", icon: "💛" },
    { name: "Hugging Face Transformers ", category: "deeplearning", icon: "🤗" },
    { name: "NLP", category: "deeplearning", icon: "📝" },
    { name: "PyTorch", category: "deeplearning", icon: "🔥" },
    { name: "CNN", category: "deeplearning", icon: "🧠" },
    { name: "LSTM", category: "deeplearning", icon: "🔁" },
    { name: "GRU", category: "deeplearning", icon: "⚙️" },
    { name: "OpenCV ", category: "deeplearning", icon: "👁️" },
    { name: "Transformer", category: "deeplearning", icon: "🧠" },

    // Generativeai
    { name: "LangChain", category: "generativeai", icon: "🔗" },
    { name: "RAG (Retrieval-Augmented Generation)", category: "generativeai", icon: "📚" },
    { name: "VectorDBs (Chroma, FAISS)", category: "generativeai", icon: "📦" },
    { name: "GPT-4", category: "generativeai", icon: "🧠" },
    { name: "Gemini", category: "generativeai", icon: "🔮" },
    { name: "LLMs", category: "generativeai", icon: "📚" },
    { name: "LLaMA 3", category: "generativeai", icon: "🦙" },
    { name: "Groq", category: "generativeai", icon: "⚡" },
    { name: "Prompt Engineering", category: "generativeai", icon: "✍️" },


     // agenticai
    { name: "Langgraph", category: "agenticai", icon: "🕸️" },
    { name: "CrewAI", category: "agenticai", icon: "✈️" },
    { name: "N8N", category: "agenticai", icon: "🔁" },

    // DATABASE (NEW)
    { name: "MongoDB", category: "database", icon: "🍃" },
    { name: "MySQL", category: "database", icon: "🗄️" },
    { name: "Oracle SQL", category: "database", icon: "📊" },


    // Backend
    { name: "FastAPI", category: "backend", icon: "⚡" },
    { name: "Flask", category: "backend", icon: "🍶" },
    

    // AI / NLP / Vision
    { name: "NLP", category: "machinelearning", icon: "📝" },
    { name: "Vision-Language Models", category: "generativeai", icon: "👁️" },
    { name: "Digital Image Processing", category: "machinelearning", icon: "🖼️" },
    { name: "IDP (Document AI)", category: "generativeai", icon: "📄" },
    { name: "Donut Transformer", category: "generativeai", icon: "🍩" },

    // Frontend
    { name: "HTML", category: "frontend", icon: "📝" },
    { name: "CSS", category: "frontend", icon: "🎨" },
    { name: "Streamlit", category: "frontend", icon: "🖥️" },
    { name: "Gradio", category: "frontend", icon: "🧪" },
    { name: "Streamlit", category: "frontend", icon: "🖥️" },

  
    
// Tools
    { name: "Git", category: "tools", icon: "🔧" },
    { name: "GitHub", category: "tools", icon: "🐙" },
    { name: "Google Colab", category: "tools", icon: "💻" },
    { name: "Power BI", category: "tools", icon: "📊" },      // Data visualization & BI dashboard
   { name: "Kaggle", category: "tools", icon: "🏆" },        // Competitions, ML, excellence
    { name: "CUDA", category: "tools", icon: "⚡" },
    { name: "Ngrok", category: "tools", icon: "🌐" },
    { name: "VS Code", category: "tools", icon: "📝" },
    { name: "Jupyter Notebook", category: "tools", icon: "📓" },
    { name: "PyCharm", category: "tools", icon: "💡" },
    { name: "MS Office", category: "tools", icon: "📂" }
]
,
    
    projects: [
        {
            id: 1,
            title: "AI Research Paper Summarization Agent ",
            description: "Built an AI Research Paper Summarization Agent using LangGraph and Groq LLMs to generate structured paper insights.",
            image: "AI Research paper .PNG",
            category: "agenticai",
            tech: ["Prompt Engineering", "Langgraph", "Python", "Steamlit", "Groq"],
            github: "https://github.com/Maham-zafar123/AI-Research-Assistant",
        },
        {
            id: 2,
            title: "AI research paper generator",
            description: "A multi-agent research paper generator using LangGraph, Groq, and Tavily that automatically researches, writes, evaluates, and refines full papers from a given topic.",
            image: "AI Research Assistant.PNG",
            category: "agenticai",
            tech: ["LangGraph", "Tavily", "Groq", "Langchain","Steamlit","Python"],
            github: "https://github.com/Maham-zafar123/AI-Research-Assistant-Agent",
            
             
        },
        {
            id: 3,
            title: "AI Interview Coach",
            description: "AI-Powered Mock Interview Preparation Platform using Google Gemini, Streamlit, Resume Parsing, SQLite & Intelligent Feedback Analysis",
            image: "AI Interview Coach.png",
            category: "generativeai",
tech: [
  "Python",
  "Streamlit",
  "Google Gemini",
  "Generative AI",
  "SQLite",
  "LLM"
],            github: "https://github.com/Maham-zafar123/AI-Interview-Coach",
        },
        {
            id: 4,
            title: "CodePilot AI",
            description: "CodePilot AI is an intelligent AI Software Engineering Assistant designed to understand, analyze, and improve complete software projects.",
            image: "CodePilot AI.png",
            category: "generativeai",
tech: [
  "Python",
  "Streamlit",
  "Google Gemini",
  "LangGraph",
  "RAG",
  "ChromaDB"
],            github: "https://github.com/Maham-zafar123/CodePilot-AI",
        },
        {
            id: 5,
            title: "DocuMind AI",
            description: "DocuMind AI is an intelligent document analysis platform powered by Google Gemini and Retrieval-Augmented Generation (RAG).",
            image: "DocuMind AI.PNG",
            category: "generativeai",
            tech: ["LLM", "Python", "Google Gemini", "RAG","Semantic Search",'Prompt Engineering', 'Documents Intelligence'],
            github: "https://github.com/Maham-zafar123/DocuMind-AI",
        },
        {
            id: 6,
            title: "Facial-Expression-Recognition-using-Deep-Learning",
            description: "A deep learning-based facial expression recognition system that classifies seven emotions (Angry, Disgust, Fear, Happy, Sad, Surprise, Neutral) from facial images using CNNs.",
            image: "emotion detection.jpg",
            category: "deeplearning",
            tech: ["CNN", "TensorFlow", "Image Processiog", "Python","OpenCV"],
            github: "https://github.com/Maham-zafar123/Facial-Expression-Recognition-using-Deep-Learning",
        },

        
    ]
};

// Theme Management
class ThemeManager {
    constructor() {
        this.theme = localStorage.getItem('theme') || 'dark';
        this.init();
    }
    
    init() {
        this.applyTheme();
        this.bindEvents();
    }
    
    applyTheme() {
        document.documentElement.setAttribute('data-theme', this.theme);
        const themeIcon = document.querySelector('#theme-toggle i');
        if (themeIcon) {
            themeIcon.className = this.theme === 'light' ? 'fas fa-moon' : 'fas fa-sun';
        }
    }
    
    toggle() {
        this.theme = this.theme === 'light' ? 'dark' : 'light';
        localStorage.setItem('theme', this.theme);
        this.applyTheme();
    }
    
    bindEvents() {
        const themeToggle = document.getElementById('theme-toggle');
        if (themeToggle) {
            themeToggle.addEventListener('click', () => this.toggle());
        }
    }
}

// Typing Animation
class TypingAnimation {
    constructor(element, texts, options = {}) {
        this.element = element;
        this.texts = texts;
        this.options = {
            typeSpeed: 100,
            deleteSpeed: 50,
            delayBetweenTexts: 1500,
            ...options
        };
        this.currentTextIndex = 0;
        this.currentCharIndex = 0;
        this.isDeleting = false;
        this.init();
    }
    
    init() {
        this.type();
    }
    
    type() {
        const currentText = this.texts[this.currentTextIndex];
        
        if (this.isDeleting) {
            this.element.textContent = currentText.substring(0, this.currentCharIndex - 1);
            this.currentCharIndex--;
            
            if (this.currentCharIndex === 0) {
                this.isDeleting = false;
                this.currentTextIndex = (this.currentTextIndex + 1) % this.texts.length;
            }
        } else {
            this.element.textContent = currentText.substring(0, this.currentCharIndex + 1);
            this.currentCharIndex++;
            
            if (this.currentCharIndex === currentText.length) {
                setTimeout(() => {
                    this.isDeleting = true;
                }, this.options.delayBetweenTexts);
            }
        }
        
        const speed = this.isDeleting ? this.options.deleteSpeed : this.options.typeSpeed;
        setTimeout(() => this.type(), speed);
    }
}

// Intersection Observer for Animations
class AnimationObserver {
    constructor() {
        this.observer = new IntersectionObserver(
            (entries) => this.handleIntersection(entries),
            { threshold: 0.1, rootMargin: '0px 0px -50px 0px' }
        );
        this.init();
    }
    
    init() {
        const elements = document.querySelectorAll('.skill-card, .project-card, .proficiency-fill');
        elements.forEach(el => this.observer.observe(el));
    }
    
    handleIntersection(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                if (entry.target.classList.contains('skill-card') || entry.target.classList.contains('project-card')) {
                    entry.target.classList.add('show');
                } else if (entry.target.classList.contains('proficiency-fill')) {
                    const width = entry.target.getAttribute('data-width');
                    entry.target.style.width = width + '%';
                }
                this.observer.unobserve(entry.target);
            }
        });
    }
}

// Skills Filter
class SkillsFilter {
    constructor() {
        this.activeFilter = 'all';
        this.init();
    }
    
    init() {
        this.renderSkills();
        this.bindEvents();
    }
    
    renderSkills() {
        const skillsGrid = document.getElementById('skills-grid');
        if (!skillsGrid) return;
        
        const filteredSkills = this.activeFilter === 'all' 
            ? portfolioData.skills 
            : portfolioData.skills.filter(skill => skill.category === this.activeFilter);
        
        skillsGrid.innerHTML = filteredSkills.map(skill => `
            <div class="skill-card" data-category="${skill.category}">
                <div class="skill-icon">${skill.icon}</div>
                <h3 class="skill-name">${skill.name}</h3>
            </div>
        `).join('');
        
        // Re-observe new elements
        const skillCards = skillsGrid.querySelectorAll('.skill-card');
        skillCards.forEach(card => {
            if (window.animationObserver) {
                window.animationObserver.observer.observe(card);
            }
        });
    }
    
    setFilter(filter) {
        this.activeFilter = filter;
        this.renderSkills();
        this.updateFilterButtons();
    }
    
    updateFilterButtons() {
        const filterButtons = document.querySelectorAll('.skills-filter .filter-btn');
        filterButtons.forEach(btn => {
            btn.classList.toggle('active', btn.getAttribute('data-filter') === this.activeFilter);
        });
    }
    
    bindEvents() {
        const filterButtons = document.querySelectorAll('.skills-filter .filter-btn');
        filterButtons.forEach(btn => {
            btn.addEventListener('click', () => {
                const filter = btn.getAttribute('data-filter');
                this.setFilter(filter);
            });
        });
    }
}

// Projects Filter
class ProjectsFilter {
    constructor() {
        this.activeFilter = 'all';
        this.init();
    }
    
    init() {
        this.renderProjects();
        this.bindEvents();
    }
    
    renderProjects() {
        const projectsGrid = document.getElementById('projects-grid');
        if (!projectsGrid) return;
        
        const filteredProjects = this.activeFilter === 'all' 
            ? portfolioData.projects 
            : portfolioData.projects.filter(project => project.category === this.activeFilter);
        
        projectsGrid.innerHTML = filteredProjects.map(project => `
            <div class="project-card" data-category="${project.category}">
                <div class="project-image">
                    <img src="${project.image}" alt="${project.title}" class="project-img">
                    <div class="project-overlay">
                        <a href="${project.github}" target="_blank" class="project-link">
                            <i class="fab fa-github"></i>
                        </a>
                         
                    </div>
                </div>
                <div class="project-content">
                    <div class="project-header">
                        <span class="project-category">${project.category.replace('-', ' ')}</span>
                    </div>
                    <h3 class="project-title">${project.title}</h3>
                    <p class="project-description">${project.description}</p>
                    <div class="project-tech">
                        ${project.tech.map(tech => `<span class="tech-tag">${tech}</span>`).join('')}
                    </div>
                </div>
            </div>
        `).join('');
        
        // Re-observe new elements
        const projectCards = projectsGrid.querySelectorAll('.project-card');
        projectCards.forEach(card => {
            if (window.animationObserver) {
                window.animationObserver.observer.observe(card);
            }
        });
    }
    
    setFilter(filter) {
        this.activeFilter = filter;
        this.renderProjects();
        this.updateFilterButtons();
    }
    
    updateFilterButtons() {
        const filterButtons = document.querySelectorAll('.projects-filter .filter-btn');
        filterButtons.forEach(btn => {
            btn.classList.toggle('active', btn.getAttribute('data-filter') === this.activeFilter);
        });
    }
    
    bindEvents() {
        const filterButtons = document.querySelectorAll('.projects-filter .filter-btn');
        filterButtons.forEach(btn => {
            btn.addEventListener('click', () => {
                const filter = btn.getAttribute('data-filter');
                this.setFilter(filter);
            });
        });
    }
}

// Navigation
class Navigation {
    constructor() {
        this.header = document.getElementById('header');
        this.navToggle = document.getElementById('nav-toggle');
        this.navMenu = document.getElementById('nav-menu');
        this.init();
    }
    
    init() {
        this.bindEvents();
        this.handleScroll();
    }
    
    bindEvents() {
        // Scroll event for header background
        window.addEventListener('scroll', () => this.handleScroll());
        
        // Mobile menu toggle
        if (this.navToggle) {
            this.navToggle.addEventListener('click', () => this.toggleMobileMenu());
        }
        
        // Smooth scroll for navigation links
        const navLinks = document.querySelectorAll('.nav-link');
        navLinks.forEach(link => {
            link.addEventListener('click', (e) => this.handleNavClick(e));
        });
        
        // Smooth scroll for hero buttons
        const heroButtons = document.querySelectorAll('.hero-buttons a[href^="#"]');
        heroButtons.forEach(button => {
            button.addEventListener('click', (e) => this.handleNavClick(e));
        });
    }
    
    handleScroll() {
        if (window.scrollY > 50) {
            this.header.classList.add('scrolled');
        } else {
            this.header.classList.remove('scrolled');
        }
    }
    
    toggleMobileMenu() {
        this.navMenu.classList.toggle('active');
        const icon = this.navToggle.querySelector('i');
        icon.className = this.navMenu.classList.contains('active') ? 'fas fa-times' : 'fas fa-bars';
    }
    
    handleNavClick(e) {
        e.preventDefault();
        const targetId = e.target.getAttribute('href');
        const targetElement = document.querySelector(targetId);
        
        if (targetElement) {
            const headerHeight = this.header.offsetHeight;
            const targetPosition = targetElement.offsetTop - headerHeight;
            
            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
            
            // Close mobile menu if open
            if (this.navMenu.classList.contains('active')) {
                this.toggleMobileMenu();
            }
        }
    }
}

// Contact Form
class ContactForm {
    constructor() {
        this.form = document.getElementById('contact-form');
        this.init();
    }
    
    init() {
        if (this.form) {
            this.form.addEventListener('submit', (e) => this.handleSubmit(e));
        }
    }
    
    handleSubmit(e) {
        e.preventDefault();
        
        const formData = new FormData(this.form);
        const data = Object.fromEntries(formData);
        
        // Here you would typically send the data to a server
        console.log('Form submitted:', data);
        
        // Show success message (you can customize this)
        alert('Thank you for your message! I\'ll get back to you soon.');
        
        // Reset form
        this.form.reset();
    }
}

// Scroll Progress Bar
class ScrollProgress {
    constructor() {
        this.bar = document.createElement('div');
        this.bar.className = 'scroll-progress';
        document.body.appendChild(this.bar);
        window.addEventListener('scroll', () => this.update(), { passive: true });
        this.update();
    }
    update() {
        const scrollTop = window.scrollY;
        const docHeight = document.documentElement.scrollHeight - window.innerHeight;
        const percent = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
        this.bar.style.width = percent + '%';
    }
}

// Back to Top Button
class BackToTop {
    constructor() {
        this.btn = document.createElement('button');
        this.btn.className = 'back-to-top';
        this.btn.setAttribute('aria-label', 'Back to top');
        this.btn.innerHTML = '<i class="fas fa-arrow-up"></i>';
        document.body.appendChild(this.btn);

        window.addEventListener('scroll', () => this.toggleVisibility(), { passive: true });
        this.btn.addEventListener('click', () => {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
    }
    toggleVisibility() {
        this.btn.classList.toggle('visible', window.scrollY > 400);
    }
}

// Initialize everything when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    // Initialize theme manager
    window.themeManager = new ThemeManager();

    // Scroll progress + back to top
    window.scrollProgress = new ScrollProgress();
    window.backToTop = new BackToTop();
    
    // Initialize typing animation
    const typedElement = document.getElementById('typed-text');
    if (typedElement) {
        const texts = ['Software Engineer','Generative AI','Agentic AI ', 'Data Analyst'];
        window.typingAnimation = new TypingAnimation(typedElement, texts);
    }
    
    // Initialize animation observer
    window.animationObserver = new AnimationObserver();
    
    // Initialize filters
    window.skillsFilter = new SkillsFilter();
    window.projectsFilter = new ProjectsFilter();
    
    // Initialize navigation
    window.navigation = new Navigation();
    
    // Initialize contact form
    window.contactForm = new ContactForm();
    
    // Add fade-in animation to sections
    const sections = document.querySelectorAll('.section');
    const sectionObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('fade-in-up');
                sectionObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1 });
    
    sections.forEach(section => {
        sectionObserver.observe(section);
    });
});