$(document).ready(function() {
    var timer = setInterval(function () {
        $.getJSON("getTrumpCount", function(data) {

            $("#data").empty();
            $("#hats").empty();

            data.ids.forEach(function(id_str) {
                // $("#data").append("<li>" + id + "</li>");
                $("#hats").append(
                    "<a href='https://twitter.com/statuses/" + id_str + "'>" +
                    "<img src='img/redhat.jpg' alt='hat' width='50' height='50'></a>");
            });
        });
    // Check every 1000 ms = 1 s
    }, 1000);
});
