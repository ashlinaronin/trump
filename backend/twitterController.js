var path = require('path');

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
var timestamp = null;

// Public function to start the stream
function init () {
    trumpStream();
}

// Return the current data in JSON format
// tweets is an array of tweet objects, e.g. { id: id, avatarUrl: avatarUrl }
function getCurrentData() {
    return {
        timestamp: timestamp,
        count: count,
        tweets: tweets
    };
}

// Stop function here

// Internal function to run the stream and update global vars for JSON printing
function trumpStream() {
    var magaStream = T.stream('statuses/filter',
        { track: '#makeamericagreatagain' }
    );

    magaStream.on('tweet', function (tweet) {
        count++;

        /* Remove the '_normal' at the end of the avatar icon url to get
        ** bigger user avatar images that won't be so pixelated.
        ** '_normal' = 7 chars, so slice off the last 7 chars of the basename
        ** and add back the extension. */
        var image_url = tweet.user.profile_image_url_https;
        var extension = path.extname(image_url);
        var numToSlice = extension.length + 7;
        var biggerAvatar = image_url.slice(0, -numToSlice) + extension;

        // Create a new Tweet object and push it to the tweets array
        var thisTweet = {
            id: tweet.id_str,
            userHandle: tweet.user.screen_name,
            avatarUrl: tweet.user.profile_image_url_https,
            biggerAvatarUrl: biggerAvatar,
        };
        tweets.push(thisTweet);

        // We got a new tweet, update the timestamp
        timestamp = new Date();
    });
}

// init() and getCurrentData() are public functions
module.exports = {
    init : init,
    getCurrentData : getCurrentData
};
