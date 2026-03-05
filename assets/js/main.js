/* ==========================================
   PORTFOLIO V3 - JavaScript
   Interactive & Dynamic Features
   ========================================== */

// ==========================================
// DOM Content Loaded
// ==========================================
document.addEventListener('DOMContentLoaded', () => {
    initLoader();
    initCursorGlow();
    initNavigation();
    initThemeToggle();
    initTypingEffect();
    initCounterAnimation();
    initScrollReveal();
    initSmoothScroll();
    initActiveNavLink();
});

// ==========================================
// Loader
// ==========================================
function initLoader() {
    const loader = document.getElementById('loader');
    
    if (loader) {
        document.body.classList.add('loading');
        
        window.addEventListener('load', () => {
            setTimeout(() => {
                loader.classList.add('hidden');
                document.body.classList.remove('loading');
            }, 1800);
        });
    }
}

// ==========================================
// Cursor Glow Effect
// ==========================================
function initCursorGlow() {
    const cursorGlow = document.getElementById('cursorGlow');
    
    if (!cursorGlow || window.innerWidth < 768) return;
    
    let mouseX = 0;
    let mouseY = 0;
    let currentX = 0;
    let currentY = 0;
    
    document.addEventListener('mousemove', (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;
        cursorGlow.classList.add('active');
    });
    
    document.addEventListener('mouseleave', () => {
        cursorGlow.classList.remove('active');
    });
    
    // Smooth cursor following
    function animateCursor() {
        const ease = 0.1;
        
        currentX += (mouseX - currentX) * ease;
        currentY += (mouseY - currentY) * ease;
        
        cursorGlow.style.left = `${currentX}px`;
        cursorGlow.style.top = `${currentY}px`;
        
        requestAnimationFrame(animateCursor);
    }
    
    animateCursor();
}

// ==========================================
// Navigation
// ==========================================
function initNavigation() {
    const header = document.getElementById('header');
    const navToggle = document.getElementById('navToggle');
    const navMenu = document.getElementById('navMenu');
    const navLinks = document.querySelectorAll('.nav-link');
    
    // Header scroll effect
    let lastScroll = 0;
    
    window.addEventListener('scroll', () => {
        const currentScroll = window.pageYOffset;
        
        if (currentScroll > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
        
        lastScroll = currentScroll;
    });
    
    // Mobile menu toggle
    if (navToggle && navMenu) {
        navToggle.addEventListener('click', () => {
            navToggle.classList.toggle('active');
            navMenu.classList.toggle('active');
            document.body.style.overflow = navMenu.classList.contains('active') ? 'hidden' : '';
        });
        
        // Close menu on link click
        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                navToggle.classList.remove('active');
                navMenu.classList.remove('active');
                document.body.style.overflow = '';
            });
        });
    }
}

// ==========================================
// Theme Toggle
// ==========================================
function initThemeToggle() {
    const themeCheckbox = document.getElementById('themeCheckbox');
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)');
    
    // Get stored theme or use system preference
    const getTheme = () => {
        const stored = localStorage.getItem('theme');
        if (stored) return stored;
        return prefersDark.matches ? 'dark' : 'light';
    };
    
    // Apply theme and sync checkbox
    const setTheme = (theme) => {
        document.documentElement.setAttribute('data-theme', theme);
        localStorage.setItem('theme', theme);
        
        // Sync checkbox state (checked = light mode / sun visible)
        if (themeCheckbox) {
            themeCheckbox.checked = theme === 'light';
        }
    };
    
    // Initialize
    setTheme(getTheme());
    
    // Toggle via checkbox
    if (themeCheckbox) {
        themeCheckbox.addEventListener('change', () => {
            const newTheme = themeCheckbox.checked ? 'light' : 'dark';
            setTheme(newTheme);
        });
    }
    
    // Listen for system preference changes
    prefersDark.addEventListener('change', (e) => {
        if (!localStorage.getItem('theme')) {
            setTheme(e.matches ? 'dark' : 'light');
        }
    });
}

