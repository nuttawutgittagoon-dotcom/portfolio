// ===================================
// Custom Cursor & Interaction Logic
// ===================================

// Initialized at the bottom of the file

function initCustomCursor() {
    const cursorDot = document.createElement('div');
    cursorDot.className = 'cursor-dot';

    const cursorOutline = document.createElement('div');
    cursorOutline.className = 'cursor-outline';

    document.body.appendChild(cursorDot);
    document.body.appendChild(cursorOutline);

    // Mouse Movement
    window.addEventListener('mousemove', (e) => {
        const posX = e.clientX;
        const posY = e.clientY;

        // Dot follows instantly
        cursorDot.style.left = `${posX}px`;
        cursorDot.style.top = `${posY}px`;

        // Outline follows with slight delay (animation usually handled via CSS transition, 
        // but explicit animate makes it smoother)
        cursorOutline.animate({
            left: `${posX}px`,
            top: `${posY}px`
        }, { duration: 500, fill: "forwards" });
    });

    // Hover Effects
    const interactables = document.querySelectorAll('a, button, input, textarea, .glass-card, .music-player');

    interactables.forEach(el => {
        el.addEventListener('mouseenter', () => document.body.classList.add('hovering'));
        el.addEventListener('mouseleave', () => document.body.classList.remove('hovering'));
    });

    // Click Ripple Effect
    window.addEventListener('click', (e) => {
        const ripple = document.createElement('div');
        ripple.className = 'cursor-click-ripple';
        ripple.style.left = `${e.clientX}px`;
        ripple.style.top = `${e.clientY}px`;
        document.body.appendChild(ripple);

        ripple.addEventListener('animationend', () => {
            ripple.remove();
        });
    });
}

function initTiltEffect() {
    const cards = document.querySelectorAll('.glass-card, .glass-card-hover, .friend-card, .gallery-item');

    cards.forEach(card => {
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;

            // Calculate center
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;

            // Calculate tilt amount (max 15deg)
            const rotateX = ((y - centerY) / centerY) * -5; // Inverted Y for natural tilt
            const rotateY = ((x - centerX) / centerX) * 5;

            card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.02)`;
        });

        card.addEventListener('mouseleave', () => {
            card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) scale(1)';
        });
    });
}

function initParallaxEffect() {
    const orbs = document.querySelectorAll('.bg-gradient-orb');

    window.addEventListener('mousemove', (e) => {
        const x = (window.innerWidth - e.pageX * 2) / 90;
        const y = (window.innerHeight - e.pageY * 2) / 90;

        orbs.forEach((orb, index) => {
            const factor = index === 0 ? 1 : -1;
            // Use translation instead of background-position for performance
            orb.style.transform = `translate(${x * factor}px, ${y * factor}px)`;
        });
    });
}

// Initialize everything
document.addEventListener('DOMContentLoaded', () => {
    // Check if device supports hover (desktop)
    if (window.matchMedia("(pointer: fine)").matches) {
        initCustomCursor();
    }

    initTiltEffect();
    initGalleryVideos(); // New: Video playback on hover

    if (window.matchMedia("(min-width: 1024px)").matches) {
        initParallaxEffect();
    }
});

function initGalleryVideos() {
    const galleryItems = document.querySelectorAll('.gallery-item');

    galleryItems.forEach(item => {
        const video = item.querySelector('video');
        if (!video) return;

        item.addEventListener('mouseenter', () => {
            video.play().catch(error => {
                console.log("Video play failed or interrupted:", error);
            });
        });

        item.addEventListener('mouseleave', () => {
            video.pause();
            // Optional: reset to start
            // video.currentTime = 0;
        });
    });
}
