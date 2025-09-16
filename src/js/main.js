import ProductData from "./ProductData.mjs";
import ProductList from "./ProductList.mjs";

const listElement = document.getElementById("product-list");

const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);
const productId = urlParams.get("product");

const dataSource = new ProductData("tents");

const productList = new ProductList("tents", dataSource, listElement);

productList.init(productId);
