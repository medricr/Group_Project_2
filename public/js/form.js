

$(document).ready(function () {
    console.log("ready");


    //this is to test to get image data
    $(".get-image-data").on("click", function () {
        console.log("test");





        var file = document.getElementById('inputGroupFile04').files[0];

        //CONVERTS THE FILE INTO A BLOB THAT THE IMG HTML SRC TAG CAN READ
        blobUtil.blobToDataURL(file).then(function (data) {
            console.log(data);

            var test = {
                data: data
            }
            $.ajax({
                type: "POST",
                url: "/submit/photo",
                data: test,

            }).then(function (data) {

                console.log(data);

                $(".img-holder").attr("src", data.data);

            })


        })













        // console.log(test)


        // test = atob(file);
        // console.log(test)


        // console.log(pictureData);



        // var buff = btoa(pictureData);


        // console.log(buff);





        // $(".image-holder").attr("src", file);

        // $.ajax({
        //     type: "POST",

        //     url: "/submit/photo",
        //     data: pictureData,
        // }).then(function (data) {
        //     console.log(data);
        // })



    })
})