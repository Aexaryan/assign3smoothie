document.addEventListener('DOMContentLoaded', () => {
    document.getElementById('order-btn').addEventListener('click', () => {
        const order = new Smoothie();
        order.base = document.getElementById('base').value;
        order.fruits = Array.from(document.querySelectorAll('input[name="fruits"]:checked')).map(fruit => ({
            name: fruit.value, 
            price: parseFloat(fruit.getAttribute('data-price'))
        }));
        order.extras = document.getElementById('extras').value.split(',').map(extra => extra.trim()).filter(extra => extra);

        const orderSummaryDiv = document.getElementById('order-summary');
        orderSummaryDiv.innerHTML = order.describe();
        orderSummaryDiv.classList.add('visible'); // Make the summary visible
    });
});

class Smoothie {
    constructor() {
        this.base = '';
        this.fruits = [];
        this.extras = '';
        this.basePrices = { milk: 2, yogurt: 2.5, juice: 1.5, water: 1 };
        this.extrasPrice = 0.5; // Assuming each extra costs 0.5
    }

    calculateTotal() {
        let total = this.basePrices[this.base];
        this.fruits.forEach(fruit => {
            total += fruit.price;
        });
        total += this.extras.length * this.extrasPrice;
        return total.toFixed(2);
    }

    describe() {
        const fruitList = this.fruits.map(fruit => fruit.name).join(', ') || 'None';
        const extrasList = this.extras.join(', ') || 'None';
        const imageUrl = `images/${this.base}.png`; // Random smoothie image

        return `
            <h2>Your Smoothie Order</h2>
            <img src="${imageUrl}" alt="Your Smoothie" style="max-width:100%; height:auto;">
            <p>Base: ${this.base} ($${this.basePrices[this.base].toFixed(2)})</p>
            <p>Fruits: ${fruitList}</p>
            <p>Extras: ${extrasList}</p>
            <h3>Total Price: $${this.calculateTotal()}</h3>
        `;
    }
}
