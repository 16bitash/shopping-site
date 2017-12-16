let itemsContainer = $("#items_container");
let paymentButton = $("#pay");
let addedItems = JSON.parse(localStorage.getItem('cartItems'));
let count = 1;
let total = 0;

addedItems.forEach((id) => {
    $.ajax({
        url: '/admin',
        method: 'GET',
        data: {id: id},
        success: (item) => {
            addToCart(item.name, item.price);
            total += item.price;
        },
        complete: () => {
            paymentButton.html('Pay ₹' + total);
        }
    });
});

function addToCart(name, price) {
    let item = `
    <div class="row">
            <div class="col-4">${count}</div>
            <div class="col-4">${name}</div>
            <div class="col-4">${price}</div>
        </div>`;
    count++;
    itemsContainer.append(item);
}