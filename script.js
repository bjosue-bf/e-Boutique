// Récupère les éléments HTML
const hamburgerMenu = document.getElementById("hamburger-menu");
const menuList = document.getElementById("menu-list");

// Ajoute un événement au bouton hamburger
if (hamburgerMenu) {
    hamburgerMenu.addEventListener("click", () => {
        menuList.classList.toggle("show"); // Ajoute ou retire la classe 'show'
    });
}

// Fermer le menu lors du clic sur un lien
const navLinks = document.querySelectorAll('.nav-link');
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        menuList.classList.remove('show');
    });
});

// Fonction de recherche
function searchSite() {
    const searchTerm = document.getElementById('search-input').value.toLowerCase();
    const articles = document.querySelectorAll('.article'); // Cibler uniquement les articles
    let found = false;

    // On parcourt chaque article pour vérifier s'il contient le terme de recherche
    articles.forEach(article => {
        const articleContent = article.textContent.toLowerCase();
        if (articleContent.includes(searchTerm)) {
            article.classList.remove('hidden'); // Afficher l'article
            found = true;
        } else {
            article.classList.add('hidden'); // Masquer l'article
        }
    });

    // Si aucun résultat n'est trouvé, on affiche un message
    if (!found) {
        alert("Aucun résultat trouvé pour : " + searchTerm);
    } else {
        // Défilement fluide vers la section des articles
        const articlesSection = document.getElementById('articles');
        if (articlesSection) {
            articlesSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    }
}

// Ajouter un écouteur d'événement au bouton de recherche
const searchButton = document.getElementById('search-button');
if (searchButton) {
    searchButton.addEventListener('click', searchSite);
}

// Ajouter un écouteur d'événement pour la touche "Entrée"
const searchInput = document.getElementById('search-input');
if (searchInput) {
    searchInput.addEventListener('keypress', function (e) {
        if (e.key === 'Enter') {
            searchSite();
        }
    });
}

// Animation de défilement fluide (Smooth Scroll) pour les liens du menu
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault(); // Empêcher le comportement par défaut du lien

        // Récupérer la cible du lien (l'ID de la section)
        const targetId = this.getAttribute('href');
        const targetSection = document.querySelector(targetId);

        // Défilement fluide vers la section cible
        if (targetSection) {
            targetSection.scrollIntoView({
                behavior: 'smooth', // Effet de défilement fluide
                block: 'start',     // Aligner le haut de la section avec le haut de la fenêtre
            });
        }
    });
});

// Animation d'apparition des sections lors du défilement (Parallax et fade-in)
window.addEventListener('scroll', function () {
    const sections = document.querySelectorAll('section');
    const windowHeight = window.innerHeight;

    sections.forEach(section => {
        const sectionTop = section.getBoundingClientRect().top;
        
        if (sectionTop < windowHeight - 150) {
            section.classList.add('visible');
        }
    });

    // Gestion du bouton retour en haut
    const scrollToTopBtn = document.querySelector('.scroll-to-top');
    if (scrollToTopBtn) {
        if (window.scrollY > 300) {
            scrollToTopBtn.style.display = 'block';
        } else {
            scrollToTopBtn.style.display = 'none';
        }
    }
});

// Effet de zoom sur les images des articles au survol
const articleImages = document.querySelectorAll('.article img');
articleImages.forEach(image => {
    image.addEventListener('mouseover', () => {
        image.style.transform = 'scale(1.1)';
        image.style.transition = 'transform 0.3s ease';
    });

    image.addEventListener('mouseout', () => {
        image.style.transform = 'scale(1)';
        image.style.transition = 'transform 0.3s ease';
    });
});

// Animation de survol des cartes d'avis clients
const avisCards = document.querySelectorAll('.avis');
avisCards.forEach(card => {
    card.addEventListener('mouseover', () => {
        card.style.transform = 'scale(1.05)';
        card.style.transition = 'transform 0.3s ease-in-out';
    });

    card.addEventListener('mouseout', () => {
        card.style.transform = 'scale(1)';
        card.style.transition = 'transform 0.3s ease-in-out';
    });
});

