$(document).ready(function() {
    var timer = setInterval(function () {
        // ajax query goes here
        $.getJSON("getTrumpCount", function(data) {
            // var items = [];
            console.log(data);

            $("#data").empty();
            $("#hats").empty();



            data.ids.forEach(function(id) {
                // $("#data").append("<li>" + id + "</li>");
                $("#hats").append("<img src='img/redhat.jpg' alt='hat' width='50' height='50'>");
            });

        });

        console.log("tick");
    }, 1000);




});
