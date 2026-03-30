/**
 * ============================================
 * PORTFOLIO - GERARDO | FULL STACK DEVELOPER
 * JavaScript con Vanilla JS (sin dependencias)
 * ============================================
 */

// Esperar a que el DOM esté completamente cargado
document.addEventListener('DOMContentLoaded', () => {
    // Inicializar todas las funcionalidades
    initNavigation();
    initTypingEffect();
    initScrollAnimations();
    initContactForm();
    initMatrixBackground();
});

/**
 * ============================================
 * 1. NAVEGACIÓN
 * ============================================
 */
function initNavigation() {
    const header = document.querySelector('.header');
    const navToggle = document.getElementById('nav-toggle');
    const navMenu = document.getElementById('nav-menu');
    const navLinks = document.querySelectorAll('.nav__link');

    // Toggle menú móvil
    if (navToggle && navMenu) {
        navToggle.addEventListener('click', () => {
            navMenu.classList.toggle('active');
            
            // Cambiar icono de hamburguesa a X
            const icon = navToggle.querySelector('i');
            if (navMenu.classList.contains('active')) {
                icon.classList.remove('fa-bars');
                icon.classList.add('fa-times');
            } else {
                icon.classList.remove('fa-times');
                icon.classList.add('fa-bars');
            }
        });

        // Cerrar menú al hacer click en un enlace
        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                navMenu.classList.remove('active');
                const icon = navToggle.querySelector('i');
                icon.classList.remove('fa-times');
                icon.classList.add('fa-bars');
            });
        });
    }

    // Efecto de header al hacer scroll
    let lastScroll = 0;
    window.addEventListener('scroll', () => {
        const currentScroll = window.pageYOffset;

        // Añadir clase cuando se hace scroll
        if (currentScroll > 50) {
            header.classList.add('header--scrolled');
        } else {
            header.classList.remove('header--scrolled');
        }

        lastScroll = currentScroll;
    });

    // Smooth scroll para enlaces internos
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                const headerHeight = header.offsetHeight;
                const targetPosition = targetElement.offsetTop - headerHeight;

                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
}

/**
 * ============================================
 * 2. EFECTO DE ESCRITURA (Typing Effect)
 * ============================================
 */
function initTypingEffect() {
    const typingElement = document.getElementById('typing-text');
    if (!typingElement) return;

    const phrases = [
        'React Developer',
        'JavaScript Enthusiast',
        'CSS Animation Master',
        'Full Stack Developer',
        'BEM Methodology Expert',
        'Problem Solver'
    ];

    let phraseIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    let typingSpeed = 100;

    function type() {
        const currentPhrase = phrases[phraseIndex];
        
        if (isDeleting) {
            // Eliminando caracteres
            typingElement.textContent = currentPhrase.substring(0, charIndex - 1);
            charIndex--;
            typingSpeed = 50;
        } else {
            // Escribiendo caracteres
            typingElement.textContent = currentPhrase.substring(0, charIndex + 1);
            charIndex++;
            typingSpeed = 100;
        }

        // Verificar si completó la palabra
        if (!isDeleting && charIndex === currentPhrase.length) {
            typingSpeed = 2000; // Pausa al completar
            isDeleting = true;
        } else if (isDeleting && charIndex === 0) {
            isDeleting = false;
            phraseIndex = (phraseIndex + 1) % phrases.length;
            typingSpeed = 500; // Pausa antes de escribir la siguiente
        }

        setTimeout(type, typingSpeed);
    }

    // Iniciar efecto después de un breve retraso
    setTimeout(type, 1000);
}

/**
 * ============================================
 * 3. ANIMACIONES AL HACER SCROLL
 * ============================================
 */
function initScrollAnimations() {
    // Elementos a animar
    const animatedElements = document.querySelectorAll(
        '.skill-card, .project-card, .section__title, .contact__info, .contact__form'
    );

    // Añadir clase inicial
    animatedElements.forEach(el => {
        el.classList.add('fade-in');
    });

    // Intersection Observer para animaciones
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                
                // Dejar de observar una vez animado
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    animatedElements.forEach(el => {
        observer.observe(el);
    });

    // Animación de contador para habilidades (opcional)
    animateOnScroll();
}

