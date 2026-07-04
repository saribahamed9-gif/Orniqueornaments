// ===============================
// ORNIQUE SHOPPING CART
// ===============================

let cart = [];

const cartItems = document.getElementById("cart-items");
const cartTotal = document.getElementById("cart-total");
const cartCount = document.getElementById("cart-count");

const checkoutForm = document.getElementById("checkout-form");

document.querySelectorAll(".add-cart").forEach(button => {

    button.addEventListener("click", () => {

        const name = button.dataset.name;
        const price = Number(button.dataset.price);

        const existing = cart.find(item => item.name === name);

        if (existing) {

            existing.quantity++;

        } else {

            cart.push({
                name: name,
                price: price,
                quantity: 1
            });

        }

        updateCart();

    });

});

function updateCart() {

    cartItems.innerHTML = "";

    let total = 0;
    let count = 0;

    if (cart.length === 0) {

        cartItems.innerHTML = "<p>Your cart is empty.</p>";

    }

    cart.forEach(item => {

        total += item.price * item.quantity;

        count += item.quantity;

        const div = document.createElement("div");

        div.className = "cart-item";

        div.innerHTML = `
        <div>
            <h4>${item.name}</h4>
            <p>৳${item.price}</p>
        </div>

        <div>

            <button class="minus">-</button>

            <span>${item.quantity}</span>

            <button class="plus">+</button>

            <button class="remove">Remove</button>

        </div>
        `;

        cartItems.appendChild(div);

    });

    cartTotal.innerText = "৳" + total;

    cartCount.innerText = count;

              }
// ===============================
// PART 2
// ===============================

// Handle +, -, Remove
cartItems.addEventListener("click", (e) => {

    const cartItem = e.target.closest(".cart-item");

    if (!cartItem) return;

    const name = cartItem.querySelector("h4").textContent;

    const item = cart.find(product => product.name === name);

    if (!item) return;

    if (e.target.classList.contains("plus")) {

        item.quantity++;

    }

    if (e.target.classList.contains("minus")) {

        item.quantity--;

        if (item.quantity <= 0) {

            cart = cart.filter(product => product.name !== name);

        }

    }

    if (e.target.classList.contains("remove")) {

        cart = cart.filter(product => product.name !== name);

    }

    updateCart();

});

// Clear Cart
document.getElementById("clear-cart").addEventListener("click", () => {

    cart = [];

    updateCart();

});

// Save Cart
function saveCart() {

    localStorage.setItem("ornique-cart", JSON.stringify(cart));

}

// Load Cart
function loadCart() {

    const saved = localStorage.getItem("ornique-cart");

    if (saved) {

        cart = JSON.parse(saved);

        updateCart();

    }

}

const originalUpdate = updateCart;

updateCart = function () {

    originalUpdate();

    saveCart();

};

loadCart();
// ===============================
// PART 3 - WHATSAPP CHECKOUT
// ===============================

checkoutForm.addEventListener("submit", function (e) {

    e.preventDefault();

    if (cart.length === 0) {
        alert("Your cart is empty.");
        return;
    }

    const name = document.getElementById("customer-name").value.trim();
    const phone = document.getElementById("customer-phone").value.trim();
    const address = document.getElementById("customer-address").value.trim();

    let total = 0;

    let message = "🛍️ *NEW ORDER - ORNIQUE*%0A%0A";

    message += "👤 Name: " + name +
    // ===============================
// PART 4 - FINAL FEATURES
// ===============================

// Success notification
function showNotification(message) {

    const notification = document.createElement("div");

    notification.textContent = message;

    notification.style.position = "fixed";
    notification.style.bottom = "20px";
    notification.style.right = "20px";
    notification.style.background = "#25D366";
    notification.style.color = "#ffffff";
    notification.style.padding = "12px 20px";
    notification.style.borderRadius = "8px";
    notification.style.boxShadow = "0 5px 15px rgba(0,0,0,0.2)";
    notification.style.zIndex = "9999";

    document.body.appendChild(notification);

   
