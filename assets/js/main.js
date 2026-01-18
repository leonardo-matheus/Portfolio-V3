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
