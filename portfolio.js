document.addEventListener('DOMContentLoaded', function() {
    // Filtrage des projets
    const filterButtons = document.querySelectorAll('.filter-btn');
    const galleryItems = document.querySelectorAll('.gallery-item');
    
    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            // Active le bouton
            filterButtons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');
            
            // Filtre les éléments
            const filter = button.getAttribute('data-filter');
            
            galleryItems.forEach(item => {
                if (filter === 'all' || item.getAttribute('data-category') === filter) {
                    item.style.display = 'block';
                } else {
                    item.style.display = 'none';
                }
            });
        });
    });
    
    // Lightbox
    const lightbox = document.querySelector('.lightbox');
    const lightboxImg = document.getElementById('lightbox-image');
    const lightboxVideo = document.getElementById('lightbox-video');
    const closeBtn = document.querySelector('.close-btn');
    const viewButtons = document.querySelectorAll('.view-btn');
    
    viewButtons.forEach(button => {
        button.addEventListener('click', () => {
            const src = button.getAttribute('data-src');
            const type = button.getAttribute('data-type');
            
            if (type === 'video') {
                lightboxVideo.style.display = 'block';
                lightboxImg.style.display = 'none';
                lightboxVideo.querySelector('source').src = src;
                lightboxVideo.load();
            } else {
                lightboxImg.style.display = 'block';
                lightboxVideo.style.display = 'none';
                lightboxImg.src = src;
            }
            
            lightbox.style.display = 'flex';
        });
    });
    
    closeBtn.addEventListener('click', () => {
        lightbox.style.display = 'none';
        lightboxVideo.pause();
    });
    
    lightbox.addEventListener('click', (e) => {
        if (e.target === lightbox) {
            lightbox.style.display = 'none';
            lightboxVideo.pause();
        }
    });
});
