$(document).ready(function () {

    $(".like").on("click", function () {
        var id = $(this).attr("data-recipe-id");
        console.log("THE ID is " + id);
        $.ajax({
            method: "PUT",
            url: "/api/recipes/" + id + "/like"
        }).then(function (_res) {
            //MICHAEL you can respond to the 'like' however you want
            //if you get to this point, the like should already be in the database
            // I reloaded the page but you can
            // just change the number for 'rating' 
            //for a better user experience
            window.location.reload();
        });
    });
});