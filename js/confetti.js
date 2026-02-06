/* ===================================
   Confetti Effect (Canvas)
   =================================== */

const Confetti = {
    fire: () => {
        const duration = 3000;
        const animationEnd = Date.now() + duration;
        const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 9999 };

        // Simple implementation using canvas overlay
        // If particles.js logic is complex, this creates a temporary overlay

        // Creating a simple Burst visual using DOM elements for simplicity 'Explosion'
        createExplosion(window.innerWidth / 2, window.innerHeight / 2);
    }
};

function createExplosion(x, y) {
    const particleCount = 100;
    const colors = ['#6366f1', '#ec4899', '#ffffff', '#fbbf24'];

    for (let i = 0; i < particleCount; i++) {
        const p = document.createElement('div');
        p.className = 'confetti-particle';
        document.body.appendChild(p);

        const size = Math.random() * 8 + 4;
        p.style.width = `${size}px`;
        p.style.height = `${size}px`;
        p.style.background = colors[Math.floor(Math.random() * colors.length)];
        p.style.position = 'fixed';
        p.style.left = `${x}px`;
        p.style.top = `${y}px`;
        p.style.borderRadius = '50%';
        p.style.pointerEvents = 'none';
        p.style.zIndex = '9999';

        // Physics
        const angle = Math.random() * Math.PI * 2;
        const velocity = Math.random() * 20 + 10;
        const vx = Math.cos(angle) * velocity;
        const vy = Math.sin(angle) * velocity;

        p.animate([
            { transform: `translate(0, 0) scale(1)`, opacity: 1 },
            { transform: `translate(${vx * 20}px, ${vy * 20 + 200}px) scale(0)`, opacity: 0 }
        ], {
            duration: 1500 + Math.random() * 1000,
            easing: 'cubic-bezier(0, .9, .57, 1)',
            fill: 'forwards'
        }).onfinish = () => p.remove();
    }
}
