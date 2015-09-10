var twitterController = require('./backend/twitterController.js');
twitterController.init();

// Set up server
var express = require('express');
var app = express();
app.set('port', (process.env.PORT || 5000));
app.use(express.static(__dirname + '/public'));


// Routes
app.get('/getTrumpCount', function(request, response) {
    response.send(twitterController.getCurrentData());
});

app.listen(app.get('port'), function() {
    console.log('Node app is running on port', app.get('port'));
});
