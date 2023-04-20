const url =
  "https://rainydays-cma.flywheelsites.com/wp-json/wc/v3/products?consumer_key=ck_b7d5f9a7eca859816bbe9d7f1a1134b8ebb2e44e&consumer_secret=cs_764aebbd432166b210a605379750a263fe3dbd00";

const productContainer = document.querySelector(".products");

async function getProducts() {
  try {
    const response = await fetch(url);
    const getResults = await response.json();
    createHTML(getResults);
  } catch (error) {
    console.log(error);
  }
}

getProducts();

function createHTML(products) {
  products.forEach(function (product) {
    console.log(product);
    productContainer.innerHTML += `<div class="product">
        <h2>${product.name}</h2>
        <img src="${product.images[0].src}" alt="${product.name}">
    </div>`;
  });
}