// Effet "Retour en haut" (scroll-to-top) lorsqu'on fait défiler vers le bas
const scrollToTopBtn = document.createElement('button');
scrollToTopBtn.innerText = '↑';
scrollToTopBtn.classList.add('scroll-to-top');
document.body.appendChild(scrollToTopBtn);

scrollToTopBtn.addEventListener('click', () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth',
    });
});

// Fonction pour démarrer la vidéo lorsque l'utilisateur arrive sur la section
function playVideoOnScroll() {
    const video = document.getElementById('canva-video'); // Sélectionner l'élément vidéo
    const videoSection = document.querySelector('.canva-video'); // Section contenant la vidéo

    // Vérifier si la vidéo est visible dans la fenêtre
    const rect = videoSection.getBoundingClientRect();
    const isVisible = rect.top >= 0 && rect.top <= window.innerHeight;

    // Si la section vidéo est visible et que la vidéo est en pause, démarrer la lecture
    if (isVisible && video.paused) {
        video.play().catch((error) => {
            console.error("Erreur de lecture de la vidéo :", error);
        });
    }
}

// Ajouter un écouteur d'événements pour le scroll
window.addEventListener('scroll', playVideoOnScroll);

// Code supplémentaire pour garantir le bon fonctionnement du menu hamburger et du bouton retour en haut
window.addEventListener('load', () => {
    // Vérification pour s'assurer que le bouton de retour en haut est bien visible
    const scrollToTopBtn = document.querySelector('.scroll-to-top');
    if (scrollToTopBtn) {
        if (window.scrollY > 300) {
            scrollToTopBtn.style.display = 'block';
        }
    }

    // S'assurer que le menu hamburger fonctionne bien
    const hamburgerMenu = document.getElementById("hamburger-menu");
    const menuList = document.getElementById("menu-list");
    if (hamburgerMenu && menuList) {
        hamburgerMenu.addEventListener("click", () => {
            menuList.classList.toggle("show");
        });
    }
});


document.addEventListener("DOMContentLoaded", function () {
    document.querySelectorAll('.catalogue').forEach(catalogue => {
        catalogue.addEventListener('click', function () {
            toggleProducts(catalogue.id);
        });
    });

    // Ajout des événements pour les boutons de scroll
    document.querySelectorAll('.catalogue-products').forEach(container => {
        let leftBtn = document.createElement("button");
        leftBtn.innerHTML = "&#10094;";
        leftBtn.classList.add("scroll-btn", "scroll-left");
        container.parentElement.appendChild(leftBtn);

        let rightBtn = document.createElement("button");
        rightBtn.innerHTML = "&#10095;";
        rightBtn.classList.add("scroll-btn", "scroll-right");
        container.parentElement.appendChild(rightBtn);

        leftBtn.addEventListener("click", () => {
            container.scrollBy({ left: -200, behavior: "smooth" });
        });

        rightBtn.addEventListener("click", () => {
            container.scrollBy({ left: 200, behavior: "smooth" });
        });
    });
});

document.addEventListener("DOMContentLoaded", function () {
    const container = document.querySelector(".products-container");
    const leftBtn = document.querySelector(".scroll-left");
    const rightBtn = document.querySelector(".scroll-right");

    leftBtn.addEventListener("click", () => {
        container.scrollBy({ left: -300, behavior: "smooth" });
    });

    rightBtn.addEventListener("click", () => {
        container.scrollBy({ left: 300, behavior: "smooth" });
    });
});


