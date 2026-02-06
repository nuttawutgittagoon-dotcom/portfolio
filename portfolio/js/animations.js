// ===================================
// Animations JavaScript
// ===================================

document.addEventListener('DOMContentLoaded', () => {
    initAnimations();
});

function initAnimations() {
    // Intersection Observer for scroll animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -100px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animated');

                // Unobserve after animation to prevent re-triggering
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Observe all animated elements
    const animatedElements = document.querySelectorAll('.animate-on-scroll, .stagger-item');
    animatedElements.forEach(el => {
        observer.observe(el);
    });

    // Add hover effects to cards
    const cards = document.querySelectorAll('.card');
    cards.forEach(card => {
        card.addEventListener('mouseenter', function () {
            this.style.transform = 'translateY(-8px)';
        });

        card.addEventListener('mouseleave', function () {
            this.style.transform = 'translateY(0)';
        });
    });
}

// Parallax effect for hero section (optional)
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const heroSection = document.querySelector('.hero-section');

    if (heroSection) {
        heroSection.style.transform = `translateY(${scrolled * 0.5}px)`;
        heroSection.style.opacity = 1 - (scrolled / 600);
    }
});
