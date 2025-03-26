// Gestion du loader
window.addEventListener('load', function() {
    const loader = document.getElementById('page-loader');
    setTimeout(() => {
        loader.style.opacity = '0';
        setTimeout(() => {
            loader.style.display = 'none';
        }, 500);
    }, 1000);
});

// Menu mobile
const hamburgerMenu = document.getElementById('hamburger-menu');
const menuList = document.getElementById('menu-list');

hamburgerMenu.addEventListener('click', function() {
    this.classList.toggle('active');
    menuList.classList.toggle('show');
    document.body.classList.toggle('no-scroll');
});

// Fermer le menu quand on clique sur un lien
document.querySelectorAll('#menu-list a').forEach(link => {
    link.addEventListener('click', () => {
        menuList.classList.remove('show');
        hamburgerMenu.classList.remove('active');
        document.body.classList.remove('no-scroll');
    });
});

// Gestion de la recherche
const searchInput = document.getElementById('search-input');
const searchButton = document.getElementById('search-button');
const searchResults = document.getElementById('search-results');

function performSearch() {
    const term = searchInput.value.trim().toLowerCase();
    if (term.length < 2) {
        searchResults.style.display = 'none';
        return;
    }

    // Simulation de résultats
    const products = document.querySelectorAll('.article, .product');
    let hasResults = false;
    
    searchResults.innerHTML = '';
    products.forEach(product => {
        const text = product.textContent.toLowerCase();
        if (text.includes(term)) {
            const clone = product.cloneNode(true);
            clone.classList.add('search-result-item');
            searchResults.appendChild(clone);
            hasResults = true;
        }
    });

    if (hasResults) {
        searchResults.style.display = 'block';
    } else {
        searchResults.innerHTML = '<div class="no-results">Aucun résultat trouvé</div>';
        searchResults.style.display = 'block';
    }
}

searchButton.addEventListener('click', performSearch);
searchInput.addEventListener('keyup', function(e) {
    if (e.key === 'Enter') performSearch();
});

// Fermer les résultats quand on clique ailleurs
document.addEventListener('click', function(e) {
    if (!searchInput.contains(e.target) && !searchResults.contains(e.target)) {
        searchResults.style.display = 'none';
    }
});

// Gestion du panier
let cartItems = 0;
const cartCount = document.querySelector('.cart-count');

document.querySelectorAll('.buy-btn').forEach(button => {
    button.addEventListener('click', function(e) {
        e.preventDefault();
        cartItems++;
        cartCount.textContent = cartItems;
        
        // Animation
        cartCount.classList.add('animate');
        setTimeout(() => {
            cartCount.classList.remove('animate');
        }, 300);
        
        // Message d'ajout
        const productName = this.closest('.article, .product, .featured-product').querySelector('h3, h4').textContent;
        showToast(`${productName} ajouté au panier`);
    });
});

// Fonction toast
function showToast(message) {
    const toast = document.createElement('div');
    toast.className = 'toast';
    toast.textContent = message;
    document.body.appendChild(toast);
    
    setTimeout(() => {
        toast.classList.add('show');
    }, 10);
    
    setTimeout(() => {
        toast.classList.remove('show');
        setTimeout(() => {
            toast.remove();
        }, 300);
    }, 3000);
}

// Scroll fluide
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        const targetId = this.getAttribute('href');
        const targetElement = document.querySelector(targetId);
        
        if (targetElement) {
            window.scrollTo({
                top: targetElement.offsetTop - 80,
                behavior: 'smooth'
            });
        }
    });
});

// Animation au scroll
const animatedElements = document.querySelectorAll('.about-section, section, .product, .article');

function checkScroll() {
    animatedElements.forEach(element => {
        const elementTop = element.getBoundingClientRect().top;
        const windowHeight = window.innerHeight;
        
        if (elementTop < windowHeight - 100) {
            element.classList.add('visible');
        }
    });
}

window.addEventListener('scroll', checkScroll);
checkScroll(); // Vérifier au chargement

// Bouton retour en haut
const scrollToTopBtn = document.querySelector('.scroll-to-top');

window.addEventListener('scroll', () => {
    if (window.scrollY > 300) {
        scrollToTopBtn.style.display = 'block';
    } else {
        scrollToTopBtn.style.display = 'none';
    }
});

