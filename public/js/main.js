$(document).ready(function() {
    var timer = setInterval(function () {
        $.getJSON("getTrumpCount", function(data) {
            console.log(data.timestamp);

            // Right now we empty and re-fill each time
            // need to keep timestamp and do compare to reduce CPU / server load
            $("#hats").empty();



            data.tweets.forEach(function(tweet) {
                // $("#data").append("<li>" + id + "</li>");
                $("#hats").append(
                    "<a href='https://twitter.com/statuses/" + tweet.id + "' class='hatlink'>" +
                    "<img src='img/redhat.jpg' alt='hat' class='redhat'>" +
                    "<img src='" + tweet.avatarUrl + "' alt='avatar' class='avatar'>" +
                    "</a>"
                );

                // Should re-organize object so it stores multiple nested thigns
                // about each tweet then put user imgs here
            });

            // data.avatarUrls.forEach(function(avatarUrl) {
            //   $("#users").append("<img src='" + avatarUrl + "'>");
            // });
        });
    // Check every 1000 ms = 1 s
}, 10000);

    // $("#hats").hover(function(event) { console.log("hover #hats");});
    // $("#hats").mouseover(function(event) { console.log("mouseover #hats");});


    $('#hats').on('hover', 'a', function() {
        console.log("hover on new #hatlink");
        console.log("this is " + $(this));
    });

    $("#hats a").mouseover(function(event) {
        $(this).addClass("animated bounce");
        // $(this).children("img.avatar").toggle();
        console.log("mouseover #hats a");
    }).mouseout(function(event) {
        // Mouse out
        $(this).removeClass("animated bounce");
    });

    // $("#hats").hover(
    //     function(event) {
    //         // Hover on
    //         $(this).addClass("animated bounce");
    //         $(this).children("img.avatar").show();
    //         console.log($(this));
    //
    //     },
    //     function(event) {
    //         // Hover off
    //         $(this).removeClass("animated bounce");
    //     }
    // );


});
