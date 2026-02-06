/* ===================================
   Navigation Functionality
   =================================== */

document.addEventListener('DOMContentLoaded', () => {
    const mobileMenuToggle = document.getElementById('mobileMenuToggle');
    const navbarMenu = document.getElementById('navbarMenu');

    if (!mobileMenuToggle || !navbarMenu) return;

    // --- Mobile Menu Toggle ---
    mobileMenuToggle.addEventListener('click', () => {
        const isActive = navbarMenu.classList.toggle('active');

        // Lock body scroll when menu is open
        document.body.style.overflow = isActive ? 'hidden' : '';

        // Animate Hamburger
        const bars = mobileMenuToggle.querySelectorAll('.bar');
        if (isActive) {
            bars[0].style.transform = 'rotate(45deg) translate(5px, 6px)';
            bars[1].style.opacity = '0';
            bars[2].style.transform = 'rotate(-45deg) translate(5px, -6px)';
        } else {
            bars[0].style.transform = 'none';
            bars[1].style.opacity = '1';
            bars[2].style.transform = 'none';
        }
    });

    // --- Close Menu on Link Click ---
    document.querySelectorAll('.navbar-menu a').forEach(link => {
        link.addEventListener('click', () => {
            navbarMenu.classList.remove('active');
            document.body.style.overflow = '';

            // Reset Hamburger
            const bars = mobileMenuToggle.querySelectorAll('.bar');
            bars[0].style.transform = 'none';
            bars[1].style.opacity = '1';
            bars[2].style.transform = 'none';
        });
    });

    // --- Parallax Effect on Profile Image Decoration ---
    window.addEventListener('mousemove', (e) => {
        const decs = document.querySelectorAll('.profile-decoration');
        const x = (e.clientX / window.innerWidth - 0.5) * 40;
        const y = (e.clientY / window.innerHeight - 0.5) * 40;

        decs.forEach((dec, index) => {
            const factor = (index + 1) * 0.5;
            dec.style.transform = `translate(${x * factor}px, ${y * factor}px)`;
        });
    });
});
