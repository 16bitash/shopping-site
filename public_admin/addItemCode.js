// $('#add_item_form').submit(e => {
//     let data = {};
//     e.preventDefault();
//     let inputs = $("form input")
//     inputs.filter(function () {
//         return $(this).val() !== "";
//     }).each(function (__, element) {
//         let name = $(this).attr('name');
//         data[name] = $(this).val();
//     })
//     $.ajax({
//         url: '/admin',
//         contentType: 'multipart/form-data',
//         method: 'POST',
//         data: data,
//         success: (response) => {
//             alert(response.name + " has been added successfully");
//             $("input").val("");
//         }
//     })
// })

let addItemForm = $("#add_item_form");
addItemForm.submit(e => {
    e.preventDefault();
    let formData = new FormData(addItemForm[0]);
    let inputs = $("form input");
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
            alert(response.name + " has been added successfully");
            $("input").val("");
        }
    })
});