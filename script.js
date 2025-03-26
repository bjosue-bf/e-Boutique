// Gestion du chargement
document.addEventListener('DOMContentLoaded', function() {
    // Cache le loader après le chargement
    setTimeout(() => {
        document.getElementById('page-loader').style.opacity = '0';
        setTimeout(() => {
            document.getElementById('page-loader').style.display = 'none';
        }, 500);
    }, 1000);

    // Initialisation du panier
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    updateCartCount();

    // Menu mobile
    const hamburger = document.getElementById('hamburger-menu');
    const menu = document.getElementById('menu-list');

    hamburger.addEventListener('click', function() {
        this.classList.toggle('active');
        menu.classList.toggle('show');
        document.body.classList.toggle('no-scroll');
    });

    // Fermer le menu quand on clique sur un lien
    document.querySelectorAll('#menu-list a').forEach(link => {
        link.addEventListener('click', () => {
            menu.classList.remove('show');
            hamburger.classList.remove('active');
            document.body.classList.remove('no-scroll');
        });
    });

    // Gestion de la recherche
    const searchInput = document.getElementById('search-input');
    const searchButton = document.getElementById('search-button');
    const searchResults = document.getElementById('search-results');

    searchButton.addEventListener('click', performSearch);
    searchInput.addEventListener('keyup', function(e) {
        if (e.key === 'Enter') performSearch();
    });

    function performSearch() {
        const term = searchInput.value.trim().toLowerCase();
        if (term.length < 2) {
            searchResults.style.display = 'none';
            return;
        }

        // Recherche dans tous les produits
        const products = document.querySelectorAll('.product-card, .product, .canva-block');
        let hasResults = false;
        
        searchResults.innerHTML = '';
        products.forEach(product => {
            const name = product.querySelector('h3, h4').textContent.toLowerCase();
            const description = product.querySelector('p:not(.price)')?.textContent.toLowerCase() || '';
            
            if (name.includes(term) || description.includes(term)) {
                const clone = product.cloneNode(true);
                clone.classList.add('search-result-item');
                
                // Ajoute un événement de clic pour rediriger vers le produit
                clone.addEventListener('click', function() {
                    // Scroll vers le produit
                    product.scrollIntoView({ behavior: 'smooth' });
                    // Highlight le produit
                    product.style.boxShadow = '0 0 0 3px var(--accent)';
                    setTimeout(() => {
                        product.style.boxShadow = '';
                    }, 2000);
                    // Ferme les résultats
                    searchResults.style.display = 'none';
                });
                
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

    // Fermer les résultats quand on clique ailleurs
    document.addEventListener('click', function(e) {
        if (!searchInput.contains(e.target) && !searchResults.contains(e.target)) {
            searchResults.style.display = 'none';
        }
    });

    // Gestion du panier
    const cartIcon = document.getElementById('cart-icon');
    const cartModal = document.getElementById('cart-modal');
    const closeModal = document.querySelector('.close');
    const cartItemsContainer = document.getElementById('cart-items');
    const cartTotalPrice = document.getElementById('cart-total-price');
    const checkoutBtn = document.getElementById('checkout-btn');

    // Ouvrir/fermer le panier
    cartIcon.addEventListener('click', openCart);
    closeModal.addEventListener('click', closeCart);

    function openCart() {
        renderCart();
        cartModal.style.display = 'flex';
        document.body.classList.add('no-scroll');
    }

    function closeCart() {
        cartModal.style.display = 'none';
        document.body.classList.remove('no-scroll');
    }

    // Fermer la modal en cliquant à l'extérieur
    cartModal.addEventListener('click', function(e) {
        if (e.target === cartModal) {
            closeCart();
        }
    });

    // Ajouter au panier
    document.querySelectorAll('.buy-btn').forEach(button => {
        button.addEventListener('click', function() {
            const productElement = this.closest('.product-card, .product, .canva-block');
            const productId = productElement.dataset.id || 'prod-' + Math.random().toString(36).substr(2, 9);
            const productName = productElement.querySelector('h3, h4').textContent;
            const productPrice = parseFloat(this.dataset.price || productElement.querySelector('.price').textContent.match(/\d+/)[0]);
            const productImage = productElement.querySelector('img')?.src || '';

            addToCart({
                id: productId,
                name: productName,
                price: productPrice,
                image: productImage,
                quantity: 1
            });

            showToast(`${productName} ajouté au panier`);
        });
    });

    function addToCart(product) {
        const existingItem = cart.find(item => item.id === product.id);
        
        if (existingItem) {
            existingItem.quantity += 1;
        } else {
            cart.push(product);
        }
        
        saveCart();
        updateCartCount();
        
        if (cartModal.style.display === 'flex') {
            renderCart();
        }
    }

    function removeFromCart(productId) {
        cart = cart.filter(item => item.id !== productId);
        saveCart();
        updateCartCount();
        renderCart();
    }

    function updateQuantity(productId, newQuantity) {
        const item = cart.find(item => item.id === productId);
        if (item) {
            item.quantity = Math.max(1, newQuantity);
            saveCart();
            renderCart();
        }
    }

    function saveCart() {
        localStorage.setItem('cart', JSON.stringify(cart));
    }

    function updateCartCount() {
        const count = cart.reduce((total, item) => total + item.quantity, 0);
        document.querySelector('.cart-count').textContent = count;
    }

    function renderCart() {
        cartItemsContainer.innerHTML = '';
        
        if (cart.length === 0) {
            cartItemsContainer.innerHTML = '<p>Votre panier est vide</p>';
            cartTotalPrice.textContent = '0€';
            return;
        }
        
        let total = 0;
        
        cart.forEach(item => {
            const itemTotal = item.price * item.quantity;
            total += itemTotal;
            
            const cartItem = document.createElement('div');
            cartItem.className = 'cart-item';
            cartItem.innerHTML = `
                <div class="cart-item-info">
                    <div class="cart-item-name">${item.name}</div>
                    <div class="cart-item-price">${item.price}€</div>
                </div>
                <div class="cart-item-quantity">
                    <button class="quantity-btn minus">-</button>
                    <span class="quantity-value">${item.quantity}</span>
                    <button class="quantity-btn plus">+</button>
                </div>
                <div class="cart-item-total">${itemTotal.toFixed(2)}€</div>
                <div class="remove-item">&times;</div>
            `;
            
            cartItemsContainer.appendChild(cartItem);
            
            // Gestion des boutons de quantité
            const minusBtn = cartItem.querySelector('.minus');
            const plusBtn = cartItem.querySelector('.plus');
            const quantityValue = cartItem.querySelector('.quantity-value');
            const removeBtn = cartItem.querySelector('.remove-item');
            
            minusBtn.addEventListener('click', () => {
                const newQuantity = parseInt(quantityValue.textContent) - 1;
                if (newQuantity >= 1) {
                    updateQuantity(item.id, newQuantity);
                }
            });
            
            plusBtn.addEventListener('click', () => {
                const newQuantity = parseInt(quantityValue.textContent) + 1;
                updateQuantity(item.id, newQuantity);
            });
            
            removeBtn.addEventListener('click', () => {
                removeFromCart(item.id);
                showToast(`${item.name} retiré du panier`);
            });
        });
        
        cartTotalPrice.textContent = total.toFixed(2) + '€';
    }

    // Bouton de commande
    checkoutBtn.addEventListener('click', function() {
        if (cart.length === 0) {
            showToast('Votre panier est vide', 'error');
            return;
        }
        
        // Ici vous pourriez rediriger vers une page de paiement
        alert('Fonctionnalité de paiement à implémenter');
    });

    // Toast notifications
    function showToast(message, type = 'success') {
        const toast = document.createElement('div');
        toast.className = `toast ${type}`;
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

    // Carrousel produits
    const productsScroll = document.querySelector('.products-scroll');
    const scrollLeftBtn = document.querySelector('.scroll-left');
    const scrollRightBtn = document.querySelector('.scroll-right');

    if (productsScroll && scrollLeftBtn && scrollRightBtn) {
        scrollLeftBtn.addEventListener('click', () => {
            productsScroll.scrollBy({
                left: -300,
                behavior: 'smooth'
            });
        });

        scrollRightBtn.addEventListener('click', () => {
            productsScroll.scrollBy({
                left: 300,
                behavior: 'smooth'
            });
        });
    }

    // Animation au scroll
    const animatedElements = document.querySelectorAll('.product-section, .product-card, .product, .review-card');
    
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
});

// Helper pour formater les prix
function formatPrice(price) {
    return parseFloat(price).toFixed(2) + '€';
}
