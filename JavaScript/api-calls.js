const url =
  "https://rainydays-cma.flywheelsites.com/wp-json/wc/v3/products?consumer_key=ck_b7d5f9a7eca859816bbe9d7f1a1134b8ebb2e44e&consumer_secret=cs_764aebbd432166b210a605379750a263fe3dbd00";

const productContainer = document.querySelector(".products");
const featuredCheckbox = document.querySelector("#featured-checkbox");

let testProducts;

async function getProducts() {
  try {
    const response = await fetch(url);
    const products = await response.json();
    featuredCheckbox.addEventListener("change", () => {
      createHTML(products, featuredCheckbox.checked);
    });
    createHTML(products);
    console.log(products);
    testProducts = products;
  } catch (error) {
    console.log(error);
  }
}

function createHTML(products, onlyFeatured = false) {
  productContainer.innerHTML = "";
  products
    .filter((product) => !onlyFeatured || product.featured)
    .forEach(function (product) {
      const productDiv = document.createElement("div");
      productDiv.classList.add("product");

      const price = new Intl.NumberFormat("no-NO", {
        style: "currency",
        currency: "NOK",
      }).format(product.price);

      productDiv.innerHTML = `
        <img src="${product.images[0].src}" alt="${product.name}">
        <h3>${product.name}</h3>
        <h3>${price}</h3>
      `;
      productDiv.addEventListener("click", () => {
        window.location.href = `product.html?id=${product.id}`;
      });
      productContainer.appendChild(productDiv);
    });
}

getProducts();
