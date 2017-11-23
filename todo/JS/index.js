/* Get the queries when you load the site*/
window.onload = function () {
    axios.get(url)
    .then(function (response) {
        response.data.forEach(function (val) {
            $('.list-holder').append(`<div id="${val.id}" class="list-card"><i data-id="${val.id}" class="fa fa-check fa-2x done"></i><div class="input-holder" data-id="${val.id}"><input data-id="${val.id}" type = "text" class = "title" placeholder = "Add an task" value="${val.title}"/><input data-id="${val.id}" value="${val.description}" type = "text" class = "description" placeholder = "Description"/></div><div class="icon-holder"><i data-id="${val.id}" class="fa fa-pencil-square-o fa-2x edit"></i><i data-id="${val.id}" class="fa fa-times fa-2x delete"></i></div></div>`);
        });
    })
    .catch(function (error) {
        console.log(error);
    });
}

/* Variables declaration */
var url = 'https://timesheet-1172.appspot.com/42beb4d4/notes';
var titleInput = document.querySelector(".add-title");
var descriptionInput = document.querySelector(".add-description");


// Posts a task to the api data-array.
$('#post-query').on('click', function () {
    postMethod();
});

$('.add-title, .add-description').on('keypress', function (e) {
    if (e.which == 13) {
        postMethod();
    }
});


// $('.list-holder') makes each icon clickable.
// by doing it this way you can specify which conent is done, should update or get removed.
$('.list-holder').on('click', '.done', function () {
    $('input[data-id=' + $(this).attr('data-id') + ']').toggleClass('finished');
});

$('.list-holder').on('click', '.edit', function () {
    let id = $(this).attr("data-id");
    let titleVal = $(`.title[data-id="${id}"]`).val();
    let descriptionVal = $(`.description[data-id="${id}"]`).val();
    axios.put(url + '/' + id, {
        description: descriptionVal,
        title: titleVal
    })
    .then(function (val) {
        $('div[id=' + val.data.id + ']').remove();
        $('.list-holder').append(`<div id="${val.data.id}" class="list-card"><i data-id="${val.data.id}" class="fa fa-check fa-2x done"></i><div class="input-holder" data-id="${val.data.id}"><input data-id="${val.data.id}" type = "text" class = "title" placeholder = "Add an task" value="${val.data.title}"/><input data-id="${val.data.id}" value="${val.data.description}" type = "text" class = "description" placeholder = "Description"/></div><div class="icon-holder"><i data-id="${val.data.id}" class="fa fa-pencil-square-o fa-2x edit"></i><i data-id="${val.data.id}" class="fa fa-times fa-2x delete"></i></div></div>`);
    })
    .catch(function (error) {
        console.log(error);
    });
});

$('.list-holder').on('click', '.delete', function () {
    let id = $(this).attr("data-id");
    axios.delete(url + '/' + id) // Gets data-id attribute and deletes it
    .then(function () {
        $('div[id=' + id + ']').remove();
    })
    .catch(function (error) {
        console.log(error);
    });
});

// Made it to a method so enter and click tiggers this function
function postMethod () {
    axios({
        method: 'POST',
        url: url,
        data: {
            description: descriptionInput.value,
            title: titleInput.value
        }
    })
    .then(function (val) {
        $('.list-holder').append(`<div id="${val.data.id}" class="list-card"><i data-id="${val.data.id}" class="fa fa-check fa-2x done"></i><div class="input-holder" data-id="${val.data.id}"><input data-id="${val.data.id}" type = "text" class = "title" placeholder = "Add an task" value="${val.data.title}"/><input data-id="${val.data.id}" value="${val.data.description}" type = "text" class = "description" placeholder = "Description"/></div><div class="icon-holder"><i data-id="${val.data.id}" class="fa fa-pencil-square-o fa-2x edit"></i><i data-id="${val.data.id}" class="fa fa-times fa-2x delete"></i></div></div>`);
    })
    .catch(function (error) {
        console.log(error);
    });
}

