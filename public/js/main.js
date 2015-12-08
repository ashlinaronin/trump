$(document).ready(function() {
    var lastTimeStamp;
    var numTweetsPrinted = 0;

    var timer = setInterval(function () {
        $.getJSON("getTrumpCount", function(data) {
            // First, calculate how many new tweets there are
            var numNewTweets = data.count - numTweetsPrinted;

            // If there are new tweets, print them.
            if (numNewTweets !== 0) {
                for (var i = 0; i < numNewTweets; i++) {
                    var nextTweetIndex = (numTweetsPrinted + i);

                    $("#hats").append(
                        "<a href='https://twitter.com/" + data.tweets[nextTweetIndex].userHandle +
                        "/status/" + data.tweets[nextTweetIndex].id + "' class='hatlink' target='_blank'>" +
                        // "#stream-item-tweet-" + data.tweets[nextTweetIndex].id + "' class='hatlink'>" +
                        "<img src='img/redhat-sq.jpg' alt='hat' class='redhat'>" +
                        "<img src='" + data.tweets[nextTweetIndex].biggerAvatarUrl + "' alt='avatar' class='avatar'>" +
                        "</a>"
                    );

                    // Add slow fade-in effect to this hat with jQuery
                    $("#hats a").last().hide().fadeIn("slow");

                    // Bind the onHover to the hat when we create it!
                    $("#hats a").last().hover(function() {
                        $(this).children("img.redhat").toggle();
                        $(this).children("img.avatar").toggle();
                    });
                }

                // By this point we should have printed all of the tweets from
                // the JSON, so we can set the num printed to that amount.
                numTweetsPrinted = data.count;

                // Set last time stamp to the one associated with new data.
                lastTimeStamp = data.timestamp;
            }
        });
    // Check every 1000 ms = 1 s
    }, 1000);
});
