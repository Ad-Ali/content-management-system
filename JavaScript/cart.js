populateCart();

const checkoutBtn = document.querySelector(".checkout-btn");
checkoutBtn.addEventListener("click", () => {
  window.location.href = "../HTML/order-successful.html";
});
