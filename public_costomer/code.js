let itemsInCart = [];
let itemsWrapper = $("#items_wrapper");

refreshPage();

function refreshPage() {
    $.ajax({
        url: '/admin/all',
        method: 'GET',
        success: (result) => {
            pushItems(result);
        }
    });
}

function pushItems(items) {
    itemsWrapper.empty();
    for (item of items) {
        appendItem(item)
    }
}

function appendItem(itemInfo) {
    let itemCard = $(`<div class="item col-md-6 col-lg-4" data-id="${itemInfo.itemId}">
    <div class="card">
        <img src="api/img/${itemInfo.imageName}" class="card-img-top img-fluid" alt="Product Image">
        <div class="card-body">
            <h3 class="card-title">${itemInfo.name}</h3>
            <p class="display-4">₹${itemInfo.price}</p>
            <p class="card-text">${itemInfo.description}</p>
            <p class="card-text">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas scelerisque sem ex, a venenatis magna eleifend quis. Donec interdum metus nec urna euismod, non bibendum dolor convallis.</p>
            <button class="btn btn-outline-dark cart-button" data-id="${itemInfo.itemId}">Add To Cart</button>
        </div>
    </div>
</div>`);
    itemsWrapper.prepend(itemCard)
}

itemsWrapper.on('click', '.cart-button', e => {
    let editItemDataId = e.target.getAttribute('data-id');
    let isDuplicate = false;
    itemsInCart.forEach(item => {
        if (item === editItemDataId) {
            isDuplicate = true;
        }
    });
    if (!isDuplicate) {
        itemsInCart.push(editItemDataId);
        localStorage.setItem('cartItems', JSON.stringify(itemsInCart));
        alert('Item added!');
    }
});
