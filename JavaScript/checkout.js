const addToBagButton = document.querySelector(".add-to-bag-button");
const cart = document.querySelector("#cart");
const cartCount = document.querySelector("#cart #cart-count");
const innerCart = document.querySelector("#inner-cart");
const jacketTitle = document.querySelector(".jacket-title");
const jacketPrice = document.querySelector(".jacket-price");
const bag = [];

addToBagButton.addEventListener("click", () => {
  const jacket = document.querySelector(".jacket-picture-block img");
  const jacketSrc = jacket.src;
  bag.push(jacketSrc);
  updateCartUI();
  cart.style.opacity = "100";
  console.log(bag);
});

cart.addEventListener("click", () => {
  switch (innerCart.style.opacity) {
    case (innerCart.style.opacity = "0"):
      innerCart.style.opacity = "100";
      break;
    case (innerCart.style.opacity = "100"):
      innerCart.style.opacity = "0";
      break;
    default:
      break;
  }
});

function updateCartUI() {
  cartCount.innerHTML = bag.length;
  updateInnerCartUI();
}

function updateInnerCartUI() {
  // Add total price
  let priceInNumber = parseInt(jacketPrice.innerHTML.slice(0, 3));
  let totalPrice = 0;
  const totalPriceWritten = document.createElement("p");

  // Create a checkout button.
  const button = document.createElement("a");
  button.innerHTML = "Checkout";
  button.addEventListener("click", function () {
    // Retrieve the total price and items from local storage
    const totalPrice = localStorage.getItem("totalPrice");
    const listItem = JSON.parse(localStorage.getItem("listItem"));

    // Redirect to the checkout page with the total price and items as query parameters
    window.location.href =
      "/html/order-details.html?totalPrice=" +
      totalPrice +
      "&listItem=" +
      encodeURIComponent(JSON.stringify(listItem));
  });

  // Clear the cart first
  innerCart.innerHTML = "";

  // Loop through the bag array and create a new list item for each item
  const listItem = [];
  for (let i = 0; i < bag.length; i++) {
    const item = bag[i];

    // Increment total price
    totalPrice += priceInNumber;

    // Create a new list item
    const li = document.createElement("li");

    // Create an image element and set its src attribute to the jacket image src
    const img = document.createElement("img");
    img.src = item;

    // Create paragraph with the jacket title and set its innerHTML.
    const title = document.createElement("p");
    title.innerHTML = jacketTitle.innerHTML;

    // Create paragraph with the jacket price and set its innerHTML.
    const price = document.createElement("p");
    price.innerHTML = jacketPrice.innerHTML;

    // Append the image to the list item
    li.appendChild(img);
    li.appendChild(title);
    li.appendChild(price);

    // Append the list item to the cart
    innerCart.appendChild(li);

    // Add the list item to the list
    listItem.push({
      src: item,
      title: jacketTitle.innerHTML,
      price: jacketPrice.innerHTML,
    });
  }

  // Store the total price and items in local storage
  localStorage.setItem("totalPrice", totalPrice);
  localStorage.setItem("listItem", JSON.stringify(listItem));

  totalPriceWritten.innerHTML = "<b>Total price: " + totalPrice + " &euro;</b>";

  // Append the total price and checkout button to the cart
  innerCart.appendChild(totalPriceWritten);
  innerCart.appendChild(button);
}
