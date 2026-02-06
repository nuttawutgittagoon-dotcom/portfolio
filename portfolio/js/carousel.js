/* ===================================
   Friends Carousel Navigation
   =================================== */

document.addEventListener('DOMContentLoaded', () => {
    const carousel = document.getElementById('friendsCarousel');
    const prevBtn = document.getElementById('friendPrevBtn');
    const nextBtn = document.getElementById('friendNextBtn');
    
    if (!carousel || !prevBtn || !nextBtn) return;

    const scrollAmount = 350; // Width of card + gap

    // Button Navigation
    prevBtn.addEventListener('click', () => {
        carousel.scrollBy({
            left: -scrollAmount,
            behavior: 'smooth'
        });
    });

    nextBtn.addEventListener('click', () => {
        carousel.scrollBy({
            left: scrollAmount,
            behavior: 'smooth'
        });
    });

    // Mouse Dragging Functionality
    let isDown = false;
    let startX;
    let scrollLeft;

    carousel.addEventListener('mousedown', (e) => {
        isDown = true;
        carousel.classList.add('active');
        startX = e.pageX - carousel.offsetLeft;
        scrollLeft = carousel.scrollLeft;
    });

    carousel.addEventListener('mouseleave', () => {
        isDown = false;
        carousel.classList.remove('active');
    });

    carousel.addEventListener('mouseup', () => {
        isDown = false;
        carousel.classList.remove('active');
    });

    carousel.addEventListener('mousemove', (e) => {
        if (!isDown) return;
        e.preventDefault();
        const x = e.pageX - carousel.offsetLeft;
        const walk = (x - startX) * 2; // Scroll speed
        carousel.scrollLeft = scrollLeft - walk;
    });

    // Update button visibility based on scroll position
    const updateButtons = () => {
        const { scrollLeft, scrollWidth, clientWidth } = carousel;
        
        prevBtn.style.opacity = scrollLeft > 10 ? '1' : '0.3';
        prevBtn.style.pointerEvents = scrollLeft > 10 ? 'auto' : 'none';
        
        nextBtn.style.opacity = scrollLeft + clientWidth < scrollWidth - 10 ? '1' : '0.3';
        nextBtn.style.pointerEvents = scrollLeft + clientWidth < scrollWidth - 10 ? 'auto' : 'none';
    };

    carousel.addEventListener('scroll', updateButtons);
    window.addEventListener('resize', updateButtons);
    
    // Initial call
    setTimeout(updateButtons, 100);
});
