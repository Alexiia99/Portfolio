// =================================================================
// Portfolio DAM - Main JavaScript - COMPLETO CON MEJORAS
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
    
    // Variable para controlar el estado del menú
    let isMenuOpen = false;
    
    // =================================================================
    // Navegación suave MEJORADA
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
                    const targetPosition = targetElement.offsetTop - navbarHeight - 20; // 20px extra de margen
                    
                    window.scrollTo({
                        top: targetPosition,
                        behavior: 'smooth'
                    });
                    
                    // Cerrar menú móvil si está abierto
                    if (isMenuOpen) {
                        toggleMobileMenu();
                    }
                }
            });
        });
    }
    
    // =================================================================
    // Navbar con scroll mejorado
    // =================================================================
    
    function handleNavbarScroll() {
        const throttledScroll = throttle(() => {
            if (window.scrollY > 50) {
                navbar.classList.add('scrolled');
            } else {
                navbar.classList.remove('scrolled');
            }
        }, 10);
        
        window.addEventListener('scroll', throttledScroll);
    }
    
    // =================================================================
    // Menú móvil MEJORADO
    // =================================================================
    
    function toggleMobileMenu() {
        isMenuOpen = !isMenuOpen;
        
        if (isMenuOpen) {
            // Abrir menú
            mobileNav.classList.add('active');
            mobileMenuBtn.classList.add('active');
            document.body.style.overflow = 'hidden'; // Prevenir scroll
            
            // Añadir event listener para cerrar con ESC
            document.addEventListener('keydown', handleEscapeKey);
            
        } else {
            // Cerrar menú
            mobileNav.classList.remove('active');
            mobileMenuBtn.classList.remove('active');
            document.body.style.overflow = ''; // Restaurar scroll
            
            // Remover event listener
            document.removeEventListener('keydown', handleEscapeKey);
        }
    }
    
    // Función para cerrar menú con tecla ESC
    function handleEscapeKey(e) {
        if (e.key === 'Escape' && isMenuOpen) {
            toggleMobileMenu();
        }
    }
    
    function initMobileMenu() {
        const mobileNavLinks = document.querySelectorAll('.mobile-nav-links a');
        
        if (mobileMenuBtn) {
            mobileMenuBtn.addEventListener('click', toggleMobileMenu);
        }
        
        // Cerrar menú al hacer click en un enlace
        mobileNavLinks.forEach(link => {
            link.addEventListener('click', () => {
                if (isMenuOpen) {
                    setTimeout(() => {
                        toggleMobileMenu();
                    }, 200); // Pequeño delay para mejor UX
                }
            });
        });
        
        // Cerrar menú al hacer click fuera del área de navegación
        document.addEventListener('click', (e) => {
            if (isMenuOpen && !navbar.contains(e.target) && !mobileNav.contains(e.target)) {
                toggleMobileMenu();
            }
        });
        
        // Cerrar menú al cambiar el tamaño de ventana
        window.addEventListener('resize', debounce(() => {
            if (window.innerWidth > 768 && isMenuOpen) {
                toggleMobileMenu();
            }
        }, 250));
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
                    
                    // Animar contadores cuando sean visibles
                    if (entry.target.classList.contains('stats-detailed')) {
                        animateCounters();
                    }
                }
            });
        }, observerOptions);
        
        fadeElements.forEach(element => {
            observer.observe(element);
        });
        
        // Observar también las secciones de stats
        const statsElements = document.querySelectorAll('.stats-detailed, .skills-grid');
        statsElements.forEach(element => {
            observer.observe(element);
        });
    }
    
    // =================================================================
    // Animación de barras de progreso de skills
    // =================================================================
    
    function animateSkillBars() {
        skillBars.forEach((bar, index) => {
            const level = bar.getAttribute('data-level');
            if (level) {
                setTimeout(() => {
                    bar.style.width = level + '%';
                }, index * 100); // Delay escalonado para efecto secuencial
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
                
                skillCards.forEach((card, index) => {
                    if (filterValue === 'all') {
                        card.classList.remove('hidden');
                        // Animación escalonada
                        setTimeout(() => {
                            card.style.animation = 'fadeInUp 0.5s ease forwards';
                        }, index * 50);
                    } else {
                        const cardCategory = card.getAttribute('data-category');
                        if (cardCategory === filterValue) {
                            card.classList.remove('hidden');
                            setTimeout(() => {
                                card.style.animation = 'fadeInUp 0.5s ease forwards';
                            }, index * 50);
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
                
                projectCards.forEach((card, index) => {
                    if (filterValue === 'all') {
                        card.classList.remove('hidden');
                        setTimeout(() => {
                            card.style.animation = 'fadeInUp 0.5s ease forwards';
                        }, index * 100);
                    } else {
                        const cardCategory = card.getAttribute('data-category');
                        if (cardCategory === filterValue) {
                            card.classList.remove('hidden');
                            setTimeout(() => {
                                card.style.animation = 'fadeInUp 0.5s ease forwards';
                            }, index * 100);
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
        const throttledParallax = throttle(() => {
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
                const yPos = scrolled * 0.2;
                profileImg.style.transform = `translateY(${yPos}px)`;
            }
        }, 16); // ~60fps
        
        window.addEventListener('scroll', throttledParallax);
    }
    
    // =================================================================
    // Contador animado para stats
    // =================================================================
    
    function animateCounters() {
        const counters = document.querySelectorAll('.stat-number');
        
        counters.forEach(counter => {
            const text = counter.textContent;
            const target = parseInt(text.replace(/\D/g, ''));
            
            if (target && !counter.hasAttribute('data-animated')) {
                counter.setAttribute('data-animated', 'true');
                const increment = target / 100;
                let current = 0;
                
                const timer = setInterval(() => {
                    current += increment;
                    if (current >= target) {
                        counter.textContent = text; // Restaurar texto original
                        clearInterval(timer);
                    } else {
                        const currentText = text.replace(/\d+/, Math.floor(current));
                        counter.textContent = currentText;
                    }
                }, 20);
            }
        });
    }
    
    // =================================================================
    // Efectos de ripple para botones
    // =================================================================
    
    function addRippleEffect() {
        const buttons = document.querySelectorAll('.btn, .mobile-nav-links a, .contact-btn');
        
        buttons.forEach(button => {
            button.addEventListener('click', function(e) {
                const ripple = document.createElement('span');
                const rect = this.getBoundingClientRect();
                const size = Math.max(rect.width, rect.height);
                const x = e.clientX - rect.left - size / 2;
                const y = e.clientY - rect.top - size / 2;
                
                ripple.style.cssText = `
                    position: absolute;
                    width: ${size}px;
                    height: ${size}px;
                    left: ${x}px;
                    top: ${y}px;
                    background: rgba(255, 255, 255, 0.3);
                    border-radius: 50%;
                    transform: scale(0);
                    animation: ripple 0.6s ease-out;
                    pointer-events: none;
                    z-index: 1;
                `;
                
                this.style.position = 'relative';
                this.style.overflow = 'hidden';
                this.appendChild(ripple);
                
                // Remover el ripple después de la animación
                setTimeout(() => {
                    if (ripple.parentNode) {
                        ripple.remove();
                    }
                }, 600);
            });
        });
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
            background: var(--gradient-primary);
            color: white;
            padding: 1rem 2rem;
            border-radius: 10px;
            box-shadow: var(--shadow-lg);
            z-index: 9999;
            transform: translateX(100%);
            transition: transform 0.3s ease;
            font-weight: 600;
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
            console.log(`🚀 Página cargada en ${loadTime}ms`);
        });
        
        // Detectar conexión lenta
        if ('connection' in navigator) {
            const connection = navigator.connection;
            if (connection.effectiveType === 'slow-2g' || connection.effectiveType === '2g') {
                // Reducir animaciones para conexiones lentas
                document.body.classList.add('reduced-motion');
                console.log('🐌 Conexión lenta detectada - Reduciendo animaciones');
            }
        }
    }
    
    // =================================================================
    // Gestión de errores
    // =================================================================
    
    function initErrorHandling() {
        window.addEventListener('error', (e) => {
            console.error('❌ Error capturado:', e.error);
            // Aquí puedes añadir lógica para reportar errores
        });
        
        // Manejar errores de promesas no capturadas
        window.addEventListener('unhandledrejection', (e) => {
            console.error('❌ Promesa rechazada no manejada:', e.reason);
        });
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
            if (window.innerWidth > 768 && isMenuOpen) {
                toggleMobileMenu();
            }
            
            // Recalcular posiciones de elementos flotantes
            const floatingElements = document.querySelectorAll('.floating-shape');
            floatingElements.forEach(element => {
                if (Math.random() > 0.7) { // Solo algunos elementos
                    element.style.left = Math.random() * 100 + '%';
                    element.style.top = Math.random() * 100 + '%';
                }
            });
        }, 250);
        
        window.addEventListener('resize', handleResizeDebounced);
    }
    
    // =================================================================
    // Efectos adicionales de UI
    // =================================================================
    
    function initUIEffects() {
        // Efecto de hover en las cards
        const cards = document.querySelectorAll('.skill-card, .project-card, .stat-card');
        cards.forEach(card => {
            card.addEventListener('mouseenter', function() {
                this.style.transform += ' translateZ(10px)';
            });
            
            card.addEventListener('mouseleave', function() {
                this.style.transform = this.style.transform.replace(' translateZ(10px)', '');
            });
        });
        
        // Efecto de partículas en el hero (opcional)
        initParticleEffect();
    }
    
    function initParticleEffect() {
        // Crear partículas sutiles en el hero
        const hero = document.querySelector('.hero');
        if (!hero) return;
        
        setInterval(() => {
            if (Math.random() > 0.8) { // Solo ocasionalmente
                const particle = document.createElement('div');
                particle.style.cssText = `
                    position: absolute;
                    width: 4px;
                    height: 4px;
                    background: var(--color-primary);
                    border-radius: 50%;
                    opacity: 0.6;
                    left: ${Math.random() * 100}%;
                    top: ${Math.random() * 100}%;
                    animation: float 4s ease-in-out forwards;
                    pointer-events: none;
                    z-index: 1;
                `;
                
                hero.appendChild(particle);
                
                setTimeout(() => {
                    if (particle.parentNode) {
                        particle.remove();
                    }
                }, 4000);
            }
        }, 2000);
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
            addRippleEffect();
            initContactForm();
            initLazyLoading();
            initThemeDetection();
            initPerformanceMonitoring();
            handleResize();
            initErrorHandling();
            initUIEffects();
            
            console.log('✅ Portfolio inicializado correctamente');
            
        } catch (error) {
            console.error('❌ Error durante la inicialización:', error);
            // Mostrar notificación de error al usuario
            showNotification('Error al cargar el portfolio. Por favor, recarga la página.', 'error');
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
    const email = 'alexiahj111@gmail.com';
    navigator.clipboard.writeText(email).then(() => {
        showNotification('📧 Email copiado al portapapeles', 'success');
    }).catch(() => {
        // Fallback para navegadores que no soportan clipboard API
        const textArea = document.createElement('textarea');
        textArea.value = email;
        document.body.appendChild(textArea);
        textArea.select();
        document.execCommand('copy');
        document.body.removeChild(textArea);
        showNotification('📧 Email copiado al portapapeles', 'success');
    });
}

// Función para mostrar detalles de proyecto
function showProjectDetails(projectId) {
    console.log(`🔍 Mostrando detalles del proyecto: ${projectId}`);
    // Aquí puedes añadir lógica para mostrar un modal con detalles del proyecto
    showNotification(`Cargando detalles de ${projectId}...`, 'info');
}

// Función para mostrar notificaciones (disponible globalmente)
function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.textContent = message;
    
    const colors = {
        'success': 'var(--gradient-secondary)',
        'error': '#ff6b6b',
        'info': 'var(--gradient-primary)',
        'warning': '#ffa500'
    };
    
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: ${colors[type] || colors.info};
        color: white;
        padding: 1rem 2rem;
        border-radius: 10px;
        box-shadow: 0 10px 25px rgba(0,0,0,0.1);
        z-index: 9999;
        transform: translateX(100%);
        transition: transform 0.3s cubic-bezier(0.68, -0.55, 0.265, 1.55);
        font-weight: 600;
        max-width: 300px;
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
// Exportar funciones para testing (opcional)
// =================================================================

if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        showNotification,
        copyEmail,
        showProjectDetails
    };
}