/**
 * ============================================
 * 4. ANIMACIÓN DE CONTADORES
 * ============================================
 */
function animateOnScroll() {
    const counters = document.querySelectorAll('.skill-tag');
    
    const counterObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.animation = 'pulse 0.5s ease forwards';
            }
        });
    }, { threshold: 0.5 });

    counters.forEach(counter => {
        counterObserver.observe(counter);
    });
}

/**
 * ============================================
 * 5. FORMULARIO DE CONTACTO
 * ============================================
 */
function initContactForm() {
    const form = document.getElementById('contact-form');
    
    if (!form) return;

    form.addEventListener('submit', async (e) => {
        e.preventDefault();

        // Obtener datos del formulario
        const formData = new FormData(form);
        const data = {
            name: formData.get('name'),
            email: formData.get('email'),
            subject: formData.get('subject'),
            message: formData.get('message')
        };

        // Validar formulario
        if (!validateForm(data)) {
            return;
        }

        // Simular envío (aquí iría la integración con backend/email service)
        const submitBtn = form.querySelector('button[type="submit"]');
        const originalText = submitBtn.innerHTML;
        
        submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Enviando...';
        submitBtn.disabled = true;

        try {
            // Simular petición asíncrona
            await new Promise(resolve => setTimeout(resolve, 2000));

            // Mostrar mensaje de éxito
            showNotification('¡Mensaje enviado con éxito! Te contactaré pronto.', 'success');
            form.reset();
        } catch (error) {
            showNotification('Hubo un error al enviar. Intenta de nuevo.', 'error');
        } finally {
            submitBtn.innerHTML = originalText;
            submitBtn.disabled = false;
        }
    });
}

/**
 * Validar datos del formulario
 */
function validateForm(data) {
    const { name, email, subject, message } = data;

    if (!name || name.trim().length < 2) {
        showNotification('Por favor ingresa un nombre válido.', 'error');
        return false;
    }

    if (!email || !isValidEmail(email)) {
        showNotification('Por favor ingresa un email válido.', 'error');
        return false;
    }

    if (!subject || subject.trim().length < 3) {
        showNotification('Por favor ingresa un asunto.', 'error');
        return false;
    }

    if (!message || message.trim().length < 10) {
        showNotification('Por favor ingresa un mensaje más detallado.', 'error');
        return false;
    }

    return true;
}

/**
 * Validar formato de email
 */
function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

/**
 * Mostrar notificación
 */
function showNotification(message, type = 'info') {
    // Crear elemento de notificación
    const notification = document.createElement('div');
    notification.className = `notification notification--${type}`;
    notification.innerHTML = `
        <i class="fas ${type === 'success' ? 'fa-check-circle' : 'fa-exclamation-circle'}"></i>
        <span>${message}</span>
    `;

    // Estilos de la notificación
    Object.assign(notification.style, {
        position: 'fixed',
        top: '100px',
        right: '20px',
        padding: '16px 24px',
        backgroundColor: type === 'success' ? '#00ff88' : '#ff4444',
        color: '#0a0a0a',
        borderRadius: '8px',
        boxShadow: '0 10px 25px rgba(0, 0, 0, 0.5)',
        display: 'flex',
        alignItems: 'center',
        gap: '12px',
        fontWeight: '500',
        zIndex: '1000',
        animation: 'slideIn 0.3s ease forwards',
        maxWidth: '350px'
    });

    document.body.appendChild(notification);

    // Eliminar después de 5 segundos
    setTimeout(() => {
        notification.style.animation = 'slideOut 0.3s ease forwards';
        setTimeout(() => notification.remove(), 300);
    }, 5000);
}

// Agregar estilos de animación para notificaciones
const notificationStyles = document.createElement('style');
notificationStyles.textContent = `
    @keyframes slideIn {
        from {
            transform: translateX(100%);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }
    @keyframes slideOut {
        from {
            transform: translateX(0);
            opacity: 1;
        }
        to {
            transform: translateX(100%);
            opacity: 0;
        }
    }
`;
document.head.appendChild(notificationStyles);

/**
 * ============================================
 * 6. EFECTO MATRIX DE FONDO
 * ============================================
 */
