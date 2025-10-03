import ExternalServices from "./ExternalServices.mjs";
import ProductList from "./ProductList.mjs";
import {loadHeaderFooter, getParam} from "./utils.mjs";


const category = getParam("category");
const dataSource = new ExternalServices();
const listElement = document.querySelector(".product-list");
const myList = new ProductList(category, dataSource, listElement);

myList.init();

loadHeaderFooter();

function addToCart(product) {
    const cart = JSON.parse(localStorage.getItem("so-cart")) || [];

    const existing = cart.find((item) => item.Id === product.Id);
    if (existing) {
        existing.quantity = (existing.quantity || 1) + 1;
    } else {
        product.quantity = 1;
        cart.push(product);
    }

    localStorage.setItem("so-cart", JSON.stringify(cart));
    alert(`${product.Name} added to cart!`);
}

document.querySelectorAll(".add-to-cart").forEach((btn) => {
    btn.addEventListener("click", async () => {
    const productId = btn.dataset.id;
    const product = await dataSource.findProductById(productId);
    addToCart(product);
    });
});

