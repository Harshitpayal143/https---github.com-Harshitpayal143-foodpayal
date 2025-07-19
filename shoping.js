// This file can be used for additional cart-related functionality
// Currently all cart functionality is in script.js

// Example additional function that could be added:
function applyDiscount(code) {
    const discountCodes = {
        'DITTLES10': 10,
        'PAPAD20': 20
    };
    
    if (discountCodes[code]) {
        const discount = discountCodes[code];
        // Apply discount logic
        return discount;
    }
    return 0;
}

// You could also add checkout functionality here
function proceedToCheckout() {
    // Validate cart
    if (cart.length === 0) {
        showNotification('Your cart is empty');
        return;
    }
    
    // In a real application, this would redirect to a checkout page
    // or show a checkout form
    showNotification('Proceeding to checkout...');
    
    // For demo purposes, we'll just clear the cart
    setTimeout(() => {
        cart = [];
        localStorage.setItem('cart', JSON.stringify(cart));
        updateCartCount();
        renderCartItems();
        showNotification('Order placed successfully!');
    }, 2000);
}

// Add event listener for checkout button
document.addEventListener('DOMContentLoaded', () => {
    const checkoutBtn = document.querySelector('.checkout-btn');
    if (checkoutBtn) {
        checkoutBtn.addEventListener('click', proceedToCheckout);
    }
});
// Product Data
const products = {
    papads: [
        { id: 1, name: "Potato Papad", price: 130, image: "images/papad-potato.jpg", description: "Delicious potato papad with authentic taste" },
        { id: 2, name: "Sabudana Papad", price: 150, image: "images/papad-sabudana.jpg", description: "Fasting special sabudana papad" },
        { id: 3, name: "Masala Papad", price: 140, image: "images/papad-masala.jpg", description: "Spicy masala flavored papad" },
        { id: 4, name: "Garlic Papad", price: 135, image: "images/papad-garlic.jpg", description: "Garlic infused papad for strong flavor" },
        { id: 5, name: "Moong Dal Papad", price: 125, image: "images/papad-moong.jpg", description: "Protein rich moong dal papad" },
        { id: 6, name: "Urad Dal Papad", price: 130, image: "images/papad-urad.jpg", description: "Classic urad dal papad" },
        { id: 7, name: "Jeera Papad", price: 140, image: "images/papad-jeera.jpg", description: "Cumin flavored crispy papad" },
        { id: 8, name: "Nachni Papad", price: 160, image: "images/papad-nachni.jpg", description: "Healthy ragi/nachni papad" },
        { id:9, name: "Kali Mirch Papad", price: 145, image: "images/papad-kalimirch.jpg", description: "Black pepper flavored papad" },
        { id:10 , name: "Hing Papad", price: 135, image: "images/papad-hing.jpg", description: "Asafoetida flavored digestive papad" },
        { id: 11, name: "Shakuli Papad", price: 155, image: "images/papad-shakuli.jpg", description: "Special shakuli shaped papad" }
    ],
    pickles: [
        { id: 12, name: "Mango Pickle", price: 180, image: "images/pickle-mango.jpg", description: "Traditional spicy mango pickle" },
        { id: 13, name: "Lemon Pickle", price: 170, image: "images/pickle-lemon.jpg", description: "Tangy lemon pickle" },
        { id: 14, name: "Green Chilli Pickle", price: 160, image: "images/pickle-greenchilli.jpg", description: "Spicy green chilli pickle" },
        { id: 15, name: "Mixed Pickle", price: 190, image: "images/pickle-mixed.jpg", description: "Assorted vegetable mixed pickle" },
        { id: 16, name: "Carrot Pickle", price: 165, image: "images/pickle-carrot.jpg", description: "Sweet and spicy carrot pickle" },
        { id: 17, name: "Radish Pickle", price: 160, image: "images/pickle-radish.jpg", description: "Crunchy radish pickle" },
        { id: 18, name: "Amla (Awl) Pickle", price: 175, image: "images/pickle-amla.jpg", description: "Healthy amla pickle" },
        { id: 19, name: "Bur Pickle", price: 185, image: "images/pickle-bur.jpg", description: "Traditional bur pickle" }
    ]
};

// DOM Elements
const papadGrid = document.getElementById('papad-grid');
const pickleGrid = document.getElementById('pickle-grid');
const cartIcon = document.querySelector('.cart-icon');
const cartModal = document.getElementById('cart-modal');
const closeCart = document.querySelector('.close-cart');
const cartItemsContainer = document.getElementById('cart-items');
const cartTotal = document.getElementById('cart-total');
const cartCount = document.querySelector('.cart-count');

// Initialize cart
let cart = JSON.parse(localStorage.getItem('cart'))  [0];

// Display products
function displayProducts() {
    // Display papads
    products.papads.forEach(product => {
        const productCard = createProductCard(product);
        papadGrid.appendChild(productCard);
    });

    // Display pickles
    products.pickles.forEach(product => {
        const productCard = createProductCard(product);
        pickleGrid.appendChild(productCard);
    });
}

// Create product card HTML
function createProductCard(product) {
    const card = document.createElement('div');
    card.className = 'product-card';
    card.innerHTML = `
        <div class="product-image">
            <img src="${product.image}" alt="${product.name}">
        </div>
        <div class="product-info">
            <h3>${product.name}</h3>
            <p>${product.description}</p>
            <div class="product-price">
                <span class="price">₹${product.price}</span>
                <button class="add-to-cart" data-id="${product.id}">Add to Cart</button>
            </div>
        </div>
    `;
    return card;
}

