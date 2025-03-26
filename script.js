// Loader
window.addEventListener('load', function() {
    const loader = document.querySelector('.loader');
    setTimeout(() => {
        loader.style.opacity = '0';
        setTimeout(() => {
            loader.style.display = 'none';
        }, 500);
    }, 1000);
});

// Menu Hamburger
const hamburgerMenu = document.getElementById('hamburger-menu');
const menuList = document.getElementById('menu-list');

if (hamburgerMenu && menuList) {
    hamburgerMenu.addEventListener('click', function() {
        this.classList.toggle('active');
        menuList.classList.toggle('active');
    });
}

// Fermer le menu au clic sur un lien
const navLinks = document.querySelectorAll('.nav-link');
navLinks.forEach(link => {
    link.addEventListener('click', function() {
        if (window.innerWidth <= 768) {
            hamburgerMenu.classList.remove('active');
            menuList.classList.remove('active');
        }
    });
});

// Fonction de recherche
function searchSite() {
    const searchTerm = document.getElementById('search-input').value.toLowerCase();
    const articles = document.querySelectorAll('.article');
    let found = false;

    articles.forEach(article => {
        const articleContent = article.textContent.toLowerCase();
        if (articleContent.includes(searchTerm)) {
            article.style.display = 'block';
            article.classList.add('animate__animated', 'animate__fadeIn');
            found = true;
        } else {
            article.style.display = 'none';
        }
    });

    if (!found) {
        alert("Aucun résultat trouvé pour : " + searchTerm);
    } else {
        document.getElementById('articles').scrollIntoView({ behavior: 'smooth' });
    }
}

document.getElementById('search-button').addEventListener('click', searchSite);
document.getElementById('search-input').addEventListener('keypress', function(e) {
    if (e.key === 'Enter') searchSite();
});

// Smooth Scroll pour les liens
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            window.scrollTo({
                top: target.offsetTop - 80,
                behavior: 'smooth'
            });
        }
    });
});

// Animation au scroll
function checkVisibility() {
    const elements = document.querySelectorAll('.canva-block, .article, .stat, .customer-img, .avis');
    const windowHeight = window.innerHeight;
    
    elements.forEach((element, index) => {
        const elementPosition = element.getBoundingClientRect().top;
        const elementVisible = 150;

        if (elementPosition < windowHeight - elementVisible) {
            setTimeout(() => {
                element.classList.add('visible');
            }, index * 100);
        }
    });
}

window.addEventListener('scroll', checkVisibility);
window.addEventListener('load', checkVisibility);

// Animation des produits
const productContainer = document.querySelector('.products-container');
const scrollLeftBtn = document.querySelector('.scroll-left');
const scrollRightBtn = document.querySelector('.scroll-right');

if (scrollLeftBtn && scrollRightBtn) {
    scrollLeftBtn.addEventListener('click', () => {
        productContainer.scrollBy({ left: -300, behavior: 'smooth' });
    });

    scrollRightBtn.addEventListener('click', () => {
        productContainer.scrollBy({ left: 300, behavior: 'smooth' });
    });
}

// Gestion de la vidéo Canva
const canvaVideo = document.getElementById('canva-video');
if (canvaVideo) {
    function playVideo() {
        const videoPosition = canvaVideo.getBoundingClientRect().top;
        const screenPosition = window.innerHeight / 1.5;

        if (videoPosition < screenPosition && videoPosition > -canvaVideo.offsetHeight) {
            canvaVideo.play().catch(error => console.log("La vidéo ne peut pas être lue :", error));
        }
    }

    window.addEventListener('scroll', playVideo);
    window.addEventListener('load', playVideo);
}

// Modal pour les produits
const featuredProducts = document.querySelectorAll('.featured-product');
const featuredModal = document.getElementById('featured-product-modal');
const modalImage = document.getElementById('featured-modal-image');
const modalTitle = document.getElementById('featured-modal-title');
const modalPrice = document.getElementById('featured-modal-price');
const closeModal = document.querySelector('.featured-close');

if (featuredProducts.length && featuredModal) {
    featuredProducts.forEach(product => {
        product.addEventListener('click', function() {
            const name = this.getAttribute('data-name');
            const price = this.getAttribute('data-price');
            const image = this.getAttribute('data-image');

            modalImage.src = image;
            modalTitle.textContent = name;
            modalPrice.textContent = price;

            featuredModal.classList.add('active');
        });
    });

    closeModal.addEventListener('click', function() {
        featuredModal.classList.remove('active');
    });

    window.addEventListener('click', function(e) {
        if (e.target === featuredModal) {
            featuredModal.classList.remove('active');
        }
    });
}

// Bouton "Voir tout" pour les produits
const viewAllBtn = document.querySelector('.view-all');
if (viewAllBtn) {
    viewAllBtn.addEventListener('click', function(e) {
        e.preventDefault();
        const products = [
            { name: "T-SHIRT NOIR", price: "€30,00", image: "tshirt4.jpg" },
            { name: "T-SHIRT BLANC", price: "€25,00", image: "tshirt5.jpg" }
        ];

        const container = document.querySelector('.featured-product-container');
        products.forEach(product => {
            const div = document.createElement('div');
            div.className = 'featured-product';
            div.setAttribute('data-name', product.name);
            div.setAttribute('data-price', product.price);
            div.setAttribute('data-image', product.image);
            div.innerHTML = `
                <img src="${product.image}" alt="${product.name}">
                <p class="featured-product-name">${product.name}</p>
                <p class="featured-product-price">${product.price}</p>
            `;
            container.appendChild(div);
        });

        this.style.display = 'none';
    });
}

// Bouton retour en haut
const scrollToTopBtn = document.createElement('button');
scrollToTopBtn.innerHTML = '↑';
scrollToTopBtn.className = 'scroll-to-top';
document.body.appendChild(scrollToTopBtn);

scrollToTopBtn.addEventListener('click', function() {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

window.addEventListener('scroll', function() {
    if (window.scrollY > 300) {
        scrollToTopBtn.style.opacity = '1';
        scrollToTopBtn.style.visibility = 'visible';
    } else {
        scrollToTopBtn.style.opacity = '0';
        scrollToTopBtn.style.visibility = 'hidden';
    }
});
