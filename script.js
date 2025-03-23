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
        articlesSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
}

// Ajouter un écouteur d'événement au bouton de recherche
document.getElementById('search-button').addEventListener('click', searchSite);

// Ajouter un écouteur d'événement pour la touche "Entrée"
document.getElementById('search-input').addEventListener('keypress', function (e) {
    if (e.key === 'Enter') {
        searchSite();
    }
});

// Animation de défilement fluide (Smooth Scroll)
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();

        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth',
            block: 'start',
        });
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

window.addEventListener('scroll', () => {
    if (window.scrollY > 300) {
        scrollToTopBtn.style.display = 'block';
    } else {
        scrollToTopBtn.style.display = 'none';
    }
});

// Animation de survol pour les liens de navigation
const navLinks = document.querySelectorAll('nav ul li a');
navLinks.forEach(link => {
    link.addEventListener('mouseover', () => {
        link.style.color = '#e9c46a';
        link.style.transform = 'translateY(-3px)';
    });

    link.addEventListener('mouseout', () => {
        link.style.color = 'white';
        link.style.transform = 'translateY(0)';
    });
});

// Animation de survol pour les boutons d'achat
const buyButtons = document.querySelectorAll('.buy-btn');
buyButtons.forEach(button => {
    button.addEventListener('mouseover', () => {
        button.style.backgroundColor = '#e9c46a';
        button.style.transform = 'scale(1.1)';
    });

    button.addEventListener('mouseout', () => {
        button.style.backgroundColor = '#2a9d8f';
        button.style.transform = 'scale(1)';
    });
});
