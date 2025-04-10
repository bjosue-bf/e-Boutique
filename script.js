// Loader
window.addEventListener('load', function() {
    const loader = document.querySelector('.loader');
    setTimeout(function() {
        loader.classList.add('hidden');
    }, 1000);
});

// Menu Hamburger
const hamburgerMenu = document.getElementById("hamburger-menu");
const menuList = document.getElementById("menu-list");

if (hamburgerMenu) {
    hamburgerMenu.addEventListener("click", () => {
        hamburgerMenu.classList.toggle("active");
        menuList.classList.toggle("show");
        document.body.style.overflow = menuList.classList.contains("show") ? "hidden" : "auto";
    });
}

// Fermer le menu lors du clic sur un lien
const navLinks = document.querySelectorAll('.nav-link');
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        menuList.classList.remove("show");
        hamburgerMenu.classList.remove("active");
        document.body.style.overflow = "auto";
    });
});

// Fonction de recherche
function searchSite() {
    const searchTerm = document.getElementById('search-input').value.trim().toLowerCase();
    const articles = document.querySelectorAll('.article');
    let found = false;

    if (!searchTerm) {
        articles.forEach(article => article.classList.remove('hidden'));
        return;
    }

    articles.forEach(article => {
        const articleContent = article.textContent.toLowerCase();
        if (articleContent.includes(searchTerm)) {
            article.classList.remove('hidden');
            found = true;
        } else {
            article.classList.add('hidden');
        }
    });

    if (!found) {
        alert("Aucun résultat trouvé pour : " + searchTerm);
    } else {
        const articlesSection = document.getElementById('articles');
        if (articlesSection) {
            articlesSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    }
}

// Écouteurs pour la recherche
const searchButton = document.getElementById('search-button');
if (searchButton) {
    searchButton.addEventListener('click', searchSite);
}

const searchInput = document.getElementById('search-input');
if (searchInput) {
    searchInput.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            searchSite();
        }
    });
}