document.addEventListener("DOMContentLoaded", function () {
    const aboutSection = document.querySelector(".about-section");
    const stats = document.querySelectorAll(".stat");
    const images = document.querySelectorAll(".customer-img");
    let statsAnimated = false; // Évite la répétition des animations

    // Vérifie si la section est visible dans la fenêtre
    function isVisible(element) {
        const rect = element.getBoundingClientRect();
        return rect.top < window.innerHeight / 1.3;
    }

    // Active l'affichage de la section
    function handleScroll() {
        if (isVisible(aboutSection)) {
            aboutSection.classList.add("show");

            if (!statsAnimated) {
                animateStats();
                floatImages();
                statsAnimated = true; // Empêche la répétition des animations
            }
        }
    }

    // Animation des statistiques avec effet de rebond
    function animateStats() {
        stats.forEach((stat, index) => {
            setTimeout(() => {
                stat.classList.add("bounce");
            }, index * 200); // Décalage progressif des animations
        });
    }

    // Animation des images avec effet de flottement
    function floatImages() {
        images.forEach((img, index) => {
            setTimeout(() => {
                img.classList.add("float");
            }, index * 300);
        });
    }

    // Écouteur d'événements pour le défilement
    window.addEventListener("scroll", handleScroll);

    // Vérifie au chargement si la section est déjà visible
    handleScroll();
});



document.addEventListener("DOMContentLoaded", function () {
    const products = document.querySelectorAll(".featured-product");
    const modal = document.getElementById("featured-product-modal");
    const modalImage = document.getElementById("featured-modal-image");
    const modalTitle = document.getElementById("featured-modal-title");
    const modalPrice = document.getElementById("featured-modal-price");
    const closeModal = document.querySelector(".featured-close");

    // Ouvrir la modal au clic sur un produit
    products.forEach(product => {
        product.addEventListener("click", function () {
            const name = this.getAttribute("data-name");
            const price = this.getAttribute("data-price");
            const image = this.getAttribute("data-image");

            modalImage.src = image;
            modalTitle.textContent = name;
            modalPrice.textContent = price;

            modal.style.display = "flex";
        });
    });

    // Fermer la modal
    closeModal.addEventListener("click", function () {
        modal.style.display = "none";
    });

    window.addEventListener("click", function (e) {
        if (e.target === modal) {
            modal.style.display = "none";
        }
    });

    // Slider Produits
    const prevBtn = document.querySelector(".featured-prev");
    const nextBtn = document.querySelector(".featured-next");
    const productContainer = document.querySelector(".featured-product-container");

    let scrollAmount = 0;
    const scrollStep = 200; 

    prevBtn.addEventListener("click", function () {
        productContainer.scrollLeft -= scrollStep;
    });

    nextBtn.addEventListener("click", function () {
        productContainer.scrollLeft += scrollStep;
    });
});


document.addEventListener("DOMContentLoaded", function () {
    const viewAllBtn = document.querySelector(".view-all");
    const productContainer = document.querySelector(".featured-product-container");

    // Liste des nouveaux produits (ajoute tes propres produits ici)
    const moreProducts = [
        { name: "T-SHIRT NOIR", price: "€30,00", image: "tshirt4.jpg" },
        { name: "T-SHIRT BLANC", price: "€25,00", image: "tshirt5.jpg" }
    ];

    viewAllBtn.addEventListener("click", function (e) {
        e.preventDefault(); // Empêche la redirection

        moreProducts.forEach(product => {
            const productDiv = document.createElement("div");
            productDiv.classList.add("featured-product");
            productDiv.setAttribute("data-name", product.name);
            productDiv.setAttribute("data-price", product.price);
            productDiv.setAttribute("data-image", product.image);
            
            productDiv.innerHTML = `
                <img src="${product.image}" alt="${product.name}">
                <p class="featured-product-name">${product.name}</p>
                <p class="featured-product-price">${product.price}</p>
            `;

            productContainer.appendChild(productDiv);
        });

        viewAllBtn.style.display = "none"; // Cache le bouton après affichage
    });
});
