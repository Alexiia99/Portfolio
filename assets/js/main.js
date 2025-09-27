// =================================================================
// Portfolio DAM - Main JavaScript
// =================================================================

document.addEventListener('DOMContentLoaded', function() {
    
    // =================================================================
    // Variables y elementos del DOM
    // =================================================================
    
    const navbar = document.getElementById('navbar');
    const mobileMenuBtn = document.getElementById('mobileMenuBtn');
    const mobileNav = document.getElementById('mobileNav');
    const fadeElements = document.querySelectorAll('.fade-in');
    const skillBars = document.querySelectorAll('.skill-bar');
    const skillFilters = document.querySelectorAll('.skills-filters .filter-btn');
    const projectFilters = document.querySelectorAll('.projects-filter .filter-btn');
    const skillCards = document.querySelectorAll('.skill-card');
    const projectCards = document.querySelectorAll('.project-card');
    
    // =================================================================
    // Navegación suave
    // =================================================================
    
    function initSmoothScrolling() {
        const links = document.querySelectorAll('a[href^="#"]');
        
        links.forEach(link => {
            link.addEventListener('click', function(e) {
                e.preventDefault();
                
                const targetId = this.getAttribute('href');
                const targetElement = document.querySelector(targetId);
                
                if (targetElement) {
                    const navbarHeight = navbar.offsetHeight;
                    const targetPosition = targetElement.offsetTop - navbarHeight;
                    
                    window.scrollTo({
                        top: targetPosition,
                        behavior: 'smooth'
                    });
                    
                    // Cerrar menú móvil si está abierto
                    if (mobileNav.classList.contains('active')) {
                        toggleMobileMenu();
                    }
                }
            });
        });
    }
    
    // =================================================================
    // Navbar transparente en scroll
    // =================================================================
    
    function handleNavbarScroll() {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 100) {
                navbar.style.background = 'rgba(255, 255, 255, 0.98)';
                navbar.style.boxShadow = '0 2px 20px rgba(0,0,0,0.1)';
            } else {
                navbar.style.background = 'rgba(255, 255, 255, 0.95)';
                navbar.style.boxShadow = 'none';
            }
        });
    }
    
    // =================================================================
    // Menú móvil
    // =================================================================
    
    function toggleMobileMenu() {
        mobileNav.classList.toggle('active');
        mobileMenuBtn.classList.toggle('active');
        
        // Animar el botón hamburguesa
        const spans = mobileMenuBtn.querySelectorAll('span');
        if (mobileMenuBtn.classList.contains('active')) {
            spans[0].style.transform = 'rotate(45deg) translate(6px, 6px)';
            spans[1].style.opacity = '0';
            spans[2].style.transform = 'rotate(-45deg) translate(6px, -6px)';
        } else {
            spans[0].style.transform = 'none';
            spans[1].style.opacity = '1';
            spans[2].style.transform = 'none';
        }
    }
    
    function initMobileMenu() {
        if (mobileMenuBtn) {
            mobileMenuBtn.addEventListener('click', toggleMobileMenu);
        }
        
        // Cerrar menú al hacer click fuera
        document.addEventListener('click', (e) => {
            if (!navbar.contains(e.target) && mobileNav.classList.contains('active')) {
                toggleMobileMenu();
            }
        });
    }
    
    // =================================================================
    // Animaciones en scroll (Intersection Observer)
    // =================================================================
    
    function initScrollAnimations() {
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                    
                    // Animar barras de progreso de skills cuando sean visibles
                    if (entry.target.classList.contains('skills-grid')) {
                        animateSkillBars();
                    }
                }
            });
        }, observerOptions);
        
        fadeElements.forEach(element => {
            observer.observe(element);
        });
    }
    
    // =================================================================
    // Animación de barras de progreso de skills
    // =================================================================
    
    function animateSkillBars() {
        skillBars.forEach(bar => {
            const level = bar.getAttribute('data-level');
            if (level) {
                setTimeout(() => {
                    bar.style.width = level + '%';
                }, Math.random() * 500); // Delay aleatorio para efecto escalonado
            }
        });
    }
    
    // =================================================================
    // Filtros de Skills
    // =================================================================
    
    function initSkillFilters() {
        skillFilters.forEach(filter => {
            filter.addEventListener('click', () => {
                // Remover clase active de todos los filtros
                skillFilters.forEach(f => f.classList.remove('active'));
                // Añadir clase active al filtro clickeado
                filter.classList.add('active');
                
                const filterValue = filter.getAttribute('data-filter');
                
                skillCards.forEach(card => {
                    if (filterValue === 'all') {
                        card.classList.remove('hidden');
                        card.style.animation = 'slideInUp 0.5s ease forwards';
                    } else {
                        const cardCategory = card.getAttribute('data-category');
                        if (cardCategory === filterValue) {
                            card.classList.remove('hidden');
                            card.style.animation = 'slideInUp 0.5s ease forwards';
                        } else {
                            card.classList.add('hidden');
                        }
                    }
                });
            });
        });
    }
    
    // =================================================================
    // Filtros de Proyectos
    // =================================================================
    
    function initProjectFilters() {
        projectFilters.forEach(filter => {
            filter.addEventListener('click', () => {
                // Remover clase active de todos los filtros
                projectFilters.forEach(f => f.classList.remove('active'));
                // Añadir clase active al filtro clickeado
                filter.classList.add('active');
                
                const filterValue = filter.getAttribute('data-filter');
                
                projectCards.forEach(card => {
                    if (filterValue === 'all') {
                        card.classList.remove('hidden');
                        card.style.animation = 'slideInUp 0.5s ease forwards';
                    } else {
                        const cardCategory = card.getAttribute('data-category');
                        if (cardCategory === filterValue) {
                            card.classList.remove('hidden');
                            card.style.animation = 'slideInUp 0.5s ease forwards';
                        } else {
                            card.classList.add('hidden');
                        }
                    }
                });
            });
        });
    }
    
    // =================================================================
    // Elementos flotantes dinámicos
    // =================================================================
    
    function createFloatingElement() {
        const floatingElements = document.querySelector('.floating-elements');
        if (!floatingElements) return;
        
        const element = document.createElement('div');
        element.className = 'floating-shape';
        
        // Propiedades aleatorias con paleta simplificada
        const size = Math.random() * 80 + 40;
        const colors = [
            'var(--gradient-primary)',   // Rosa a naranja
            'var(--gradient-secondary)', // Morado a rosa
            'var(--gradient-tertiary)'   // Naranja a morado
        ];
        
        element.style.width = size + 'px';
        element.style.height = size + 'px';
        element.style.left = Math.random() * 100 + '%';
        element.style.top = Math.random() * 100 + '%';
        element.style.background = colors[Math.floor(Math.random() * colors.length)];
        element.style.animationDelay = Math.random() * 8 + 's';
        element.style.animationDuration = (Math.random() * 6 + 6) + 's';
        element.style.opacity = Math.random() * 0.3 + 0.1; // Más sutil
        
        floatingElements.appendChild(element);
        
        // Remover elemento después de la animación
        setTimeout(() => {
            if (element.parentNode) {
                element.remove();
            }
        }, 15000);
    }
    
    function initFloatingElements() {
        // Crear elementos flotantes periódicamente
        setInterval(createFloatingElement, 3000);
        
        // Crear algunos elementos iniciales
        for (let i = 0; i < 3; i++) {
            setTimeout(createFloatingElement, i * 1000);
        }
    }
    
    // =================================================================
    // Efectos de parallax suave
    // =================================================================
    
    function initParallaxEffects() {
        window.addEventListener('scroll', () => {
            const scrolled = window.pageYOffset;
            const parallaxElements = document.querySelectorAll('.floating-shape');
            
            parallaxElements.forEach((element, index) => {
                const speed = 0.5 + (index % 3) * 0.1;
                const yPos = -(scrolled * speed);
                element.style.transform = `translateY(${yPos}px)`;
            });
            
            // Efecto parallax en imágenes de perfil
            const profileImg = document.querySelector('.profile-img');
            if (profileImg) {
                const yPos = scrolled * 0.3;
                profileImg.style.transform = `translateY(${yPos}px)`;
            }
        });
    }
    
    // =================================================================
    // Contador animado para stats
    // =================================================================
    
    function animateCounters() {
        const counters = document.querySelectorAll('.stat-number');
        
        counters.forEach(counter => {
            const target = parseInt(counter.textContent.replace(/\D/g, ''));
            const increment = target / 100;
            let current = 0;
            
            const timer = setInterval(() => {
                current += increment;
                if (current >= target) {
                    counter.textContent = counter.textContent.replace(/\d+/, target);
                    clearInterval(timer);
                } else {
                    counter.textContent = counter.textContent.replace(/\d+/, Math.floor(current));
                }
            }, 20);
        });
    }
    
    // =================================================================
    // Efecto de escritura para el hero
    // =================================================================
    
    function initTypingEffect() {
        const heroTitle = document.querySelector('.hero-title');
        if (!heroTitle) return;
        
        const text = heroTitle.textContent;
        heroTitle.textContent = '';
        
        let index = 0;
        const timer = setInterval(() => {
            if (index < text.length) {
                heroTitle.textContent += text.charAt(index);
                index++;
            } else {
                clearInterval(timer);
            }
        }, 100);
    }
    
    // =================================================================
    // Validación de formulario de contacto (si existe)
    // =================================================================
    
    function initContactForm() {
        const contactForm = document.querySelector('.contact-form');
        if (!contactForm) return;
        
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Aquí puedes añadir la lógica de envío del formulario
            const formData = new FormData(this);
            
            // Mostrar mensaje de éxito
            showNotification('¡Mensaje enviado correctamente!', 'success');
        });
    }
    
    // =================================================================
    // Sistema de notificaciones
    // =================================================================
    
    function showNotification(message, type = 'info') {
        const notification = document.createElement('div');
        notification.className = `notification notification-${type}`;
        notification.textContent = message;
        
        notification.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            background: var(--gradient-4);
            color: white;
            padding: 1rem 2rem;
            border-radius: 10px;
            box-shadow: var(--shadow-lg);
            z-index: 9999;
            transform: translateX(100%);
            transition: transform 0.3s ease;
        `;
        
        document.body.appendChild(notification);
        
        // Animar entrada
        setTimeout(() => {
            notification.style.transform = 'translateX(0)';
        }, 100);
        
        // Remover después de 3 segundos
        setTimeout(() => {
            notification.style.transform = 'translateX(100%)';
            setTimeout(() => {
                if (notification.parentNode) {
                    notification.remove();
                }
            }, 300);
        }, 3000);
    }
    
    // =================================================================
    // Lazy loading de imágenes
    // =================================================================
    
    function initLazyLoading() {
        const images = document.querySelectorAll('img[data-src]');
        
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
    }
    
    // =================================================================
    // Detección de tema del sistema
    // =================================================================
    
    function initThemeDetection() {
        // Detectar preferencia de tema del sistema
        if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
            document.body.classList.add('dark-mode');
        }
        
        // Escuchar cambios en la preferencia de tema
        window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', e => {
            if (e.matches) {
                document.body.classList.add('dark-mode');
            } else {
                document.body.classList.remove('dark-mode');
            }
        });
    }
    
    // =================================================================
    // Performance monitoring
    // =================================================================
    
    function initPerformanceMonitoring() {
        // Medir tiempo de carga
        window.addEventListener('load', () => {
            const loadTime = performance.timing.loadEventEnd - performance.timing.navigationStart;
            console.log(`Página cargada en ${loadTime}ms`);
        });
        
        // Detectar conexión lenta
        if ('connection' in navigator) {
            const connection = navigator.connection;
            if (connection.effectiveType === 'slow-2g' || connection.effectiveType === '2g') {
                // Reducir animaciones para conexiones lentas
                document.body.classList.add('reduced-motion');
            }
        }
    }
    
    // =================================================================
    // Utilidades
    // =================================================================
    
    // Throttle function para optimizar eventos de scroll
    function throttle(func, limit) {
        let lastFunc;
        let lastRan;
        return function() {
            const context = this;
            const args = arguments;
            if (!lastRan) {
                func.apply(context, args);
                lastRan = Date.now();
            } else {
                clearTimeout(lastFunc);
                lastFunc = setTimeout(function() {
                    if ((Date.now() - lastRan) >= limit) {
                        func.apply(context, args);
                        lastRan = Date.now();
                    }
                }, limit - (Date.now() - lastRan));
            }
        };
    }
    
    // Debounce function para optimizar eventos de resize
    function debounce(func, wait) {
        let timeout;
        return function executedFunction(...args) {
            const later = () => {
                clearTimeout(timeout);
                func(...args);
            };
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
        };
    }
    
    // =================================================================
    // Responsive handlers
    // =================================================================
    
    function handleResize() {
        const handleResizeDebounced = debounce(() => {
            // Reajustar elementos si es necesario
            if (window.innerWidth > 768 && mobileNav.classList.contains('active')) {
                toggleMobileMenu();
            }
        }, 250);
        
        window.addEventListener('resize', handleResizeDebounced);
    }
    
    // =================================================================
    // Gestión de errores
    // =================================================================
    
    function initErrorHandling() {
        window.addEventListener('error', (e) => {
            console.error('Error capturado:', e.error);
            // Aquí puedes añadir lógica para reportar errores
        });
        
        // Manejar errores de promesas no capturadas
        window.addEventListener('unhandledrejection', (e) => {
            console.error('Promesa rechazada no manejada:', e.reason);
        });
    }
    
    // =================================================================
    // Inicialización principal
    // =================================================================
    
    function init() {
        console.log('🚀 Inicializando Portfolio DAM...');
        
        try {
            // Inicializar todos los módulos
            initSmoothScrolling();
            handleNavbarScroll();
            initMobileMenu();
            initScrollAnimations();
            initSkillFilters();
            initProjectFilters();
            initFloatingElements();
            initParallaxEffects();
            initContactForm();
            initLazyLoading();
            initThemeDetection();
            initPerformanceMonitoring();
            handleResize();
            initErrorHandling();
            
            // Pequeño delay para efectos iniciales
            setTimeout(() => {
                animateCounters();
                // initTypingEffect(); // Descomenta si quieres el efecto de escritura
            }, 500);
            
            console.log('✅ Portfolio inicializado correctamente');
            
        } catch (error) {
            console.error('❌ Error durante la inicialización:', error);
        }
    }
    
    // =================================================================
    // Ejecutar inicialización
    // =================================================================
    
    init();
    
});

// =================================================================
// Funciones globales (si necesitas acceso desde el HTML)
// =================================================================

// Función para mostrar/ocultar el CV
function toggleCV() {
    const cvModal = document.getElementById('cv-modal');
    if (cvModal) {
        cvModal.classList.toggle('active');
    }
}

// Función para copiar email al clipboard
function copyEmail() {
    const email = 'tu-email@gmail.com'; // Cambiar por tu email real
    navigator.clipboard.writeText(email).then(() => {
        showNotification('Email copiado al portapapeles', 'success');
    });
}

// Función para mostrar detalles de proyecto
function showProjectDetails(projectId) {
    // Aquí puedes añadir lógica para mostrar un modal con detalles del proyecto
    console.log(`Mostrando detalles del proyecto: ${projectId}`);
}

// =================================================================
// Exportar funciones para testing (opcional)
// =================================================================

if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        throttle,
        debounce,
        showNotification,
        copyEmail
    };
}