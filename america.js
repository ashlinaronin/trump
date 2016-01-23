var twitterController = require('./backend/twitterController.js');
twitterController.init();

// Set up server
var express = require('express');
var app = express();
app.use(express.static(__dirname + '/public'));


// Routes
app.get('/getTrumpCount', function(request, response) {
    response.send(twitterController.getCurrentData());
});

app.get('/america', function(request, response) {
    response.send({america:'good'});
});

app.get('food', function(request, response) {
    response.send({hungry:'yes'});
});

app.listen(5000, '127.0.0.1');
console.log('Server is running at 127.0.0.1:5000');
