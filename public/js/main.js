//TODO: Don't rely on lexical scope, encapsulate more cleanly.

$(document).ready(function() {
    $.mobile.loading().hide();

    var lastTimeStamp;
    var numTweetsPrinted = 0;

    var showing = null;
    var speed = 300;

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
                          "<img src='img/redhat-sq.jpg' alt='hat' class='redhat'>" +
                          "<img src='" + data.tweets[nextTweetIndex].biggerAvatarUrl + "' alt='avatar' class='avatar'>"
                        + "</span>"
                    );

                    // Add slow fade-in effect to this hat with jQuery
                    $("#hats span").last().hide().fadeIn(speed);

                    // Bind the onHover to the hat when we create it.
                    // Now supporting touch and click events simultaneously.
                    // This solution from http://stackoverflow.com/questions/3038898/ipad-iphone-hover-problem-causes-the-user-to-double-click-a-link
                    $("#hats span").last().on('touchstart mouseenter', function() {
                        $(this).children("img.redhat").hide();
                        $(this).children("img.avatar").show();
                    })
                    .on('mouseleave touchmove click', function() {
                        $(this).children("img.redhat").show();
                        $(this).children("img.avatar").hide();
                    });
                }

                // Set up click handlers for all hats
                $("#hats span").click(function() {
                  var index = $('#hats span').index($(this));

                  if (!showing) {
                    $('#overlay').css('background-image', 'url(' + data.tweets[index].biggerAvatarUrl + ')');
                    $('#overlay').hide().fadeIn(speed);

                    // Show arrows for larger screens
                    if ($(window).innerWidth() > 640) {
                      $('.arrow').hide().fadeIn(speed);
                    }

                    $('#overlay-text').text('@' + data.tweets[index].userHandle + ': ' + data.tweets[index].text);
                    $('#overlay-text-wrap').hide().fadeIn(speed);
                    $('#overlay-text').hide().fadeIn(speed, function() {
                      showing = $('#hats span')[index]; // set currently showing only once it is actually shown
                    });
                    $('body').addClass('clickable'); // support touch events
                  }
                });

                // Show next tweet in overlay, if it exists
                var showNext = function() {
                  var newIndex = $('#hats span').index(showing) + 1;

                  if (data.tweets[newIndex]) {
                    $('#overlay').css('background-image', 'url(' + data.tweets[newIndex].biggerAvatarUrl + ')');
                    $('#overlay-text').text('@' + data.tweets[newIndex].userHandle + ': ' + data.tweets[newIndex].text);
                    showing = $(showing).next();
                  }
                }

                // Show previous tweet in overlay, if it exists
                var showPrevious = function() {
                  var newIndex = $('#hats span').index(showing) - 1;

                  if (data.tweets[newIndex]) {
                    $('#overlay').css('background-image', 'url(' + data.tweets[newIndex].biggerAvatarUrl + ')');
                    $('#overlay-text').text('@' + data.tweets[newIndex].userHandle + ': ' + data.tweets[newIndex].text);
                    showing = $(showing).prev();
                  }
                }

                // Hover effect for arrows
                $('.arrow').mouseenter(function() {
                  $(this).find('circle')[0].style.opacity = 0.5;
                })
                .mouseleave(function() {
                  $(this).find('circle')[0].style.opacity = 0.25;
                });

                // Prevent event duplication issue by unbinding before binding
                $('#arrow-left').off('click').on('click', function() {
                  if (showing) { showPrevious() };
                });
                $('#arrow-right').off('click').on('click', function() {
                  if (showing) { showNext() };
                });



                // Left and right arrow keys or swiping to show next and previous tweets
                // Prevent event duplication issue by unbinding here too
                $(document).off('keyup').on('keyup', function(event) {
                  switch(event.which) {
                    case 37: // left
                      if (showing) { showPrevious() }
                      break;
                    case 39: // right
                      if (showing) { showNext() }
                      break;
                    default: // other key hides overlay
                      if (showing) { hideOverlay() }
                      break;
                  }
                });

                $(window).on('swipeleft', function(event) {
                  if (showing) {showNext()};
                });

                $(window).on('swiperight', function(event) {
                  if (showing) {showPrevious()};
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
      $('.arrow').fadeOut(speed);
      $('#overlay-text').fadeOut(speed, function() {
        $('#overlay-text').text(null);
        showing = null;
      });
      $('body').removeClass('clickable');
    }

    // Click anywhere except the navigation buttons to hide the overlay
    $('body').click(function(event) {
      // If an arrow was clicked, don't do anything here
      if (event.target.class == 'arrow') {
        return;
      }

      // If any descendant of an arrow was clicked, also disable the hideOverlay functionality
      // jQuery closest finds the closest given selector found after traversing up the DOM
      if ($(event.target).closest('.arrow').length) {
        return;
      }

      // If anywhere else was clicked and the overlay is currently showing, hide it
      if (showing) { hideOverlay() }
    });

});
