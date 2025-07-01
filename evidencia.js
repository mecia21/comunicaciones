let currentSlide = 0;
const slides = document.querySelectorAll('.carousel-slide');
const totalSlides = slides.length;
const track = document.getElementById('carouselTrack');
const indicatorsContainer = document.getElementById('indicators');

// Inicialización del carrusel
function initCarousel() {
    // Crear indicadores
    for (let i = 0; i < totalSlides; i++) {
        const indicator = document.createElement('div');
        indicator.className = 'indicator';
        indicator.onclick = () => goToSlide(i);
        indicatorsContainer.appendChild(indicator);
    }
    
    // Actualizar carrusel inicial
    updateCarousel();
    
    // Auto-play del carrusel
    setInterval(nextSlide, 5000);
}

// Actualizar visualización del carrusel
function updateCarousel() {
    track.style.transform = `translateX(-${currentSlide * 100}%)`;
    
    const indicators = document.querySelectorAll('.indicator');
    indicators.forEach((indicator, index) => {
        indicator.classList.toggle('active', index === currentSlide);
    });
}

// Navegación del carrusel
function nextSlide() {
    currentSlide = (currentSlide + 1) % totalSlides;
    updateCarousel();
}

function previousSlide() {
    currentSlide = (currentSlide - 1 + totalSlides) % totalSlides;
    updateCarousel();
}

function goToSlide(index) {
    currentSlide = index;
    updateCarousel();
}

// Crear partículas animadas de fondo
function createParticles() {
    const particles = document.querySelector('.particles');
    const particleCount = 50;
    
    for (let i = 0; i < particleCount; i++) {
        const particle = document.createElement('div');
        particle.className = 'particle';
        
        // Posición aleatoria
        particle.style.left = Math.random() * 100 + '%';
        particle.style.top = Math.random() * 100 + '%';
        
        // Tamaño aleatorio
        const size = Math.random() * 4 + 2;
        particle.style.width = size + 'px';
        particle.style.height = size + 'px';
        
        // Animación aleatoria
        particle.style.animationDelay = Math.random() * 6 + 's';
        particle.style.animationDuration = Math.random() * 3 + 3 + 's';
        
        particles.appendChild(particle);
    }
}

// Efecto parallax en el scroll
function initParallax() {
    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        const particles = document.querySelector('.particles');
        particles.style.transform = `translateY(${scrolled * 0.5}px)`;
    });
}

// Animación de aparición de las tarjetas al hacer scroll
function initScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.animationPlayState = 'running';
            }
        });
    }, observerOptions);
    
    // Observar las tarjetas de evidencias
    const cards = document.querySelectorAll('.evidencia-card');
    cards.forEach(card => {
        observer.observe(card);
    });
}

// Manejo de eventos para los botones "Ver Más"
function initVerMasButtons() {
    const verMasButtons = document.querySelectorAll('.ver-mas-btn');
    
    verMasButtons.forEach((button, index) => {
        button.addEventListener('click', (e) => {
            e.preventDefault();
            
            // Aquí puedes personalizar la acción para cada botón
            const cardTitle = button.parentElement.querySelector('h3').textContent;
            
            // Ejemplo de modal o navegación
            alert(`Próximamente: Detalles completos de "${cardTitle}"`);
            
            // Alternativa: redirigir a páginas específicas
            // window.location.href = `evidencia-${index + 1}.html`;
        });
    });
}

// Efecto de hover mejorado para las tarjetas
function initCardHoverEffects() {
    const cards = document.querySelectorAll('.evidencia-card');
    
    cards.forEach(card => {
        card.addEventListener('mouseenter', () => {
            // Efecto de brillo adicional
            card.style.boxShadow = '0 25px 50px rgba(0, 0, 0, 0.4), 0 0 30px rgba(102, 126, 234, 0.3)';
        });
        
        card.addEventListener('mouseleave', () => {
            // Restaurar efecto original
            card.style.boxShadow = '';
        });
    });
}

// Navegación por teclado para el carrusel
function initKeyboardNavigation() {
    document.addEventListener('keydown', (e) => {
        switch(e.key) {
            case 'ArrowLeft':
                previousSlide();
                break;
            case 'ArrowRight':
                nextSlide();
                break;
            case 'Escape':
                // Volver al inicio
                window.location.href = 'index.html';
                break;
        }
    });
}

// Pausar auto-play cuando el usuario interactúa
let autoPlayInterval;
function initAutoPlayControl() {
    const carouselContainer = document.querySelector('.carousel-container');
    
    // Pausar en hover
    carouselContainer.addEventListener('mouseenter', () => {
        clearInterval(autoPlayInterval);
    });
    
    // Reanudar al salir
    carouselContainer.addEventListener('mouseleave', () => {
        autoPlayInterval = setInterval(nextSlide, 5000);
    });
    
    // Iniciar auto-play
    autoPlayInterval = setInterval(nextSlide, 5000);
}

// Responsive: Manejar cambios de tamaño de ventana
function initResponsiveHandling() {
    let resizeTimeout;
    
    window.addEventListener('resize', () => {
        clearTimeout(resizeTimeout);
        resizeTimeout = setTimeout(() => {
            // Reajustar carrusel después del resize
            updateCarousel();
        }, 250);
    });
}

// Inicialización principal cuando el DOM está listo
document.addEventListener('DOMContentLoaded', () => {
    // Inicializar todos los componentes
    initCarousel();
    createParticles();
    initParallax();
    initScrollAnimations();
    initVerMasButtons();
    initCardHoverEffects();
    initKeyboardNavigation();
    initAutoPlayControl();
    initResponsiveHandling();
    
    // Mensaje de bienvenida (opcional)
    console.log('🚀 Página de Evidencias CommuniTech cargada exitosamente!');
});

// Función para suavizar el scroll a secciones
function smoothScrollTo(targetId) {
    const target = document.getElementById(targetId);
    if (target) {
        target.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
        });
    }
}

// Agregar función de carga progresiva para imágenes (lazy loading)
function initLazyLoading() {
    const images = document.querySelectorAll('img');
    
    const imageObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.style.opacity = '0';
                img.style.transition = 'opacity 0.5s ease';
                
                img.onload = () => {
                    img.style.opacity = '1';
                };
                
                imageObserver.unobserve(img);
            }
        });
    });
    
    images.forEach(img => imageObserver.observe(img));
}