// ==========================================
// Typing Effect
// ==========================================
function initTypingEffect() {
    const typingElement = document.getElementById('typingName');
    
    if (!typingElement) return;
    
    const text = 'Leonardo M. Silva';
    const typingSpeed = 80;
    let index = 0;
    
    function type() {
        if (index < text.length) {
            typingElement.textContent += text.charAt(index);
            index++;
            setTimeout(type, typingSpeed);
        }
    }
    
    // Start typing after loader
    setTimeout(type, 2000);
}

// ==========================================
// Counter Animation
// ==========================================
function initCounterAnimation() {
    const counters = document.querySelectorAll('.stat-number');
    
    if (!counters.length) return;
    
    const animateCounter = (counter) => {
        const target = parseInt(counter.getAttribute('data-target'));
        const duration = 2000;
        const step = target / (duration / 16);
        let current = 0;
        
        const updateCounter = () => {
            current += step;
            if (current < target) {
                counter.textContent = Math.floor(current);
                requestAnimationFrame(updateCounter);
            } else {
                counter.textContent = target;
            }
        };
        
        updateCounter();
    };
    
    // Use Intersection Observer
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateCounter(entry.target);
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });
    
    counters.forEach(counter => observer.observe(counter));
}

// ==========================================
// Scroll Reveal Animation
// ==========================================
function initScrollReveal() {
    const revealElements = document.querySelectorAll(
        '.skill-category, .project-card, .contact-card, .timeline-item, .expertise-card, .highlight-card'
    );
    
    if (!revealElements.length) return;
    
    const revealOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                // Add stagger effect
                setTimeout(() => {
                    entry.target.classList.add('aos-animate');
                }, index * 100);
                revealObserver.unobserve(entry.target);
            }
        });
    }, revealOptions);
    
    revealElements.forEach(element => {
        element.setAttribute('data-aos', 'fade-up');
        revealObserver.observe(element);
    });
}

// ==========================================
// Smooth Scroll
// ==========================================
function initSmoothScroll() {
    const links = document.querySelectorAll('a[href^="#"]');
    
    links.forEach(link => {
        link.addEventListener('click', (e) => {
            const href = link.getAttribute('href');
            if (href === '#') return;
            
            const target = document.querySelector(href);
            if (target) {
                e.preventDefault();
                
                const headerHeight = document.getElementById('header')?.offsetHeight || 0;
                const targetPosition = target.getBoundingClientRect().top + window.pageYOffset - headerHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// ==========================================
// Active Navigation Link
// ==========================================
function initActiveNavLink() {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link');
    
    if (!sections.length || !navLinks.length) return;
    
    const observerOptions = {
        threshold: 0.3,
        rootMargin: '-100px 0px -100px 0px'
    };
    
    const sectionObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const id = entry.target.getAttribute('id');
                
                navLinks.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('data-section') === id) {
                        link.classList.add('active');
                    }
                });
            }
        });
    }, observerOptions);
    
    sections.forEach(section => sectionObserver.observe(section));
}

// ==========================================
// Skill Item Hover Effect
// ==========================================
document.addEventListener('DOMContentLoaded', () => {
    const skillItems = document.querySelectorAll('.skill-item');
    
    skillItems.forEach(item => {
        item.addEventListener('mouseenter', () => {
            const skillName = item.getAttribute('data-skill');
            if (skillName) {
                item.setAttribute('title', skillName);
            }
        });
    });
});

// ==========================================
// Parallax Effect on Hero
// ==========================================
document.addEventListener('DOMContentLoaded', () => {
    const heroVisual = document.querySelector('.hero-visual');
    const floatingTechs = document.querySelectorAll('.floating-tech');
    
    if (!heroVisual || window.innerWidth < 992) return;
    
    document.addEventListener('mousemove', (e) => {
        const { clientX, clientY } = e;
        const centerX = window.innerWidth / 2;
        const centerY = window.innerHeight / 2;
        
        const moveX = (clientX - centerX) / 50;
        const moveY = (clientY - centerY) / 50;
        
        floatingTechs.forEach((tech, index) => {
            const factor = (index + 1) * 0.5;
            tech.style.transform = `translate(${moveX * factor}px, ${moveY * factor}px)`;
        });
    });
});

