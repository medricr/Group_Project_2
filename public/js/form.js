

$(document).ready(function () {

    //this is to test to get image data
    $("#submit").on("click", function () {
        $.ajax({
            method: "POST",
            url: "/api/recipes",
            data: {
                name: $("#drink_name").val().trim(),
                rating: 0,
                steps: $("#steps").val().trim(),
                ingredients: $("#ingredients").val().trim()
            }
        })
            .then(function (res) {
                var file = document.getElementById('inputGroupFile04').files[0];

                //CONVERTS THE FILE INTO A BLOB THAT THE IMG HTML SRC TAG CAN READ
                blobUtil.blobToDataURL(file).then(function (data) {

                    var test = {
                        data: data,
                        recipe_id: res.id
                    };

                    $.ajax({
                        method: "POST",
                        url: "/submit/photo",
                        data: test
                    }).then(function (data) {
                        $(".img-holder").attr("src", data.data);
                    });
                });
            });
    });
});