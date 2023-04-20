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
  priceInNumber = parseInt(jacketPrice.innerHTML.slice(0, 3));
  let totalPrice = 0;
  const totalPriceWritten = document.createElement("p");

  // Create a checkout button.
  const button = document.createElement("a");
  button.innerHTML = "<p></p><b>Go To Checkout</b>";
  button.addEventListener("click", function () {
    // Retrieve the total price from local storage
    const totalPrice = localStorage.getItem("totalPrice");
    const listItems = JSON.parse(localStorage.getItem("listItems"));

    // Redirect to the checkout page with the total price as a query parameter
    window.location.href =
      "/html/order-details.html?totalPrice=" +
      totalPrice +
      "&listItems=" +
      encodeURIComponent(JSON.stringify(listItems));
    // Change the URL to your checkout page URL
  });

  // Clear the cart first
  innerCart.innerHTML = "";

  // Loop through the bag array and create a new list item for each item
  const listItems = [];
  for (let i = 0; i < bag.length; i++) {
    const item = bag[i];

    // Increment total price
    totalPrice += priceInNumber;

    // Store the total price in local storage
    localStorage.setItem("totalPrice", totalPrice);

    // Create a new list item
    const listItem = document.createElement("li");

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
    listItem.appendChild(img);
    listItem.appendChild(title);
    listItem.appendChild(price);

    // Store the jacket title and price as separate strings in local storage
    listItems.push({ title: title.innerHTML, price: price.innerHTML });
    localStorage.setItem("listItems", JSON.stringify(listItems));

    totalPriceWritten.innerHTML =
      "<b>Total price: " + totalPrice + " &euro;</b>";

    // Append the list item to the cart
    innerCart.appendChild(listItem);
    innerCart.appendChild(totalPriceWritten);
    innerCart.appendChild(button);
  }
}
