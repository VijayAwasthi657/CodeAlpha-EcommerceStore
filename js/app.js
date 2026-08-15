const API_URL = "http://localhost:5000/api";

// ===============================
// LOAD PRODUCTS
// ===============================

// ===============================
// LOAD PRODUCTS
// ===============================

async function loadProducts() {

    const container = document.getElementById("productsContainer");

    if (!container) {
        return;
    }

    try {

        const response = await fetch(`${API_URL}/products`);

        const data = await response.json();

        console.log("Products:", data);

        if (!data.success) {

            container.innerHTML = `
                <p>Unable to load products.</p>
            `;

            return;
        }

        if (!data.products || data.products.length === 0) {

            container.innerHTML = `
                <p>No products available.</p>
            `;

            return;
        }

        container.innerHTML = "";

        data.products.forEach(product => {

            const card = document.createElement("div");

            card.className = "product-card";

            card.innerHTML = `

                <img
                    src="${product.image || "https://via.placeholder.com/400"}"
                    alt="${product.name}"
                >

                <div class="product-info">

                    <h3>
                        ${product.name}
                    </h3>

                    <p class="product-description">
                        ${product.description || "No description available"}
                    </p>

                    <div class="product-price">
                        ₹${product.price}
                    </div>

                    <div class="product-stock">
                        Stock: ${product.stock}
                    </div>

                    <button
                        class="add-cart-btn"
                        onclick="addToCart(${product.id})"
                    >
                        🛒 Add to Cart
                    </button>

                </div>
            `;

            container.appendChild(card);

        });

    } catch (error) {

        console.error("Products loading error:", error);

        container.innerHTML = `
            <p>Unable to connect to server.</p>
        `;
    }
}


// ===============================
// START PRODUCTS
// ===============================

loadProducts();
// ===============================
// LOAD PRODUCTS
// ===============================

async function loadProducts() {

    const container = document.getElementById("productsContainer");

    if (!container) {
        return;
    }

    try {

        const response = await fetch(`${API_URL}/products`);

        const data = await response.json();

        console.log("Products:", data);

        if (!data.success) {

            container.innerHTML = `
                <p>Unable to load products.</p>
            `;

            return;
        }

        if (!data.products || data.products.length === 0) {

            container.innerHTML = `
                <p>No products available.</p>
            `;

            return;
        }

        container.innerHTML = "";

        data.products.forEach(product => {

            const card = document.createElement("div");

            card.className = "product-card";

            card.innerHTML = `

                <img
                    src="${product.image || "https://via.placeholder.com/400"}"
                    alt="${product.name}"
                >

                <div class="product-info">

                    <h3>
                        ${product.name}
                    </h3>

                    <p class="product-description">
                        ${product.description || "No description available"}
                    </p>

                    <div class="product-price">
                        ₹${product.price}
                    </div>

                    <div class="product-stock">
                        Stock: ${product.stock}
                    </div>

                    <button
                        class="add-cart-btn"
                        onclick="addToCart(${product.id})"
                    >
                        🛒 Add to Cart
                    </button>

                </div>
            `;

            container.appendChild(card);

        });

    } catch (error) {

        console.error("Products loading error:", error);

        container.innerHTML = `
            <p>Unable to connect to server.</p>
        `;
    }
}


// ===============================
// START PRODUCTS
// ===============================

loadProducts();



// ===============================
// START
// ===============================

loadProducts();
// ===============================
// REGISTER
// ===============================

const registerForm = document.getElementById("registerForm");

if (registerForm) {

    registerForm.addEventListener("submit", async function (event) {

        event.preventDefault();

        const name = document.getElementById("name").value;
        const email = document.getElementById("email").value;
        const password = document.getElementById("password").value;

        const message = document.getElementById("registerMessage");

        try {

            const response = await fetch(`${API_URL}/auth/register`, {

                method: "POST",

                headers: {
                    "Content-Type": "application/json"
                },

                body: JSON.stringify({
                    name,
                    email,
                    password
                })

            });

            const data = await response.json();

            console.log("Register response:", data);

            if (data.success) {

                message.style.color = "green";

                message.textContent =
                    "Registration successful! Redirecting to login...";

                registerForm.reset();

                setTimeout(() => {
                    window.location.href = "login.html";
                }, 1500);

            } else {

                message.style.color = "red";

                message.textContent =
                    data.message || "Registration failed.";

            }

        } catch (error) {

            console.error("Registration error:", error);

            message.style.color = "red";

            message.textContent =
                "Unable to connect to server.";

        }

    });

}
// ===============================
// LOGIN
// ===============================

const loginForm = document.getElementById("loginForm");

