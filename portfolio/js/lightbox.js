/* ===================================
   Gallery Lightbox Functionality
   =================================== */

document.addEventListener('DOMContentLoaded', () => {
    const lightbox = document.getElementById('lightbox');
    const lightboxImg = document.getElementById('lightbox-img');
    const lightboxVideo = document.getElementById('lightbox-video');
    const lightboxCaption = document.getElementById('lightbox-caption');
    const closeBtn = document.querySelector('.lightbox-close');

    if (!lightbox || !lightboxCaption || !closeBtn) return;

    const galleryItems = document.querySelectorAll('.gallery-item');

    galleryItems.forEach(item => {
        item.addEventListener('click', (e) => {
            // Find the image or video within the item
            const img = item.querySelector('img');
            const video = item.querySelector('video');
            const titleEl = item.querySelector('h4');
            const descEl = item.querySelector('p');

            const title = titleEl ? titleEl.textContent : '';
            const subtitle = descEl ? descEl.textContent : '';

            // Update Caption
            lightboxCaption.innerHTML = `<strong>${title}</strong><br>${subtitle}`;

            // Reset visibility and state
            if (lightboxImg) {
                lightboxImg.style.display = 'none';
                lightboxImg.src = '';
            }
            if (lightboxVideo) {
                lightboxVideo.style.display = 'none';
                lightboxVideo.pause();
                lightboxVideo.removeAttribute('src'); // Better than src=""
                lightboxVideo.load();
            }

            // Show appropriate content
            if (img) {
                lightboxImg.src = img.src;
                lightboxImg.style.display = 'block';
            } else if (video) {
                // Use currentSrc if available (resolved URL), else search for source or src attribute
                const videoSrc = video.currentSrc || video.src || (video.querySelector('source') ? video.querySelector('source').src : '');

                if (videoSrc) {
                    lightboxVideo.src = videoSrc;
                    lightboxVideo.style.display = 'block';
                    lightboxVideo.style.width = '100%'; // Ensure it fills the space
                    lightboxVideo.load();

                    // Small delay to ensure it's ready to play
                    setTimeout(() => {
                        lightboxVideo.play().catch(err => console.error("Lightbox play error:", err));
                    }, 100);
                }
            }

            // Open Lightbox with Flex
            lightbox.style.display = 'flex';
            document.body.style.overflow = 'hidden';
        });
    });

    const closeLightbox = () => {
        lightbox.style.display = 'none';
        document.body.style.overflow = '';
        if (lightboxVideo) {
            lightboxVideo.pause();
            lightboxVideo.src = '';
        }
    };

    closeBtn.addEventListener('click', closeLightbox);

    // Close on click outside content
    lightbox.addEventListener('click', (e) => {
        if (e.target === lightbox) {
            closeLightbox();
        }
    });

    // Close on Escape key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && lightbox.style.display === 'flex') {
            closeLightbox();
        }
    });
});
