import { getExistingFavs } from "./utils/favFunctions.js";

const favourites = getExistingFavs();

const productContainer = document.querySelector(".product-container");

if (favourites.length === 0) {
  productContainer.innerHTML = "No favourites yet";
}

function createList() {
  favourites.forEach((favourite) => {
    productContainer.innerHTML += `<div class="product">
                                    <h4>${favourite.id}</h4>
                                    <p>${favourite.name}
                                    <i class="fa fa-heart"></i>
                                </div>`;
  });
}

createList();

function clearButton() {
  const clearBtn = document.querySelector("#clear");

  clearBtn.addEventListener("click", clearList);

  function clearList() {
    localStorage.clear();
    createList([]);
    productContainer.innerHTML = "";
  }
}

clearButton();