if (loginForm) {

    loginForm.addEventListener("submit", async function (event) {

        event.preventDefault();

        const email =
            document.getElementById("loginEmail").value;

        const password =
            document.getElementById("loginPassword").value;

        const message =
            document.getElementById("loginMessage");

        try {

            const response = await fetch(
                `${API_URL}/auth/login`,
                {
                    method: "POST",

                    headers: {
                        "Content-Type": "application/json"
                    },

                    body: JSON.stringify({
                        email,
                        password
                    })
                }
            );

            const data = await response.json();

            console.log("Login response:", data);

            if (data.success) {

                message.style.color = "green";

                message.textContent =
                    "Login successful!";

                // Save login information
                if (data.user) {

                    localStorage.setItem(
                        "user",
                        JSON.stringify(data.user)
                    );

                    localStorage.setItem(
                        "userId",
                        data.user.id
                    );
                }

                // Save token if backend sends one
                if (data.token) {

                    localStorage.setItem(
                        "token",
                        data.token
                    );
                }

                setTimeout(() => {

                    window.location.href =
                        "products.html";

                }, 1000);

            } else {

                message.style.color = "red";

                message.textContent =
                    data.message || "Login failed.";

            }

        } catch (error) {

            console.error("Login error:", error);

            message.style.color = "red";

            message.textContent =
                "Unable to connect to server.";

        }

    });

}
// ===============================
// LOAD CART
// ===============================

async function loadCart() {

    const container =
        document.getElementById("cartContainer");

    if (!container) {
        return;
    }

    const userId =
        localStorage.getItem("userId");

    if (!userId) {

        container.innerHTML = `
            <p>Please login to view your cart.</p>
        `;

        return;
    }

    try {

        const response = await fetch(
            `${API_URL}/cart/${userId}`
        );

        const data = await response.json();

        console.log("Cart:", data);

        if (!data.success) {

            container.innerHTML = `
                <p>${data.message}</p>
            `;

            return;
        }

        if (!data.cart || !data.cart.CartItems ||
            data.cart.CartItems.length === 0) {

            container.innerHTML = `
                <h3>Your cart is empty 🛒</h3>
                <br>
                <a href="products.html" class="btn">
                    Continue Shopping
                </a>
            `;

            return;
        }

        let total = 0;

        container.innerHTML = "";

        data.cart.CartItems.forEach(item => {

            const product = item.Product;

            const quantity =
                Number(item.quantity);

            const price =
                Number(item.price);

            const itemTotal =
                price * quantity;

            total += itemTotal;

            const div =
                document.createElement("div");

            div.className = "cart-item";

            div.innerHTML = `

                <img
                    src="${product.image || "https://via.placeholder.com/100"}"
                    alt="${product.name}"
                >

                <div class="cart-item-info">

                    <h3>
                        ${product.name}
                    </h3>

                    <p>
                        ${product.description || ""}
                    </p>

                    <p class="cart-price">
                        ₹${price.toFixed(2)}
                    </p>

                </div>

                <div class="quantity-controls">

                    <button
                        onclick="updateCartItem(${item.id}, ${quantity - 1})"
                        ${quantity <= 1 ? "disabled" : ""}
                    >
                        −
                    </button>

                    <strong>
                        ${quantity}
                    </strong>

                    <button
                        onclick="updateCartItem(${item.id}, ${quantity + 1})"
                    >
                        +
                    </button>

                </div>

                <button
                    class="remove-btn"
                    onclick="removeCartItem(${item.id})"
                >
                    Remove
                </button>

            `;

            container.appendChild(div);

        });

        const totalDiv =
            document.createElement("div");

        totalDiv.className = "cart-total";

        totalDiv.innerHTML = `

            <h2>
                Total: ₹${total.toFixed(2)}
            </h2>

            <button
                class="checkout-btn"
                onclick="goToCheckout()"
            >
                Proceed to Checkout
            </button>

        `;

        container.appendChild(totalDiv);

    } catch (error) {

        console.error("Cart loading error:", error);

        container.innerHTML = `
            <p>Unable to load cart.</p>
        `;
    }
}


// ===============================
// UPDATE CART ITEM
// ===============================

async function updateCartItem(cartItemId, quantity) {

    if (quantity <= 0) {
        return;
    }

    try {

        const response = await fetch(
            `${API_URL}/cart/${cartItemId}`,
            {
                method: "PUT",

                headers: {
                    "Content-Type": "application/json"
                },

                body: JSON.stringify({
                    quantity: quantity
                })
            }
        );

        const data = await response.json();

        console.log(data);

        if (data.success) {

            loadCart();

        } else {

            alert(data.message);

        }

    } catch (error) {

        console.error(error);

        alert("Unable to update cart.");

    }
}


// ===============================
// REMOVE CART ITEM
// ===============================

async function removeCartItem(cartItemId) {

    try {

        const response = await fetch(
            `${API_URL}/cart/${cartItemId}`,
            {
                method: "DELETE"
            }
        );

        const data = await response.json();

        if (data.success) {

            loadCart();

        } else {

            alert(data.message);

        }

    } catch (error) {

        console.error(error);

        alert("Unable to remove product.");

    }
}


// ===============================
// CHECKOUT
// ===============================

function goToCheckout() {

    window.location.href =
        "checkout.html";
}


// ===============================
// START CART
// ===============================

loadCart();
