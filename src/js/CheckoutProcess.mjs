

function packageItems(items){
    const simpleItems = items.map(item => {
        console.log(item);
        return {
            id: item.Id,
            price: item.FinalPrice,
            name: item.Name,
            quantity: item.quantity || 1,
        };
    });
    return simpleItems;
}

export default class CheckoutProcess {
    constructor(key, outputSelector) {
        this.key = key;
        this.outputSelector = outputSelector;
        this.list = [];
        this.itemTotal = 0;
        this.shipping = 0;
        this.tax = 0;
        this.orderTotal = 0;
    }

    init() {
        this.list = getLocalStorage(this.key);
        this.calculateItemSummary();
    }

    calculateItemSummary() {
        // calculate and display the total amount of the items in the cart, and the number of items.
        const summaryElement = document.querySelector(
        this.outputSelector + " #ordersubtotal"
        );
        // calculate the total of all the items in the cart
        const amounts = this.list.map((item) => item.FinalPrice);
        this.itemTotal = amounts.reduce((sum, item) => sum + item);
        summaryElement.innerText = `$${this.itemTotal}`;;
    }

    calculateOrderTotal() {
        // calculate the shipping and tax amounts. Then use them to along with the cart total to figure out the order total
        this.tax = (this.itemTotal * .06);
        this.shipping = 10 + (this.list.length - 1) * 2;
        this.orderTotal = (
        parseFloat(this.itemTotal) +
        parseFloat(this.tax) +
        parseFloat(this.shipping)
        )
        // display the totals.
        this.displayOrderTotals();
    }

    displayOrderTotals() {
        // once the totals are all calculated display them in the order summary page
        const tax = document.querySelector(`${this.outputSelector} #ordertax`);
        const shipping = document.querySelector(`${this.outputSelector} #shippingEstimate`);
        const orderTotal = document.querySelector(`${this.outputSelector} #ordergrandtotal`);

        tax.innerText = `$${this.tax.toFixed(2)}`;
        shipping.innerText = `$${this.shipping.toFixed(2)}`;
        orderTotal.innerText = `$${this.orderTotal.toFixed(2)}`;
    }

    async checkout() {
        const formElement = document.forms["checkout"];
        const order = formDataToJSON(formElement);

        order.orderDate = new Date().toISOString();
        order.orderTotal = this.orderTotal;
        order.tax = this.tax;
        order.shipping = this.shipping;
        order.items = packageItems(this.list);
        //console.log(order);

        try {
        const response = await services.checkout(order);
        console.log(response);
        } catch (err) {
        console.log(err);
        }
    }
}