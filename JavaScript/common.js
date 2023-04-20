let cart = [];

function getCart() {
  // Get cart from localStorage, or create an empty cart if it doesn't exist
  const cart = JSON.parse(localStorage.getItem("cart")) || [];
  return cart;
}

function saveCart(cart) {
  // Save cart to localStorage
  localStorage.setItem("cart", JSON.stringify(cart));
}