function initMatrixBackground() {
    const matrixContainer = document.getElementById('matrix-bg');
    if (!matrixContainer) return;

    // Crear canvas para efecto matrix
    const canvas = document.createElement('canvas');
    canvas.style.cssText = `
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        opacity: 0.03;
    `;
    matrixContainer.appendChild(canvas);

    const ctx = canvas.getContext('2d');

    // Ajustar tamaño del canvas
    function resizeCanvas() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    }
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    // Caracteres para el efecto matrix
    const chars = 'アイウエオカキクケコサシスセソタチツテトナニヌネノハヒフヘホマミムメモヤユヨラリルレロワヲン0123456789ABCDEF';
    const charArray = chars.split('');

    const fontSize = 14;
    const columns = Math.floor(canvas.width / fontSize);
    const drops = Array(columns).fill(1);

    function drawMatrix() {
        // Fondo semi-transparente para efecto de desvanecimiento
        ctx.fillStyle = 'rgba(10, 10, 10, 0.05)';
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        ctx.fillStyle = '#00ff88';
        ctx.font = `${fontSize}px monospace`;

        for (let i = 0; i < drops.length; i++) {
            const char = charArray[Math.floor(Math.random() * charArray.length)];
            ctx.fillText(char, i * fontSize, drops[i] * fontSize);

            // Reiniciar gota aleatoriamente
            if (drops[i] * fontSize > canvas.height && Math.random() > 0.975) {
                drops[i] = 0;
            }

            drops[i]++;
        }
    }

    // Animar
    setInterval(drawMatrix, 50);
}

/**
 * ============================================
 * 7. EFECTO PARALLAX SUAVE
 * ============================================
 */
function initParallax() {
    const hero = document.querySelector('.hero');
    if (!hero) return;

    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        const heroContent = hero.querySelector('.hero__content');
        
        if (heroContent && scrolled < window.innerHeight) {
            heroContent.style.transform = `translateY(${scrolled * 0.3}px)`;
            heroContent.style.opacity = 1 - (scrolled / window.innerHeight);
        }
    });
}

/**
 * ============================================
 * 8. DETECCIÓN DE MODO OSCURO/CLARO
 * ============================================
 */
function detectColorScheme() {
    // Este portfolio usa modo oscuro por defecto
    // Pero podemos detectar preferencias del sistema
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    console.log(`Dark mode preferred: ${prefersDark}`);
    console.log(`Reduced motion preferred: ${prefersReducedMotion}`);

    // El CSS ya maneja prefers-reduced-motion
}

/**
 * ============================================
 * 9. LAZY LOADING PARA IMÁGENES
 * ============================================
 */
function initLazyLoading() {
    const images = document.querySelectorAll('img[data-src]');
    
    const imageObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.removeAttribute('data-src');
                imageObserver.unobserve(img);
            }
        });
    });

    images.forEach(img => imageObserver.observe(img));
}

/**
 * ============================================
 * 10. UTILIDADES ADICIONALES
 * ============================================
 */

// Detectar si el usuario está en móvil
function isMobile() {
    return window.innerWidth <= 768;
}

// Throttle para eventos de scroll
function throttle(func, limit) {
    let inThrottle;
    return function(...args) {
        if (!inThrottle) {
            func.apply(this, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    };
}

// Debounce para resize
function debounce(func, wait) {
    let timeout;
    return function(...args) {
        clearTimeout(timeout);
        timeout = setTimeout(() => func.apply(this, args), wait);
    };
}

/**
 * ============================================
 * INICIALIZACIÓN FINAL
 * ============================================
 */
// Ejecutar detección de esquema de color
detectColorScheme();

// Inicializar lazy loading si hay imágenes
initLazyLoading();

// Inicializar parallax
initParallax();

// Console Easter Egg
console.log('%c👋 ¡Hola desarrollador!', 'color: #00ff88; font-size: 20px; font-weight: bold;');
console.log('%c¿Te gusta el código? ¡A mí también!', 'color: #a0a0a0; font-size: 14px;');
console.log('%cPortfolio construido con ❤️ y mucho café', 'color: #666666; font-size: 12px;');
console.log('%cTecnologías: HTML5, CSS3 (BEM), Vanilla JavaScript', 'color: #666666; font-size: 12px;');