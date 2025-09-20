import { renderListWithTemplate } from "./utils.mjs";

function productCardTemplate(product) {
return `
    <section class="product-detail">
    <h3>${product.Brand.Name}</h3>
    <h2 class="divider">${product.NameWithoutBrand}</h2>
    <img class="divider" src="${product.Image}" alt="${product.NameWithoutBrand}" />
    <p class="product-card__price">$${product.FinalPrice}</p>
    <p class="product__color">${product.Colors[0]?.ColorName || ""}</p>
    <p class="product__description">${product.DescriptionHtmlSimple}</p>
    <div class="product-detail__add">
        <button id="addToCart" data-id="${product.Id}">Add to Cart</button>
    </div>
    </section>
`;
}

export default class ProductList {
constructor(category, dataSource, listElement) {
    this.category = category;
    this.dataSource = dataSource;
    this.listElement = listElement;
}

async init() {
    const list = await this.dataSource.getData(this.category);

    this.renderList(list);
    document.querySelector(".title").textContent = this.category;

}

renderList(list) {
    renderListWithTemplate(productCardTemplate, this.listElement, list);
}
}


