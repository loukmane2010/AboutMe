document.addEventListener('DOMContentLoaded', () => {
    // --- Translations ---
    const translations = {
        en: {
            'nav-about': 'About',
            'nav-skills': 'Skills',
            'nav-projects': 'Projects',
            'nav-contact': 'Contact',
            'hero-title': 'Hi, I\'m <span>Loukmane</span>',
            'hero-btn': 'View My Work',
            'about-title': 'About Me',
            'about-p1': 'I am Loukmane, a 16-year-old developer based in Morocco, driven by a deep fascination for the intersection of automation, high-performance systems, and modern web technologies. My journey started with exploring the depths of Linux environments, which fueled my passion for building tools that simplify complex workflows.',
            'about-p2': 'Whether it\'s crafting intelligent web applications or automating content creation with Python, I strive for elegance in code and efficiency in execution. I am constantly pushing boundaries to bridge the gap between creative problem-solving and technical excellence, always looking for the next challenge to solve.',
            'skills-title': 'Technical Arsenal',
            'show-more': 'Show More <i class="fas fa-chevron-down"></i>',
            'show-less': 'Show Less <i class="fas fa-chevron-up"></i>',
            'projects-title': 'Recent Projects',
            'project1-title': 'Weather Pro | AI Intelligence',
            'project1-desc': 'A sophisticated, AI-native weather platform that leverages Google’s Gemini 2.5 Flash to provide dynamic and intelligent forecasting. Featuring a premium \'Midnight Aurora\' aesthetic with fluid glassmorphism, interactive mapping via Leaflet.js, and a robust Flask backend with automatic API key rotation for seamless reliability.',
            'project2-title': 'Shift-End | Power Management',
            'project2-desc': 'Shift-End is a desktop power management utility built in Python with PyQt6, designed for users who want precise, automated control over when their computer shuts down, restarts, sleeps, or hibernates — going far beyond what standard OS settings offer.',
            'coming-soon': 'Coming Soon',
            'live': 'Live',
            'download': 'Download',
            'contact-title': 'Get In Touch',
            'contact-p': 'Interested in collaborating or have a project in mind? Reach out and let\'s build something amazing together.',
            'toast-msg': 'This feature is coming soon!',
            'project3-title': 'Scientific Calculator | Multi-Theme',
            'project3-desc': 'A sleek, fully functional scientific calculator built with vanilla HTML, CSS, and JavaScript. Features 6 unique visual themes, 12 scientific functions (sin, cos, tan, log, √, x², π, e, x!, and more), keyboard support, and a fully responsive mobile layout.',
            'phrases': ['Developer', 'Cybersecurity Enthusiast', 'Linux Power User', 'Automation Specialist']
        },
        fr: {
            'nav-about': 'À Propos',
            'nav-skills': 'Compétences',
            'nav-projects': 'Projets',
            'nav-contact': 'Contact',
            'hero-title': 'Salut, je suis <span>Loukmane</span>',
            'hero-btn': 'Voir Mes Projets',
            'about-title': 'À Propos de Moi',
            'about-p1': 'Je suis Loukmane, un développeur de 16 ans basé au Maroc, animé par une profonde fascination pour l\'intersection de l\'automatisation, des systèmes de haute performance et des technologies web modernes. Mon parcours a commencé par l\'exploration des profondeurs des environnements Linux, ce qui a alimenté ma passion pour la création d\'outils simplifiant les flux de travail complexes.',
            'about-p2': 'Qu\'il s\'agisse de concevoir des applications web intelligentes ou d\'automatiser la création de contenu avec Python, je recherche l\'élégance dans le code et l\'efficacité dans l\'exécution. Je repousse constamment les limites pour combler le fossé entre la résolution créative de problèmes et l\'excellence technique, toujours à la recherche du prochain défi à relever.',
            'skills-title': 'Arsenal Technique',
            'show-more': 'Voir Plus <i class="fas fa-chevron-down"></i>',
            'show-less': 'Voir Moins <i class="fas fa-chevron-up"></i>',
            'projects-title': 'Projets Récents',
            'project1-title': 'Weather Pro | Intelligence IA',
            'project1-desc': 'Une plateforme météorologique sophistiquée, native de l\'IA, qui exploite Gemini 2.5 Flash de Google pour fournir des prévisions dynamiques et intelligentes. Présentant une esthétique premium \'Midnight Aurora\' avec un glassmorphism fluide, une cartographie interactive via Leaflet.js, et un backend Flask robuste avec rotation automatique des clés API pour une fiabilité sans faille.',
            'project2-title': 'Shift-End | Gestion d\'Énergie',
            'project2-desc': 'Shift-End est un utilitaire de gestion de l\'énergie pour ordinateur de bureau construit en Python avec PyQt6, conçu pour les utilisateurs qui souhaitent un contrôle précis et automatisé sur le moment où leur ordinateur s\'éteint, redémarre, se met en veille ou hiberne — allant bien au-delà de ce que proposent les paramètres standard de l\'OS.',
            'coming-soon': 'Prochainement',
            'live': 'Direct',
            'download': 'Télécharger',
            'contact-title': 'Contactez-moi',
            'contact-p': 'Intéressé par une collaboration ou vous avez un projet en tête ? Contactez-moi et construisons quelque chose d\'incroyable ensemble.',
            'toast-msg': 'Cette fonctionnalité sera bientôt disponible !',
            'project3-title': 'Calculatrice Scientifique | Multi-Thème',
            'project3-desc': 'Une calculatrice scientifique élégante et entièrement fonctionnelle construite en HTML, CSS et JavaScript. Propose 6 thèmes visuels uniques, 12 fonctions scientifiques (sin, cos, tan, log, √, x², π, e, x!, et plus), support clavier, et une mise en page mobile responsive.',
            'phrases': ['Développeur', 'Passionné de Cybersécurité', 'Utilisateur Linux', 'Spécialiste Automatisation']
        }
    };

    let currentLang = 'en';

    function updateLanguage(lang) {
        currentLang = lang;
        document.querySelectorAll('[data-i18n]').forEach(el => {
            const key = el.getAttribute('data-i18n');
            if (translations[lang][key]) {
                if (key === 'show-more' || key === 'show-less') {
                    // Handled by show more button logic
                    return;
                }
                if (el.tagName === 'A' || el.tagName === 'BUTTON' || el.tagName === 'SPAN' || el.tagName === 'P' || el.tagName === 'H1' || el.tagName === 'H2' || el.tagName === 'H3') {
                    if (key === 'hero-title') {
                        el.innerHTML = translations[lang][key];
                    } else if (el.querySelector('i')) {
                        const icon = el.querySelector('i').outerHTML;
                        el.innerHTML = translations[lang][key] + ' ' + icon;
                    } else {
                        el.textContent = translations[lang][key];
                    }
                }
            }
        });
        document.getElementById('lang-btn').textContent = lang === 'en' ? 'FR' : 'EN';
        
        // Update typing phrases
        phrases = translations[lang]['phrases'];
        counter = 0;
    }

    const langBtn = document.getElementById('lang-btn');
    if (langBtn) {
        langBtn.addEventListener('click', () => {
            const newLang = currentLang === 'en' ? 'fr' : 'en';
            updateLanguage(newLang);
        });
    }

    // --- Text Scramble Effect ---
    class TextScramble {
        constructor(el) {
            this.el = el;
            this.chars = '!<>-_\\/[]{}—=+*^?#________';
            this.update = this.update.bind(this);
        }
        setText(newText) {
            const oldText = this.el.innerText;
            const length = Math.max(oldText.length, newText.length);
            const promise = new Promise((resolve) => this.resolve = resolve);
            this.queue = [];
            for (let i = 0; i < length; i++) {
                const from = oldText[i] || '';
                const to = newText[i] || '';
                const start = Math.floor(Math.random() * 40);
                const end = start + Math.floor(Math.random() * 40);
                this.queue.push({ from, to, start, end });
            }
            cancelAnimationFrame(this.frameRequest);
            this.frame = 0;
            this.update();
            return promise;
        }
        update() {
            let output = '';
            let complete = 0;
            for (let i = 0, n = this.queue.length; i < n; i++) {
                let { from, to, start, end, char } = this.queue[i];
                if (this.frame >= end) {
                    complete++;
                    output += to;
                } else if (this.frame >= start) {
                    if (!char || Math.random() < 0.28) {
                        char = this.randomChar();
                        this.queue[i].char = char;
                    }
                    output += `<span class="dud">${char}</span>`;
                } else {
                    output += from;
                }
            }
            this.el.innerHTML = output;
            if (complete === this.queue.length) {
                this.resolve();
            } else {
                this.frameRequest = requestAnimationFrame(this.update);
                this.frame++;
            }
        }
        randomChar() {
            return this.chars[Math.floor(Math.random() * this.chars.length)];
        }
    }

    const typingText = document.getElementById('typing-text');
    const scramble = new TextScramble(typingText);
    let phrases = translations[currentLang]['phrases'];
    let counter = 0;
    const next = () => {
        scramble.setText(phrases[counter]).then(() => {
            setTimeout(next, 2000);
        });
        counter = (counter + 1) % phrases.length;
    };
    next();

    // --- Scroll Logic ---
    const navbar = document.getElementById('navbar');
    const progressBar = document.getElementById('scroll-progress');

    // Reveal
    const checkReveal = () => {
        const triggerBottom = window.innerHeight * 0.85;
        document.querySelectorAll('.reveal').forEach(reveal => {
            if (reveal.getBoundingClientRect().top < triggerBottom) reveal.classList.add('active');
        });
    };

    window.addEventListener('scroll', () => {
        // Navbar
        if (window.scrollY > 50) navbar.classList.add('scrolled');
        else navbar.classList.remove('scrolled');

        // Progress Bar
        const winScroll = document.body.scrollTop || document.documentElement.scrollTop;
        const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
        const scrolled = (winScroll / height) * 100;
        progressBar.style.width = scrolled + "%";
        
        checkReveal();
    });

    checkReveal(); // Initial check on load

    // Smooth Scroll
    document.querySelectorAll('nav a').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            if (href.startsWith('#')) {
                e.preventDefault();
                const target = document.querySelector(href);
                if (target) {
                    window.scrollTo({
                        top: target.offsetTop - navbar.offsetHeight,
                        behavior: 'smooth'
                    });
                }
            }
        });
    });

    // --- Coming Soon Notification ---
    const toast = document.getElementById('toast');
    const comingSoonElements = document.querySelectorAll('.coming-soon');

    comingSoonElements.forEach(el => {
        el.addEventListener('click', (e) => {
            e.preventDefault();
            
            // Show toast
            toast.classList.add('show');
            
            // Hide after 3 seconds
            setTimeout(() => {
                toast.classList.remove('show');
            }, 3000);
        });
    });

    // --- Show More Skills ---
    const showMoreBtn = document.getElementById('show-more-skills');
    const extraSkillsWrapper = document.getElementById('extra-skills-wrapper');
    let isExpanded = false;

    if (showMoreBtn && extraSkillsWrapper) {
        showMoreBtn.addEventListener('click', () => {
            isExpanded = !isExpanded;
            
            extraSkillsWrapper.classList.toggle('open');

            const key = isExpanded ? 'show-less' : 'show-more';
            showMoreBtn.innerHTML = translations[currentLang][key];
        });
    }
});
