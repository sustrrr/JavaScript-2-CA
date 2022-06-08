import { getExistingFavs } from "./utils/favFunctions.js";
import products from "./data/products.js";

const search = document.querySelector(".search");
const error = document.querySelector(".error");

const productContainer = document.querySelector(".product-container");
let productsToRender = products;

const favourites = getExistingFavs();

function renderProducts() {
  productContainer.innerHTML = "";
  productsToRender.forEach(function (product) {
    let cssClass = "far";

    const doesObjectExist = favourites.find(function (fav) {
      console.log(fav);

      return parseInt(fav.id) === product.id;
    });

    console.log(doesObjectExist);

    if (doesObjectExist) {
      cssClass = "fa";
    }

    productContainer.innerHTML += `<div class="product">
                                    <h4>${product.id}</h4>
                                    <p>${product.title}</p>
                                    <p>${product.author}</p>
                                    <i class="${cssClass} fa-heart" data-id="${product.id}" data-name="${product.title}"></i>
                                </div>`;
  });
}

renderProducts();

/// filter

search.onkeyup = function (event) {
  const searchValue = event.target.value.trim().toLowerCase();

  const filteredProducts = products.filter(function (product) {
    if (product.title.toLowerCase().startsWith(searchValue)) {
      return true;
    }
  });

  console.log(filteredProducts);

  productsToRender = filteredProducts;

  renderProducts();
};

//// fav

const favButtons = document.querySelectorAll(".product i");

favButtons.forEach((button) => {
  button.addEventListener("click", handleClick);
});

function handleClick() {
  this.classList.toggle("fa");
  this.classList.toggle("far");

  const id = this.dataset.id;
  const name = this.dataset.name;

  const currentFavs = getExistingFavs();

  const productExists = currentFavs.find(function (fav) {
    return fav.id === id;
  });

  if (productExists === undefined) {
    const product = { id: id, name: name };
    currentFavs.push(product);
    saveFavs(currentFavs);
  } else {
    const newFavs = currentFavs.filter((fav) => fav.id !== id);
    saveFavs(newFavs);
  }
}

function saveFavs(favs) {
  localStorage.setItem("favourites", JSON.stringify(favs));
}
