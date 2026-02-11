document.addEventListener('DOMContentLoaded', function() {
    const cart = [];
    const cartCount = document.querySelector('.cart-count');
    const cartItemsContainer = document.querySelector('.cart-items');
    const subtotalElement = document.querySelector('.subtotal');
    const taxElement = document.querySelector('.tax');
    const totalElement = document.querySelector('.total');
    const checkoutBtn = document.getElementById('checkoutBtn');
    const orderConfirmation = document.getElementById('orderConfirmation');
    const whatsappBtn = document.getElementById('whatsappBtn');
    
    let selectedPayment = "Cash on Delivery";

    // 1. Add to Cart Logic
    document.querySelectorAll('.add-to-cart').forEach(button => {
        button.addEventListener('click', function() {
            const productCard = this.closest('.product-card');
            const productId = productCard.dataset.id;
            const productName = productCard.dataset.name;
            const productPrice = parseFloat(productCard.dataset.price);
            
            const existingItem = cart.find(item => item.id === productId);
            if (existingItem) {
                existingItem.quantity += 1;
            } else {
                cart.push({ id: productId, name: productName, price: productPrice, quantity: 1 });
            }
            updateCart();
            
            // UI Feedback
            this.innerHTML = '<i class="fas fa-check"></i> Added!';
            this.style.background = '#388e3c';
            setTimeout(() => {
                this.innerHTML = '<i class="fas fa-cart-plus"></i> Add to Cart';
                this.style.background = ''; 
            }, 1000);
        });
    });

    // 2. Update Cart Display & Totals
    function updateCart() {
        const totalCount = cart.reduce((sum, item) => sum + item.quantity, 0);
        cartCount.textContent = totalCount;
        cartItemsContainer.innerHTML = '';
        
        if (cart.length === 0) {
            cartItemsContainer.innerHTML = '<div class="empty-cart-message">Your cart is empty.</div>';
            subtotalElement.textContent = '₹0';
            taxElement.textContent = '₹0';
            totalElement.textContent = '₹0';
            return;
        }
        
        let subtotal = 0;
        cart.forEach(item => {
            subtotal += item.price * item.quantity;
            const itemEl = document.createElement('div');
            itemEl.className = 'cart-item';
            itemEl.innerHTML = `
                <div class="item-details">
                    <div class="item-name">${item.name} x ${item.quantity}</div>
                    <div class="item-price">₹${(item.price * item.quantity).toLocaleString()}</div>
                </div>
                <div class="quantity-controls">
                    <button class="quantity-btn" onclick="changeQty('${item.id}', -1)">-</button>
                    <button class="quantity-btn" onclick="changeQty('${item.id}', 1)">+</button>
                    <button class="remove-item" onclick="removeItem('${item.id}')"><i class="fas fa-trash"></i></button>
                </div>`;
            cartItemsContainer.appendChild(itemEl);
        });

        const tax = subtotal * 0.18;
        subtotalElement.textContent = `₹${subtotal.toLocaleString()}`;
        taxElement.textContent = `₹${tax.toLocaleString()}`;
        totalElement.textContent = `₹${(subtotal + tax).toLocaleString()}`;
    }

    // 3. Global Helpers for dynamic buttons
    window.changeQty = (id, delta) => {
        const item = cart.find(i => i.id === id);
        if (item) {
            item.quantity += delta;
            if (item.quantity <= 0) removeItem(id);
            else updateCart();
        }
    };

    window.removeItem = (id) => {
        const index = cart.findIndex(i => i.id === id);
        if (index > -1) cart.splice(index, 1);
        updateCart();
    };

    // 4. Payment Selection
    document.querySelectorAll('.payment-option').forEach(opt => {
        opt.addEventListener('click', function() {
            document.querySelectorAll('.payment-option').forEach(p => p.classList.remove('selected'));
            this.classList.add('selected');
            selectedPayment = this.innerText.trim();
        });
    });

    // 5. Checkout & WhatsApp Link Generation
    checkoutBtn.addEventListener('click', function() {
        const name = document.getElementById('name').value;
        const phone = document.getElementById('phone').value;
        if (!name || !phone || cart.length === 0) {
            alert("Please add items to cart and fill in your contact details.");
            return;
        }

        // Hide checkout, show success
        checkoutBtn.style.display = 'none';
        orderConfirmation.style.display = 'block';
        orderConfirmation.scrollIntoView({ behavior: 'smooth' });
    });

    whatsappBtn.addEventListener('click', function() {
        const name = document.getElementById('name').value;
        const address = document.getElementById('address').value;
        const total = totalElement.textContent;
        
        let message = `*NEW ORDER - JAINX STORE*%0A%0A`;
        message += `*Customer:* ${name}%0A`;
        message += `*Address:* ${address}%0A%0A`;
        message += `*Items:*%0A`;
        
        cart.forEach(item => {
            message += `- ${item.name} (x${item.quantity})%0A`;
        });
        
        message += `%0A*Total Amount:* ${total}%0A`;
        message += `*Payment:* ${selectedPayment}%0A%0A`;
        message += `Please confirm my order!`;

        // Replace '1234567890' with your real WhatsApp number
        window.open(`https://wa.me/1234567890?text=${message}`, '_blank');
    });
});