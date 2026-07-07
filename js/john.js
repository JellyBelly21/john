document.addEventListener('DOMContentLoaded', () => {
    // 1. Create and inject the lightbox overlay DOM elements dynamically
    const overlay = document.createElement('div');
    overlay.className = 'lightbox-overlay';
    overlay.setAttribute('aria-hidden', 'true');
    overlay.innerHTML = `
        <span class="lightbox-close" role="button" aria-label="Close image zoom">&times;</span>
        <img class="lightbox-img" src="" alt="Zoomed image view">
    `;
    document.body.appendChild(overlay);

    const lightboxImg = overlay.querySelector('.lightbox-img');
    const closeBtn = overlay.querySelector('.lightbox-close');

    // 2. Select all images inside the <main> element
    const articleImages = document.querySelectorAll('main img');

    articleImages.forEach(img => {
        // Add styling class for pointer indicator
        img.classList.add('lightbox-target');

        // Click handler to open the lightbox
        img.addEventListener('click', () => {
            lightboxImg.src = img.src;
            lightboxImg.alt = img.alt || 'Zoomed image view';
            overlay.classList.add('active');
            overlay.setAttribute('aria-hidden', 'false');
            document.body.style.overflow = 'hidden'; // Prevent page scroll when open
        });
    });

    // 3. Helper function to close the lightbox
    const closeLightbox = () => {
        overlay.classList.remove('active');
        overlay.setAttribute('aria-hidden', 'true');
        document.body.style.overflow = ''; // Restore page scroll
        // Clear src after transitions to prevent visual flash on next open
        setTimeout(() => {
            if (!overlay.classList.contains('active')) {
                lightboxImg.src = '';
            }
        }, 300);
    };

    // Close on overlay background click
    overlay.addEventListener('click', (e) => {
        if (e.target === overlay || e.target === closeBtn) {
            closeLightbox();
        }
    });

    // Close on Escape key press
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && overlay.classList.contains('active')) {
            closeLightbox();
        }
    });
});
