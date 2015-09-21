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
                        "<a href='https://twitter.com/statuses/" + data.tweets[nextTweetIndex].id + "' class='hatlink'>" +
                        "<img src='img/redhat.jpg' alt='hat' class='redhat'>" +
                        "<img src='" + data.tweets[nextTweetIndex].avatarUrl + "' alt='avatar' class='avatar'>" +
                        "</a>"
                    );

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
