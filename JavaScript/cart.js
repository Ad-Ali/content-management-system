import * as common from "../JavaScript/common.js";

function getCart() {
  const cart = common.getFromStorage("cart") || [];
  console.log("Cart:", cart); // Add this line to check the value of cart
  return cart;
}

function saveCart(cart) {
  // Save cart to localStorage
  common.saveToStorage("cart", cart);
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
}

function populateCart() {
  const cartItems = document.querySelector(".cart-items");
  let cart = getCart();
  console.log("Cart from populateCart():", cart); // Add this line to check the value of cart
  if (cart.length === 0) {
    cartItems.innerHTML = "<p>Your cart is empty.</p>";
  } else {
    cartItems.innerHTML = "";
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
    });
  }
}

populateCart();
