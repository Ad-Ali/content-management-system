const url = new URL(window.location.href);
const productId = url.searchParams.get("id");

const productImage = document.querySelector(".product-image");
const productTitle = document.querySelector(".product-title");
const productPrice = document.querySelector(".product-price");
const productSize = document.querySelector(".product-size");
const addToCartBtn = document.querySelector(".add-to-cart-btn");
const productDescription = document.querySelector(".product-description");

async function getProduct() {
  if (!window.location.href.includes("product.html")) {
    return;
  }

  try {
    const response = await fetch(
      `https://rainydays-cma.flywheelsites.com/wp-json/wc/v3/products/${productId}?consumer_key=ck_b7d5f9a7eca859816bbe9d7f1a1134b8ebb2e44e&consumer_secret=cs_764aebbd432166b210a605379750a263fe3dbd00`
    );
    const product = await response.json();
    displayProduct(product);
    addToCartBtn.addEventListener("click", () => {
      const sizeSelect = document.querySelector("#size-select");
      const size = sizeSelect.value;
      const item = {
        id: product.id,
        name: product.name,
        price: product.price,
        description: product.description,
        size,
      };
      addToCart(item, product); // Call the addToCart function
      console.log(getCart()); // Print the updated cart to the console
    });
  } catch (error) {
    console.log(error);
  }
}

function displayProduct(product) {
  // Set product image
  productImage.style.backgroundImage = `url('${product.images[0].src}')`;

  // Set product title
  productTitle.textContent = product.name;

  // Set product price
  productPrice.textContent = new Intl.NumberFormat("no-NO", {
    style: "currency",
    currency: "NOK",
  }).format(product.price);

  // Set product description
  productDescription.innerHTML = product.description;

  // Create select element for product size
  const sizeOptions = product.attributes.find(
    (attr) => attr.name === "Size"
  ).options;
  const sizeSelect = document.createElement("select");
  sizeSelect.name = "size";
  sizeSelect.id = "size-select";
  sizeOptions.forEach((size) => {
    const sizeOption = document.createElement("option");
    sizeOption.value = size;
    sizeOption.textContent = size;
    sizeSelect.appendChild(sizeOption);
  });
  productSize.appendChild(sizeSelect);
}

getProduct();

// ------------------ CART ---------------------------

function getCart() {
  // Get cart from localStorage, or create an empty cart if it doesn't exist
  const cart = JSON.parse(localStorage.getItem("cart")) || [];
  return cart;
}

function saveCart(cart) {
  // Save cart to localStorage
  localStorage.setItem("cart", JSON.stringify(cart));
}

function addToCart(item, product) {
  // Get the cart from localStorage
  let cart = getCart();

  // Check if the item is already in the cart
  const index = cart.findIndex(
    (cartItem) => cartItem.id === item.id && cartItem.size === item.size
  );

  if (index >= 0) {
    // If the item is already in the cart, update the quantity
    cart[index].quantity++;
  } else {
    // If the item is not in the cart, add it to the cart
    cart.push({
      ...item,
      quantity: 1,
      image: product.images[0].src,
    });
  }

  // Save the updated cart to localStorage
  saveCart(cart);

  // Show the confirmation message
  const confirmationMessage = document.querySelector(".confirmation-message");
  confirmationMessage.style.display = "block";
  setTimeout(() => {
    confirmationMessage.style.display = "none";
  }, 3000);
}

function emptyCart() {
  // Set cart to an empty array
  let cart = [];

  // Save the updated cart to localStorage
  saveCart(cart);

  // Reload the cart display with the new cart data
  populateCart();

  // Set the cart total
  cartTotal.textContent = new Intl.NumberFormat("no-NO", {
    style: "currency",
    currency: "NOK",
  }).format(0);
}

const clearCartBtn = document.querySelector(".clear-cart-btn");
if (window.location.href.includes("cart.html")) {
  clearCartBtn.addEventListener("click", () => {
    emptyCart();
  });
}

const cartTotal = document.querySelector(".cart-total");

function populateCart() {
  const cartItems = document.querySelector(".cart-items");
  let cart = getCart();
  console.log("Cart from populateCart():", cart);

  // Clear the existing cart items
  cartItems.innerHTML = "";

  if (cart.length === 0) {
    cartItems.innerHTML = "<p>Your cart is empty.</p>";
  } else {
    let total = 0;
    cart.forEach((item) => {
      const cartItem = document.createElement("div");
      cartItem.classList.add("cart-item");
      cartItem.innerHTML = `
              <div class="cart-item-image" style="background-image: url('${item.image}')"></div>
              <div class="cart-item-details">
                <h2 class="cart-item-title">${item.name}</h2>
                <p class="cart-item-size">Size: ${item.size}</p>
                <p class="cart-item-price">${item.quantity} x ${item.price}</p>
              </div>
            `;
      cartItems.appendChild(cartItem);

      total += item.quantity * item.price;
    });

    // Set the cart total
    cartTotal.textContent = new Intl.NumberFormat("no-NO", {
      style: "currency",
      currency: "NOK",
    }).format(total);
  }
}