scrollToTopBtn.addEventListener('click', () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

// Carrousel produits
const productsContainer = document.querySelector('.products-container');
const scrollLeftBtn = document.querySelector('.scroll-left');
const scrollRightBtn = document.querySelector('.scroll-right');

scrollLeftBtn.addEventListener('click', () => {
    productsContainer.scrollBy({
        left: -300,
        behavior: 'smooth'
    });
});

scrollRightBtn.addEventListener('click', () => {
    productsContainer.scrollBy({
        left: 300,
        behavior: 'smooth'
    });
});

// Gestion de la modal produit
const featuredProducts = document.querySelectorAll('.featured-product');
const productModal = document.getElementById('featured-product-modal');
const modalImage = document.getElementById('featured-modal-image');
const modalTitle = document.getElementById('featured-modal-title');
const modalPrice = document.getElementById('featured-modal-price');
const closeModal = document.querySelector('.featured-close');

featuredProducts.forEach(product => {
    product.addEventListener('click', function() {
        const name = this.getAttribute('data-name');
        const price = this.getAttribute('data-price');
        const image = this.getAttribute('data-image');
        
        modalImage.src = image;
        modalImage.alt = name;
        modalTitle.textContent = name;
        modalPrice.textContent = price;
        
        productModal.classList.add('active');
        document.body.classList.add('no-scroll');
    });
});

closeModal.addEventListener('click', () => {
    productModal.classList.remove('active');
    document.body.classList.remove('no-scroll');
});

// Fermer la modal en cliquant à l'extérieur
productModal.addEventListener('click', function(e) {
    if (e.target === this) {
        this.classList.remove('active');
        document.body.classList.remove('no-scroll');
    }
});

// Gestion du bouton "Voir tout"
const viewAllBtn = document.querySelector('.view-all');
const featuredContainer = document.querySelector('.featured-product-container');

if (viewAllBtn && featuredContainer) {
    viewAllBtn.addEventListener('click', function(e) {
        e.preventDefault();
        
        // Ajout de produits supplémentaires
        const additionalProducts = [
            { name: "T-SHIRT NOIR", price: "€30,00", image: "tshirt4.jpg" },
            { name: "T-SHIRT BLANC", price: "€25,00", image: "tshirt5.jpg" },
            { name: "T-SHIRT ROUGE", price: "€28,00", image: "tshirt6.jpg" }
        ];
        
        additionalProducts.forEach(product => {
            const productDiv = document.createElement('div');
            productDiv.className = 'featured-product';
            productDiv.setAttribute('data-name', product.name);
            productDiv.setAttribute('data-price', product.price);
            productDiv.setAttribute('data-image', product.image);
            
            productDiv.innerHTML = `
                <img src="${product.image}" alt="${product.name}" loading="lazy">
                <p class="featured-product-name">${product.name}</p>
                <p class="featured-product-price">${product.price}</p>
            `;
            
            featuredContainer.appendChild(productDiv);
        });
        
        // Mise à jour des événements
        document.querySelectorAll('.featured-product').forEach(product => {
            product.addEventListener('click', function() {
                const name = this.getAttribute('data-name');
                const price = this.getAttribute('data-price');
                const image = this.getAttribute('data-image');
                
                modalImage.src = image;
                modalImage.alt = name;
                modalTitle.textContent = name;
                modalPrice.textContent = price;
                
                productModal.classList.add('active');
                document.body.classList.add('no-scroll');
            });
        });
        
        this.style.display = 'none';
    });
}

// Lecture automatique de la vidéo
const canvaVideo = document.getElementById('canva-video');

function playVideoOnScroll() {
    const rect = canvaVideo.getBoundingClientRect();
    const isVisible = rect.top < window.innerHeight && rect.bottom >= 0;
    
    if (isVisible && canvaVideo.paused) {
        canvaVideo.play().catch(e => console.log("La lecture automatique a été bloquée:", e));
    }
}

window.addEventListener('scroll', playVideoOnScroll);
playVideoOnScroll(); // Vérifier au chargement

// Animation des statistiques
const stats = document.querySelectorAll('.stat');

function animateStats() {
    stats.forEach((stat, index) => {
        setTimeout(() => {
            stat.classList.add('animate');
        }, index * 200);
    });
}

// Observer pour les animations
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            if (entry.target.classList.contains('about-section')) {
                animateStats();
            }
            entry.target.classList.add('visible');
        }
    });
}, { threshold: 0.1 });

document.querySelectorAll('.about-section, section').forEach(section => {
    observer.observe(section);
});