// ==========================================
// Form Validation (if contact form added)
// ==========================================
function validateEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
}

// ==========================================
// Lazy Loading Images
// ==========================================
document.addEventListener('DOMContentLoaded', () => {
    const images = document.querySelectorAll('img[data-src]');
    
    if (!images.length) return;
    
    const imageObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.getAttribute('data-src');
                img.removeAttribute('data-src');
                imageObserver.unobserve(img);
            }
        });
    });
    
    images.forEach(img => imageObserver.observe(img));
});

// ==========================================
// Keyboard Navigation
// ==========================================
document.addEventListener('keydown', (e) => {
    // Close mobile menu with Escape
    if (e.key === 'Escape') {
        const navToggle = document.getElementById('navToggle');
        const navMenu = document.getElementById('navMenu');
        
        if (navMenu?.classList.contains('active')) {
            navToggle?.classList.remove('active');
            navMenu.classList.remove('active');
            document.body.style.overflow = '';
        }
    }
});

// ==========================================
// Performance Optimization
// ==========================================
// Debounce function for scroll events
function debounce(func, wait = 20, immediate = true) {
    let timeout;
    return function executedFunction() {
        const context = this;
        const args = arguments;
        
        const later = function() {
            timeout = null;
            if (!immediate) func.apply(context, args);
        };
        
        const callNow = immediate && !timeout;
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
        
        if (callNow) func.apply(context, args);
    };
}

