// Set up Twitter API
var Twit = require('twit');
var T = new Twit({
    consumer_key: 'ypDwXDgPm1go9bfJfiU4FB8mU',
    consumer_secret: 'rd0QOOApAj6tn9oFfIQxaN0whc6PhCc1LaX2EJqAEQAhqVszAb',
    access_token: '3378049754-T0zaIXAdw4biMPaHAU05tSvsYxXRWRolxUhcznE',
    access_token_secret: 'OKkoqUNQ9Cz04AkOZaJZ401ChmGO7D3tBUyrGPZ6XmFwq'
});

var count = 0;
var tweets = [];
var timestamp;


// init
// - turn on steam every 10 seconds
// - collect data inside object
// - count how many tweets
function init () {
    trumpStream();
}


function getCurrentData() {
    timestamp = new Date();

    return {
      timestamp: timestamp,
      count: count,
      tweets: tweets
      // tweets is an array of tweet objects e.g. { id: id, avatarUrl: avatarUrl }
    };
}


// Stop

// Print Trump-related tweets to the console
function trumpStream() {
    var magaStream = T.stream('statuses/filter',
        { track: '#makeamericagreatagain' }
    );

    magaStream.on('tweet', function (tweet) {
        count++;

        // Create a new Tweet object and push it to the tweets array
        var thisTweet = {
          id: tweet.id_str,
          avatarUrl: tweet.user.profile_image_url
        };
        tweets.push(thisTweet);
    });
}

module.exports = { init : init,
                     getCurrentData : getCurrentData };
