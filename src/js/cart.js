import { getLocalStorage } from "./utils.mjs";
import { loadHeaderFooter } from "./utils.mjs";

function renderCartContents() {
  const cartItems = getLocalStorage("so-cart") || [];

  const htmlItems = cartItems.map((item) => cartItemTemplate(item));
  document.querySelector(".product-list").innerHTML = htmlItems.join("");
}

function cartItemTemplate(item) {
  return `<li class="cart-card divider" data-id="${item.Id}">
    <a href="#" class="cart-card__image">
      <img src="${item.Image}" alt="${item.Name}" />
    </a>
    <a href="#">
      <h2 class="card__name">${item.Name}</h2>
    </a>
    <p class="cart-card__color">${item.Colors[0].ColorName}</p>
    <div class="cart-card__quantity">
      <button class="decrement">-</button>
      <span class="quantity">${item.quantity || 1}</span>
      <button class="increment">+</button>
    </div>
    <p class="cart-card__price">$${item.FinalPrice}</p>
  </li>`;
}

renderCartContents();
attachQuantityButtons();
loadHeaderFooter();

function updateQuantity(productId, change) {
  const cartItems = getLocalStorage("so-cart") || [];
  const product = cartItems.find((item) => item.Id === productId);

  if (product) {
    product.quantity = (product.quantity || 1) + change;

    //delete item if quantity is 0
    if (product.quantity <= 0) {
      const index = cartItems.indexOf(product);
      cartItems.splice(index, 1);
    }

    localStorage.setItem("so-cart", JSON.stringify(cartItems));
    renderCartContents();
    attachQuantityButtons();
  }
}

function attachQuantityButtons() {
  document.querySelectorAll(".increment").forEach((btn) => {
    btn.addEventListener("click", () => {
      const productId = btn.closest("li").dataset.id;
      updateQuantity(productId, 1);
    });
  });

  document.querySelectorAll(".decrement").forEach((btn) => {
    btn.addEventListener("click", () => {
      const productId = btn.closest("li").dataset.id;
      updateQuantity(productId, -1);
    });
  });
}