// Throttle function for mouse events
function throttle(func, limit) {
    let inThrottle;
    return function executedFunction() {
        const args = arguments;
        const context = this;
        
        if (!inThrottle) {
            func.apply(context, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    };
}

// ==========================================
// Console Easter Egg - Currículo
// ==========================================
console.log(`
%c╔══════════════════════════════════════════════════════════════════╗
║                                                                  ║
║   🚀  LEONARDO M. SILVA                                          ║
║   Senior Full-Stack Software Engineer                            ║
║                                                                  ║
╠══════════════════════════════════════════════════════════════════╣
║                                                                  ║
║   📍 Localização: Matão, SP - Brasil                             ║
║   💼 Empresa Atual: Move Mais TAG de Pedágio                     ║
║   📧 Email: contato@leonardomdev.me                              ║
║                                                                  ║
╠══════════════════════════════════════════════════════════════════╣
║                           SOBRE MIM                              ║
╠══════════════════════════════════════════════════════════════════╣
║                                                                  ║
║   • Comecei a programar aos 11 anos com Java (Minecraft)         ║
║   • Primeiro emprego aos 17 anos com projetos frontend           ║
║   • Atualmente Dev Java Sênior + Freelancer                      ║
║   • +7 anos de experiência em produção                           ║
║                                                                  ║
╠══════════════════════════════════════════════════════════════════╣
║                         HARD SKILLS                              ║
╠══════════════════════════════════════════════════════════════════╣
║                                                                  ║
║   💻 Linguagens:                                                 ║
║      Java • Rust • TypeScript • Python • PHP • Kotlin            ║
║      Ruby • C++ • C#                                             ║
║                                                                  ║
║   🛠️  Frameworks:                                                 ║
║      Spring Boot • React • Vue.js • Next.js • Laravel            ║
║      Rails • Angular • .NET • Zend/Laminas                       ║
║                                                                  ║
║   🗄️  Databases:                                                  ║
║      PostgreSQL • MongoDB • Redis • MySQL • Oracle               ║
║      SQLite • H2                                                 ║
║                                                                  ║
║   ⚙️  DevOps & Tools:                                             ║
║      Docker • Git • Linux • Jenkins • Nginx                      ║
║                                                                  ║
╠══════════════════════════════════════════════════════════════════╣
║                          CONTATO                                 ║
╠══════════════════════════════════════════════════════════════════╣
║                                                                  ║
║   🔗 LinkedIn: linkedin.com/in/leonardo-m-silva                 ║
║   🐙 GitHub:   github.com/leonardo-matheus                       ║
║   📱 WhatsApp: +55 16 99761-4410                                 ║
║                                                                  ║
╠══════════════════════════════════════════════════════════════════╣
║                                                                  ║
║   💡 Interessado em colaborar? Vamos conversar!                  ║
║                                                                  ║
╚══════════════════════════════════════════════════════════════════╝
`, 'font-family: monospace; color: #6366f1; font-size: 12px; line-height: 1.4;');

console.log('%c👋 Olá, recrutador! Que bom te ver por aqui.', 'font-size: 14px; color: #10b981; font-weight: bold;');
console.log('%c📄 Quer o código deste portfolio?', 'font-size: 12px; color: #8b5cf6;');

console.log('\n%c🔗 Links Diretos:', 'font-size: 13px; font-weight: bold; color: #6366f1;');
console.log('%c   LinkedIn: %chttps://www.linkedin.com/in/leonardo-m-silva/', 'color: #a0a0b0;', 'color: #0077b5;');
console.log('%c   GitHub:   %chttps://github.com/leonardo-matheus', 'color: #a0a0b0;', 'color: #8b5cf6;');
console.log('%c   WhatsApp: %chttps://wa.me/5516997614410', 'color: #a0a0b0;', 'color: #25d366;');
console.log('%c   Email:    %chttps://mailto:contato@leonardomdev.me', 'color: #a0a0b0;', 'color: #ef4444;');
console.log('%c   Portfolio:%chttps://leonardo-matheus.github.io/Portfolio-V3/', 'color: #a0a0b0;', 'color: #f59e0b;');

// ==========================================
// Experience Modal System
// ==========================================
const experienceData = {
    movemais: {
        logo: '🚗',
        title: 'Desenvolvedor Java Sênior',
        company: 'Move Mais TAG de Pedágio',
        period: 'Dez 2025 - Presente',
        location: 'Araraquara, SP',
        type: 'Tempo Integral · Presencial',
        description: 'Atuação como desenvolvedor sênior no time de engenharia, responsável pelo desenvolvimento e manutenção de sistemas críticos de pedágio e gestão de tags. Trabalho com arquitetura de microsserviços, integrações com sistemas legados e otimização de performance em larga escala.',
        challenges: [
            'Integração com sistemas legados de pedágio de múltiplas concessionárias',
            'Alta disponibilidade para processamento de milhões de transações diárias',
            'Otimização de queries em banco de dados Oracle com alto volume',
            'Modernização gradual de módulos monolíticos para microsserviços'
        ],
        solutions: [
            'Implementação de filas assíncronas para processamento de transações',
            'Criação de camada de cache distribuído reduzindo latência em 60%',
            'Desenvolvimento de APIs RESTful documentadas com OpenAPI/Swagger',
            'Migração de procedures PL/SQL críticas para serviços Java otimizados'
        ],
        technologies: [
            { name: 'Java', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/java/java-original.svg' },
            { name: 'Spring Boot', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/spring/spring-original.svg' },
            { name: 'Oracle', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/oracle/oracle-original.svg' },
            { name: 'Redis', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/redis/redis-original.svg' },
            { name: 'Docker', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/docker/docker-original.svg' },
            { name: 'Kubernetes', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/kubernetes/kubernetes-plain.svg' }
        ]
    },
    microsoft: {
        logo: '🪟',
        title: 'Gerente de Projetos',
        company: 'Microsoft',
        period: 'Fev 2024 - Dez 2025',
        location: 'Brasil',
        type: 'Temporário · Remoto',
        description: 'Atuei na coordenação e desenvolvimento da refatoração do sistema de API fiscal, garantindo conformidade com as novas normas do SEFAZ e modelo 4.0 para NF-e, NFC-e e NFS-e. Liderança técnica em projeto crítico de compliance fiscal para o mercado brasileiro.',
        challenges: [
            'Adequação às constantes mudanças nas normas fiscais do SEFAZ',
            'Migração de modelo 3.1 para modelo 4.0 sem downtime',
            'Coordenação de equipes distribuídas em múltiplos fusos horários',
            'Garantia de compatibilidade retroativa com clientes existentes'
        ],
        solutions: [
            'Arquitetura de versionamento de API permitindo múltiplos modelos simultâneos',
            'Implementação de testes automatizados contra schemas XSD do SEFAZ',
            'Pipeline CI/CD com validação fiscal integrada',
            'Documentação técnica e treinamento para equipes de suporte'
        ],
        technologies: [
            { name: 'C#', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/csharp/csharp-original.svg' },
            { name: '.NET', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/dotnetcore/dotnetcore-original.svg' },
            { name: 'Azure', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/azure/azure-original.svg' },
            { name: 'SQL Server', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/microsoftsqlserver/microsoftsqlserver-plain.svg' },
            { name: 'Git', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/git/git-original.svg' }
        ]
    },
    questconsult: {
        logo: '🎓',
        title: 'Professor de Programação',
        company: 'Quest Consult',
        period: 'Jul 2023 - Jun 2025',
        location: 'Araraquara, SP',
        type: 'Meio Período · Presencial',
        description: 'Professor de programação no projeto cultural Núcleo Mentes Brilhantes, um bootcamp intensivo fomentado pela Lei de Incentivo à Cultura (PRONAC/PROAC). Responsável por ensinar programação do zero, desde conceitos fundamentais como variáveis até desenvolvimento mobile com React Native.',
        challenges: [
            'Ensinar programação para alunos sem nenhum conhecimento prévio',
            'Adaptar conteúdo técnico avançado para diferentes níveis de aprendizado',
            'Manter engajamento em turmas com perfis diversos',
            'Preparar alunos para o mercado de trabalho em tempo reduzido'
        ],
        solutions: [
            'Metodologia hands-on com projetos práticos desde a primeira aula',
            'Criação de material didático próprio com analogias do dia-a-dia',
            'Mentorias individuais para acompanhamento personalizado',
            'Simulação de ambiente profissional com code review e pair programming'
        ],
        technologies: [
            { name: 'JavaScript', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg' },
            { name: 'React', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg' },
            { name: 'React Native', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg' },
            { name: 'Node.js', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg' },
            { name: 'Java', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/java/java-original.svg' },
            { name: 'Kotlin', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/kotlin/kotlin-original.svg' }
        ]
    },
    techfix: {
        logo: '💼',
        title: 'Engenheiro de Software',
        company: 'Techfix',
        period: 'Jun 2017 - Presente',
        location: 'Híbrido',
        type: 'Freelance · PJ',
        description: 'Atuação como engenheiro de software freelancer, desenvolvendo soluções personalizadas para clientes nacionais e internacionais. Experiência full-stack com múltiplas linguagens e frameworks, focando em entregar soluções eficientes e modernas. Autodidata com profundo entendimento dos fundamentos da programação.',
        challenges: [
            'Adaptar-se rapidamente a diferentes stacks tecnológicos por projeto',
            'Gerenciar múltiplos projetos simultâneos com prazos apertados',
            'Trabalhar com sistemas legados em linguagens diversas',
            'Garantir qualidade em projetos com escopo variável'
        ],
        solutions: [
            'Desenvolvimento de bibliotecas reutilizáveis entre projetos',
            'Automação de processos repetitivos com scripts e ferramentas CLI',
            'Implementação de práticas DevOps mesmo em projetos pequenos',
            'Documentação técnica para facilitar manutenção futura'
        ],
        technologies: [
            { name: 'Java', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/java/java-original.svg' },
            { name: '.NET', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/dotnetcore/dotnetcore-original.svg' },
            { name: 'PHP', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/php/php-original.svg' },
            { name: 'Python', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg' },
            { name: 'React', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg' },
            { name: 'Vue.js', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/vuejs/vuejs-original.svg' },
            { name: 'Laravel', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/laravel/laravel-original.svg' },
            { name: 'Rust', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/rust/rust-original.svg' }
        ]
    },
    inicio: {
        logo: '🎮',
        title: 'Início na Programação',
        company: 'Autodidata',
        period: '11 anos de idade',
        location: 'Matão, SP',
        type: 'Hobby · Aprendizado',
        description: 'Minha jornada na programação começou aos 11 anos, movido pela curiosidade de entender como funcionavam os jogos que eu amava. Comecei criando mods e plugins para Minecraft em Java, aprendendo orientação a objetos, estruturas de dados e lógica de programação de forma autodidata.',
        challenges: [
            'Aprender programação sem orientação formal ou cursos',
            'Entender conceitos complexos como POO e threads aos 11 anos',
            'Debuggar código sem ferramentas adequadas',
            'Lidar com documentação em inglês ainda aprendendo o idioma'
        ],
        solutions: [
            'Estudo intensivo de tutoriais, fóruns e código open source',
            'Experimentação constante com tentativa e erro',
            'Participação ativa em comunidades de modding',
            'Criação de projetos cada vez mais complexos para testar conhecimentos'
        ],
        technologies: [
            { name: 'Java', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/java/java-original.svg' },
            { name: 'Eclipse', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/eclipse/eclipse-original.svg' },
            { name: 'Git', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/git/git-original.svg' }
        ]
    }
};

// Initialize Experience Modal
document.addEventListener('DOMContentLoaded', () => {
    initExperienceModal();
});

function initExperienceModal() {
    const modal = document.getElementById('experienceModal');
    const modalClose = document.getElementById('modalClose');
    const backdrop = modal?.querySelector('.modal-backdrop');
    const timelineItems = document.querySelectorAll('.timeline-item[data-experience]');

    if (!modal || !timelineItems.length) return;

    // Open modal on timeline item click
    timelineItems.forEach(item => {
        item.addEventListener('click', () => {
            const experienceKey = item.getAttribute('data-experience');
            const data = experienceData[experienceKey];

            if (data) {
                populateModal(data);
                openModal(modal);
            }
        });
    });

    // Close modal events
    modalClose?.addEventListener('click', () => closeModal(modal));
    backdrop?.addEventListener('click', () => closeModal(modal));

    // Close on Escape key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && modal.classList.contains('active')) {
            closeModal(modal);
        }
    });
}

function populateModal(data) {
    document.getElementById('modalLogo').textContent = data.logo;
    document.getElementById('modalTitle').textContent = data.title;
    document.getElementById('modalCompany').textContent = data.company;
    document.getElementById('modalPeriod').innerHTML = `📅 ${data.period}`;
    document.getElementById('modalLocation').innerHTML = `📍 ${data.location}`;
    document.getElementById('modalType').textContent = data.type;
    document.getElementById('modalDescription').textContent = data.description;

    // Populate challenges
    const challengesList = document.getElementById('modalChallenges');
    challengesList.innerHTML = data.challenges.map(c => `<li>${c}</li>`).join('');

    // Populate solutions
    const solutionsList = document.getElementById('modalSolutions');
    solutionsList.innerHTML = data.solutions.map(s => `<li>${s}</li>`).join('');

    // Populate technologies
    const techStack = document.getElementById('modalTech');
    techStack.innerHTML = data.technologies.map(tech => `
        <span>
            <img src="${tech.icon}" alt="${tech.name}">
            ${tech.name}
        </span>
    `).join('');
}

function openModal(modal) {
    modal.classList.add('active');
    document.body.style.overflow = 'hidden';

    // Reset animations by removing and re-adding active class
    const sections = modal.querySelectorAll('.modal-section');
    sections.forEach(section => {
        section.style.animation = 'none';
        section.offsetHeight; // Trigger reflow
        section.style.animation = null;
    });
}

function closeModal(modal) {
    modal.classList.remove('active');
    document.body.style.overflow = '';
}