// Event Listeners
document.addEventListener('DOMContentLoaded', () => {
    displayProducts();
    updateCartCount();
    
    // Add to cart buttons
    document.addEventListener('click', function(e) {
        if (e.target.classList.contains('add-to-cart')) {
            const productId = parseInt(e.target.getAttribute('data-id'));
            addToCart(productId);
        }
    });
    
    // Cart icon click
    cartIcon.addEventListener('click', openCart);
    
    // Close cart
    closeCart.addEventListener('click', closeCartModal);
    
    // Close modal when clicking outside
    window.addEventListener('click', (e) => {
        if (e.target === cartModal) {
            closeCartModal();
        }
    });
});

// Open cart modal
function openCart() {
    cartModal.style.display = 'block';
    renderCartItems();
}

// Close cart modal
function closeCartModal() {
    cartModal.style.display = 'none';
}

// Add to cart function
function addToCart(productId) {
    // Find product in either papads or pickles
    let product = products.papads.find(p => p.id === productId)  
                 products.pickles.find(p => p.id === productId);
    
    if (!product) return;
    
    // Check if product already in cart
    const existingItem = cart.find(item => item.id === productId);
    
    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        cart.push({
            ...product,
            quantity: 1
        });
    }
    
    // Update localStorage
    localStorage.setItem('cart', JSON.stringify(cart));
    
    // Update UI
    updateCartCount();
    
    // Show added notification
    showNotification(`${product.name} added to cart!`);
}

// Update cart count
function updateCartCount() {
    const count = cart.reduce((total, item) => total + item.quantity, 0);
    cartCount.textContent = count;
}

// Render cart items
function renderCartItems() {
    if (cart.length === 0) {
        cartItemsContainer.innerHTML = '<p>Your cart is empty</p>';
        cartTotal.textContent = '₹0';
        return;
    }
    
    let total = 0;
    cartItemsContainer.innerHTML = '';
    
    cart.forEach(item => {
        const itemTotal = item.price * item.quantity;
        total += itemTotal;
        
        const cartItem = document.createElement('div');
        cartItem.className = 'cart-item';
        cartItem.innerHTML = `
            <div class="cart-item-info">
                <div class="cart-item-image">
                    <img src="${item.image}" alt="${item.name}">
                </div>
                <div class="cart-item-details">
                    <h4>${item.name}</h4>
                    <p class="cart-item-price">₹${item.price}</p>
                </div>
            </div>
            <div class="cart-item-actions">
                <div class="cart-item-quantity">
                    <button class="quantity-btn minus" data-id="${item.id}">-</button>
                    <span class="quantity">${item.quantity}</span>
                    <button class="quantity-btn plus" data-id="${item.id}">+</button>
                </div>
                <div class="remove-item" data-id="${item.id}">
                    <i class="fas fa-trash"></i>
                </div>
            </div>
        `;
        cartItemsContainer.appendChild(cartItem);
    });
    
    cartTotal.textContent = `₹${total}`;
    
    // Add event listeners for quantity buttons and remove
    document.querySelectorAll('.minus').forEach(btn => {
        btn.addEventListener('click', function() {
            updateQuantity(parseInt(this.getAttribute('data-id')), -1);
        });
    });
    
    document.querySelectorAll('.plus').forEach(btn => {
        btn.addEventListener('click', function() {
            updateQuantity(parseInt(this.getAttribute('data-id')), 1);
        });
    });
    
    document.querySelectorAll('.remove-item').forEach(btn => {
        btn.addEventListener('click', function() {
            removeItem(parseInt(this.getAttribute('data-id')));
        });
    });
}

// Update item quantity
function updateQuantity(productId, change) {
    const itemIndex = cart.findIndex(item => item.id === productId);
    
    if (itemIndex !== -1) {
        cart[itemIndex].quantity += change;
        
        // Remove if quantity is 0 or less
        if (cart[itemIndex].quantity <= 0) {
            cart.splice(itemIndex, 1);
        }
        
        // Update localStorage and UI
        localStorage.setItem('cart', JSON.stringify(cart));
        updateCartCount();
        renderCartItems();
    }
}

// Remove item from cart
function removeItem(productId) {
    cart = cart.filter(item => item.id !== productId);
    
    // Update localStorage and UI
    localStorage.setItem('cart', JSON.stringify(cart));
    updateCartCount();
    renderCartItems();
    
    // Show notification
    showNotification('Item removed from cart');
}

// Show notification
function showNotification(message) {
    const notification = document.createElement('div');
    notification.className = 'notification';
    notification.textContent = message;
    document.body.appendChild(notification);
    
    // Add show class
    setTimeout(() => {
        notification.classList.add('show');
    }, 10);
    
    // Remove after 3 seconds
    setTimeout(() => {
        notification.classList.remove('show');
        setTimeout(() => {
            document.body.removeChild(notification);
        }, 300);
    }, 3000);
}
// Add notification styles dynamically
const notificationStyles = document.createElement('style');
notificationStyles.textContent = `
    .notification {
        position: fixed;
        bottom: 20px;
        left: 50%;
        transform: translateX(-50%);
        background: var(--success-color);
        color: white;
        padding: 1rem 2rem;
        border-radius: 5px;
        box-shadow: 0 3px 10px rgba(0, 0, 0, 0.2);
        opacity: 0;
        transition: opacity 0.3s ease;
        z-index: 3000;
    }
    
    .notification.show {
        opacity: 1;
    }
`;
document.head.appendChild(notificationStyles);