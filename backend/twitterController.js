// Set up Twitter API
var Twit = require('twit');
var T = new Twit({
    consumer_key: 'ypDwXDgPm1go9bfJfiU4FB8mU',
    consumer_secret: 'rd0QOOApAj6tn9oFfIQxaN0whc6PhCc1LaX2EJqAEQAhqVszAb',
    access_token: '3378049754-T0zaIXAdw4biMPaHAU05tSvsYxXRWRolxUhcznE',
    access_token_secret: 'OKkoqUNQ9Cz04AkOZaJZ401ChmGO7D3tBUyrGPZ6XmFwq'
});

var count = 0;
var ids = [];


// init
// - turn on steam every 10 seconds
// - collect data inside object
// - count how many tweets
function init () {
    trumpStream();
}

// getCurrentData
// - returns data blob
//   - total tweets
//   - list of tweets
function getCurrentData() {

    return { count: count, ids: ids };
}
// stop

// Print Trump-related tweets to the console
function trumpStream() {
    var magaStream = T.stream('statuses/filter',
        { track: '#makeamericagreatagain' }
    );

    magaStream.on('tweet', function (tweet) {
        count++;
        console.log(tweet.text);
        // ids.push(tweet.id);
        ids.push(tweet.id_str);
    });
}

module.exports = { init : init,
                     getCurrentData : getCurrentData };
