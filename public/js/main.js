$(document).ready(function() {
    var lastTimeStamp;
    var numTweetsPrinted = 0;

    var showing = null;
    var speed = 200;

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
                    $("#hats span").last().hide().fadeIn(speed);

                    // Bind the onHover to the hat when we create it!
                    $("#hats span").last().hover(function() {
                        $(this).children("img.redhat").toggle();
                        $(this).children("img.avatar").toggle();
                    });



                } // very slow, lots of dom manipulation

                // set up click handlers for all hats
                $("#hats span").click(function() {
                  var index = $('#hats span').index($(this));

                  if (!showing) {
                    $('#overlay').css('background-image', 'url(' + data.tweets[index].biggerAvatarUrl + ')');
                    $('#overlay').hide().fadeIn(speed);

                    $('#overlay-text').text('@' + data.tweets[index].userHandle + ': ' + data.tweets[index].text);
                    $('#overlay-text-wrap').hide().fadeIn(speed);
                    $('#overlay-text').hide().fadeIn(speed, function() {
                      showing = $('#hats span')[index]; // on callback
                    });
                  }
                });

                // Show next tweet in overlay, if it exists
                var showNext = function() {
                  var newIndex = $('#hats span').index($(showing)) + 1;

                  if (data.tweets[newIndex]) {
                    $('#overlay').css('background-image', 'url(' + data.tweets[newIndex].biggerAvatarUrl + ')');
                    $('#overlay-text').text('@' + data.tweets[newIndex].userHandle + ': ' + data.tweets[newIndex].text);
                    showing = $(showing).next();
                  }
                }


                // Show previous tweet in overlay, if it exists
                var showPrevious = function() {
                  var newIndex = $('#hats span').index($(showing)) - 1;

                  if (data.tweets[newIndex]) {
                    $('#overlay').css('background-image', 'url(' + data.tweets[newIndex].biggerAvatarUrl + ')');
                    $('#overlay-text').text('@' + data.tweets[newIndex].userHandle + ': ' + data.tweets[newIndex].text);
                    showing = $(showing).prev();
                  }
                }

                $(document).keyup(function(event) {
                  // event.preventDefault();
                  // try to deal with dual arrow key function
                  // for now don't do anything on up / down
                  switch(event.which) {
                    case 37: // left
                      if (showing) { showPrevious() }
                      break;
                    case 38: // up
                      // if (showing) { showPrevious() }
                      break;
                    case 39: // right
                      if (showing) { showNext() }
                      break;
                    case 40: // down
                      // if (showing) { showNext() }
                      break;
                    default: // other key hides overlay
                      if (showing) { hideOverlay() }
                      break;
                  }
                });


                // By this point we should have printed all of the tweets from
                // the JSON, so we can set the num printed to that amount.
                numTweetsPrinted = data.count;

                // Set last time stamp to the one associated with new data.
                lastTimeStamp = data.timestamp;
            }
        });
    // Check every 1000 ms = 1 s
    }, 1000);

    var hideOverlay = function() {
      $('#overlay').fadeOut(speed);
      $('#overlay-text-wrap').fadeOut(speed);
      $('#overlay-text').fadeOut(speed, function() {
        $('#overlay-text').text(null);
        showing = null;
      });
    }

    // click anywhere to hide the overlay
    $('body').click(function() {
      if (showing) { hideOverlay() }
    });




});
