let itemsWrapper = $("#items_wrapper");
let addItemButton = $("#add_item_btn");
let addItemPopup = $("#add_item_popup");
let addItemForm = $("#add_item_form");
let editItemPopup = $("#edit_item_popup");
let editItemForm = $("#edit_item_form");
let closeButton = $(".close-btn");
let everythingExceptPopupWrapper = $("#everything_except_popup_wrapper");

refreshPage();

function deleteItem(element) {
    $.ajax({
        url: '/admin/' + element.getAttribute("data-id"),
        method: 'DELETE',
        success: (response) => {
            $(`#items_wrapper > [data-id = ${response.itemId}]`).remove();
        }
    });
}

addItemButton.click(() => {
    openAddItemPopup();
});

itemsWrapper.on('click', '.edit-item-button', e => {
    localStorage.setItem('itemBeingEdited', e.target.getAttribute('data-id'));
    openEditItemPopup();
});

closeButton.click(() => {
    closeEditItemPopup();
});

addItemForm.submit(e => {
    e.preventDefault();
    let formData = new FormData(addItemForm[0]);
    let inputs = $("#add_item_form input");
    inputs.each((__, element) => {
        if (element.value === "") {
            formData.delete(element.getAttribute('name'));
        }
    });
    $.ajax({
        url: '/admin',
        cache: false,
        contentType: false,
        processData: false,
        method: 'POST',
        data: formData,
        success: (response) => {
            closeAddItemPopup();
            appendItem(response);
        },
    })
});

editItemForm.submit(e => {
    e.preventDefault();
    let formData = new FormData(editItemForm[0]);
    let inputs = $("#edit_item_form input");
    inputs.each((__, element) => {
        if (element.value === "") {
            formData.delete(element.getAttribute('name'));
        }
    });
    $.ajax({
        url: '/admin/' + localStorage.getItem('itemBeingEdited'),
        cache: false,
        contentType: false,
        processData: false,
        method: 'PUT',
        data: formData,
        success: (response) => {
            closeEditItemPopup();
            let itemToBeEdited = $(`#items_wrapper > [data-id = ${response.itemId}]`);
            itemToBeEdited.empty();
            let newContent = `<div class="card">
                <img src="api/img/${response.imageName}" class="card-img-top img-fluid" alt="Product Image">
                <div class="card-body">
                <h3 class="card-title">${response.name}</h3>
                <p class="display-4">₹${response.price}</p>
            <p class="card-text">${response.description}</p>
                <p class="card-text">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas scelerisque sem ex, a venenatis magna eleifend quis. Donec interdum metus nec urna euismod, non bibendum dolor convallis.</p>
            <button class="btn btn-outline-dark edit-item-button" data-id="${response.itemId}">Edit</button>
                <button class="btn btn-outline-danger" onclick="deleteItem(this)" data-id="${response.itemId}">Delete</button>
                </div>
                </div>`;
            itemToBeEdited.append(newContent);
            localStorage.removeItem('itemBeingEdited');
        },
    })
});

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
        appendItem(item);
    }
}

function appendItem(itemInfo) {
    let itemCard = $(`<div class="item col-md-6 col-lg-4" data-id="${itemInfo.itemId}">
    <div class="card">
        <img src="/api/img/${itemInfo.imageName}" class="card-img-top img-fluid" alt="Product Image">
        <div class="card-body">
            <h3 class="card-title">${itemInfo.name}</h3>
            <p class="display-4">₹${itemInfo.price}</p>
            <p class="card-text">${itemInfo.description}</p>
            <p class="card-text">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas scelerisque sem ex, a venenatis magna eleifend quis. Donec interdum metus nec urna euismod, non bibendum dolor convallis.</p>
            <button class="btn btn-outline-dark edit-item-button" data-id="${itemInfo.itemId}">Edit</button>
            <button class="btn btn-outline-danger" onclick="deleteItem(this)" data-id="${itemInfo.itemId}">Delete</button>
        </div>
    </div>
</div>`);
    itemsWrapper.prepend(itemCard)
}

function openAddItemPopup() {
    addItemPopup.css("transform", "translate(-50%, -50%)  scale(1)");
    everythingExceptPopupWrapper.css({"filter": "blur(5px)", "pointer-events": "none"});
}

function closeAddItemPopup() {
    addItemPopup.css("transform", "translate(-50%, -50%)  scale(0)");
    everythingExceptPopupWrapper.css({"filter": "blur(0)", "pointer-events": "auto"});
}

function openEditItemPopup() {
    editItemPopup.css("transform", "translate(-50%, -50%)  scale(1)");
    everythingExceptPopupWrapper.css({"filter": "blur(5px)", "pointer-events": "none"});
}

function closeEditItemPopup() {
    addItemPopup.css("transform", "translate(-50%, -50%)  scale(0)");
    editItemPopup.css("transform", "translate(-50%, -50%)  scale(0)");
    everythingExceptPopupWrapper.css({"filter": "blur(0)", "pointer-events": "auto"});
    localStorage.removeItem('itemBeingEdited');
    $("input").val("");
}

