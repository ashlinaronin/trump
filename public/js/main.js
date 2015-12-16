$(document).ready(function() {
    var lastTimeStamp;
    var numTweetsPrinted = 0;

    var showing = null;

    var timer = setInterval(function () {
        $.getJSON("getTrumpCount", function(data) {
            // First, calculate how many new tweets there are
            var numNewTweets = data.count - numTweetsPrinted;

            // If there are new tweets, print them.
            if (numNewTweets !== 0) {
                for (var i = 0; i < numNewTweets; i++) {
                    var nextTweetIndex = (numTweetsPrinted + i);

                    $("#hats").append(
                        "<span id='" + data.tweets[nextTweetIndex].id + "'>" +
                        // "<a href='https://twitter.com/" + data.tweets[nextTweetIndex].userHandle +
                        // "/status/" + data.tweets[nextTweetIndex].id + "' class='hatlink' target='_blank'>" +
                        // "#stream-item-tweet-" + data.tweets[nextTweetIndex].id + "' class='hatlink'>" +
                        "<img src='img/redhat-sq.jpg' alt='hat' class='redhat'>" +
                        "<img src='" + data.tweets[nextTweetIndex].biggerAvatarUrl + "' alt='avatar' class='avatar'>"
                        // "</a>"
                        + "</span>"
                    );

                    // Add slow fade-in effect to this hat with jQuery
                    $("#hats span").last().hide().fadeIn("slow");

                    // Bind the onHover to the hat when we create it!
                    $("#hats span").last().hover(function() {
                        $(this).children("img.redhat").toggle();
                        $(this).children("img.avatar").toggle();
                    });

                    $("#hats span").last().click(function() {
                      console.dir(showing);
                      if (showing == $(this)) {
                        // this one is already showing, hide it
                        // showing = null;
                        // $('#overlay').fadeOut('slow');
                        // $('#bubble-text').fadeOut('slow');
                      } else if (showing && showing !== $(this)) {
                        // somebody else is showing now
                        // just change showing and text
                        // $('#')
                        // showing = $(this);
                        // $('#bubble-text').text($(this).attr('id'));
                      } else {
                        // nobody is showing yet, set showing to this,
                        // add overlay and change text

                        $('#overlay').hide().fadeIn('slow');
                        $('#bubble-text').text($(this).attr('id'));
                        $('#bubble-text').hide().fadeIn('slow', function() {
                          showing = $(this); // on callback
                        });

                        // setTimeout(function() {
                        //   showing = $(this);
                        // }, 100);
                      }
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

    var showOverlay = function(text) {
      console.log('in show overlay');
      $('#overlay').hide().fadeIn('slow');
      $('#bubble-text').text(text);
      $('#bubble-text').hide().fadeIn('slow');
    }

    var hideOverlay = function() {

      $('#bubble-text').fadeOut('slow');
      $('#overlay').fadeOut('slow');
    }


    $('body').click(function() {
      if (showing) {
        console.log('body sez somebody is showing');

        $('#overlay').fadeOut('slow');
        $('#bubble-text').fadeOut('slow', function() {
          $('#bubble-text').text(null);
          showing = null;
        });
      }
    });
});