// Smooth Scroll pour les liens
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        const targetId = this.getAttribute('href');
        const targetSection = document.querySelector(targetId);

        if (targetSection) {
            targetSection.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Animation des sections au scroll
window.addEventListener('scroll', function() {
    const sections = document.querySelectorAll('section');
    const windowHeight = window.innerHeight;

    sections.forEach(section => {
        const sectionTop = section.getBoundingClientRect().top;
        
        if (sectionTop < windowHeight - 150) {
            section.classList.add('visible');
        }
    });

    // Bouton retour en haut
    const scrollToTopBtn = document.querySelector('.scroll-to-top');
    if (scrollToTopBtn) {
        if (window.scrollY > 300) {
            scrollToTopBtn.style.display = 'block';
        } else {
            scrollToTopBtn.style.display = 'none';
        }
    }
});

// Effet de zoom sur les images
const articleImages = document.querySelectorAll('.article img');
articleImages.forEach(image => {
    image.addEventListener('mouseover', () => {
        image.style.transform = 'scale(1.05)';
        image.style.transition = 'transform 0.3s ease';
    });

    image.addEventListener('mouseout', () => {
        image.style.transform = 'scale(1)';
        image.style.transition = 'transform 0.3s ease';
    });
});

// Animation des cartes d'avis
const avisCards = document.querySelectorAll('.avis');
avisCards.forEach(card => {
    card.addEventListener('mouseover', () => {
        card.style.transform = 'scale(1.03)';
        card.style.transition = 'transform 0.3s ease-in-out';
    });

    card.addEventListener('mouseout', () => {
        card.style.transform = 'scale(1)';
        card.style.transition = 'transform 0.3s ease-in-out';
    });
});

// Bouton retour en haut
const scrollToTopBtn = document.createElement('button');
scrollToTopBtn.innerHTML = '<i class="fas fa-arrow-up"></i>';
scrollToTopBtn.classList.add('scroll-to-top');
document.body.appendChild(scrollToTopBtn);

scrollToTopBtn.addEventListener('click', () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

// Lecture vidéo au scroll
function playVideoOnScroll() {
    const video = document.getElementById('canva-video');
    const videoSection = document.querySelector('.canva-video');

    if (video && videoSection) {
        const rect = videoSection.getBoundingClientRect();
        const isVisible = rect.top <= window.innerHeight && rect.bottom >= 0;

        if (isVisible && video.paused) {
            video.play().catch((error) => {
                console.error("Erreur de lecture de la vidéo :", error);
            });
        } else if (!isVisible && !video.paused) {
            video.pause();
        }
    }
}

window.addEventListener('scroll', playVideoOnScroll);

/* ========== NOUVELLE IMPLÉMENTATION BARRE DE NAVIGATION ========== */
document.addEventListener("DOMContentLoaded", function() {
    const setupScrollbar = (containerSelector) => {
        const container = document.querySelector(containerSelector);
        if (!container) return;

        // Crée la barre de scroll
        const scrollTrack = document.createElement('div');
        scrollTrack.className = 'scroll-track';
        
        const scrollThumb = document.createElement('div');
        scrollThumb.className = 'scroll-thumb';
        
        scrollTrack.appendChild(scrollThumb);
        container.parentNode.insertBefore(scrollTrack, container.nextSibling);

        // Met à jour la position du thumb
        function updateThumb() {
            const scrollableWidth = container.scrollWidth - container.clientWidth;
            if (scrollableWidth <= 0) {
                scrollTrack.style.display = 'none';
                return;
            }
            
            scrollTrack.style.display = 'block';
            const thumbWidth = Math.max(
                60, 
                (container.clientWidth / container.scrollWidth) * scrollTrack.clientWidth
            );
            
            scrollThumb.style.width = `${thumbWidth}px`;
            const thumbPosition = (container.scrollLeft / scrollableWidth) * 
                                (scrollTrack.clientWidth - thumbWidth);
            scrollThumb.style.left = `${thumbPosition}px`;
        }

        // Gestion du drag
        let isDragging = false;
        let startX, startLeft;

        scrollThumb.addEventListener('mousedown', (e) => {
            isDragging = true;
            startX = e.clientX;
            startLeft = parseFloat(scrollThumb.style.left || 0);
            e.preventDefault();
        });

        scrollTrack.addEventListener('click', (e) => {
            const clickX = e.clientX - scrollTrack.getBoundingClientRect().left;
            const thumbWidth = parseFloat(scrollThumb.style.width);
            const newLeft = Math.min(
                Math.max(0, clickX - thumbWidth/2),
                scrollTrack.clientWidth - thumbWidth
            );
            
            const scrollableWidth = container.scrollWidth - container.clientWidth;
            container.scrollLeft = (newLeft / (scrollTrack.clientWidth - thumbWidth)) * scrollableWidth;
        });

        document.addEventListener('mousemove', (e) => {
            if (!isDragging) return;
            
            const dx = e.clientX - startX;
            const thumbWidth = parseFloat(scrollThumb.style.width);
            const newLeft = Math.min(
                Math.max(0, startLeft + dx),
                scrollTrack.clientWidth - thumbWidth
            );
            
            const scrollableWidth = container.scrollWidth - container.clientWidth;
            container.scrollLeft = (newLeft / (scrollTrack.clientWidth - thumbWidth)) * scrollableWidth;
        });

        document.addEventListener('mouseup', () => {
            isDragging = false;
        });

        // Écouteurs
        container.addEventListener('scroll', updateThumb);
        window.addEventListener('resize', updateThumb);
        updateThumb();
    };

    // Initialisation pour les conteneurs produits
    setupScrollbar(".products-container");
    setupScrollbar(".featured-product-container");
});
/* ========== FIN NOUVELLE IMPLÉMENTATION ========== */

// Animation section about
document.addEventListener("DOMContentLoaded", function() {
    const aboutSection = document.querySelector(".about-section");
    const stats = document.querySelectorAll(".stat");
    const images = document.querySelectorAll(".customer-img");
    let statsAnimated = false;

    function isVisible(element) {
        const rect = element.getBoundingClientRect();
        return rect.top < window.innerHeight / 1.3;
    }

    function handleScroll() {
        if (isVisible(aboutSection)) {
            aboutSection.classList.add("show");

            if (!statsAnimated) {
                animateStats();
                floatImages();
                statsAnimated = true;
            }
        }
    }

    function animateStats() {
        stats.forEach((stat, index) => {
            setTimeout(() => {
                stat.classList.add("bounce");
            }, index * 200);
        });
    }

    function floatImages() {
        images.forEach((img, index) => {
            setTimeout(() => {
                img.classList.add("float");
            }, index * 300);
        });
    }

    window.addEventListener("scroll", handleScroll);
    handleScroll();
});

// Modal produits
document.addEventListener("DOMContentLoaded", function() {
    const modal = document.getElementById("featured-product-modal");
    if (!modal) return;

    const modalImage = document.getElementById("featured-modal-image");
    const modalTitle = document.getElementById("featured-modal-title");
    const modalPrice = document.getElementById("featured-modal-price");
    const closeModal = document.querySelector(".featured-close");

    // Gestion de l'ouverture de la modal
    document.addEventListener("click", function(e) {
        const productCard = e.target.closest(".featured-product");
        if (productCard) {
            const name = productCard.getAttribute("data-name");
            const price = productCard.getAttribute("data-price");
            const image = productCard.getAttribute("data-image");

            modalImage.src = image;
            modalTitle.textContent = name;
            modalPrice.textContent = price;

            modal.style.display = "flex";
            document.body.style.overflow = "hidden";
        }
    });

    // Fermeture de la modal
    function closeModalFunc() {
        modal.style.display = "none";
        document.body.style.overflow = "auto";
    }

    if (closeModal) {
        closeModal.addEventListener("click", closeModalFunc);
    }

    window.addEventListener("click", function(e) {
        if (e.target === modal) {
            closeModalFunc();
        }
    });

    window.addEventListener("keydown", function(e) {
        if (e.key === "Escape" && modal.style.display === "flex") {
            closeModalFunc();
        }
    });
});

// View All Products
document.addEventListener("DOMContentLoaded", function() {
    const viewAllBtn = document.querySelector(".view-all");
    const productContainer = document.querySelector(".featured-product-container");

    if (viewAllBtn && productContainer) {
        viewAllBtn.addEventListener("click", function(e) {
            e.preventDefault();
            
            // Animation de chargement
            const originalText = viewAllBtn.textContent;
            viewAllBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Chargement...';
            
            // Simulation de chargement asynchrone
            setTimeout(() => {
                const moreProducts = [
                    { name: "T-SHIRT NOIR", price: "€30,00", image: "tshirt4.jpg" },
                    { name: "T-SHIRT BLANC", price: "€25,00", image: "tshirt5.jpg" },
                    { name: "T-SHIRT ROUGE", price: "€28,00", image: "tshirt6.jpg" },
                    { name: "T-SHIRT BLEU", price: "€27,00", image: "tshirt7.jpg" }
                ];

                moreProducts.forEach(product => {
                    const productDiv = document.createElement("div");
                    productDiv.classList.add("featured-product");
                    productDiv.setAttribute("data-name", product.name);
                    productDiv.setAttribute("data-price", product.price);
                    productDiv.setAttribute("data-image", product.image);
                    
                    productDiv.innerHTML = `
                        <img src="${product.image}" alt="${product.name}" loading="lazy">
                        <p class="featured-product-name">${product.name}</p>
                        <p class="featured-product-price">${product.price}</p>
                    `;

                    productContainer.appendChild(productDiv);
                });

                viewAllBtn.style.display = "none";
            }, 800);
        });
    }
});

// Form submission
document.addEventListener("DOMContentLoaded", function() {
    const contactForm = document.getElementById("contactForm");
    if (contactForm) {
        contactForm.addEventListener("submit", function(e) {
            e.preventDefault();
            alert("Merci pour votre message ! Nous vous contacterons bientôt.");
            this.reset();
        });
    }

    const newsletterForm = document.getElementById("newsletterForm");
    if (newsletterForm) {
        newsletterForm.addEventListener("submit", function(e) {
            e.preventDefault();
            alert("Merci pour votre inscription à notre newsletter !");
            this.reset();
        });
    }
});
