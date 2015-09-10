// Set up Twitter API
var Twit = require('twit');
var T = new Twit({
    consumer_key: 'ypDwXDgPm1go9bfJfiU4FB8mU',
    consumer_secret: 'rd0QOOApAj6tn9oFfIQxaN0whc6PhCc1LaX2EJqAEQAhqVszAb',
    access_token: '3378049754-T0zaIXAdw4biMPaHAU05tSvsYxXRWRolxUhcznE',
    access_token_secret: 'OKkoqUNQ9Cz04AkOZaJZ401ChmGO7D3tBUyrGPZ6XmFwq'
});

// init
// - turn on steam every 10 seconds
// - collect data inside object
// - count how many tweets
function init () {

}

// getCurrentData
// - returns data blob
//   - total tweets
//   - list of tweets
function getCurrentData() {
    var count = 0;

    return { count: count };
}
// stop

// Print Trump-related tweets to the console
function trumpStream() {
    var magaStream = T.stream('statuses/filter',
        { track: '#makeamericagreatagain' }
    );
    var magaCount = 0;

    magaStream.on('tweet', function (tweet) {
        magaCount++;
        console.log(tweet.text);
        console.log("that's " + magaCount + " tweets now.");
    });
}

module.exports.trumpStream = { init : init,
                     getCurrentData : getCurrentData };
