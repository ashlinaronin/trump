var express = require('express');
var app = express();

var counter = 0;


app.set('port', (process.env.PORT || 5000));
app.use(express.static(__dirname + '/public'));

app.get('/helloworld', function(request, response) {
  counter++;
  response.send('Hits: ' + counter);

});

app.listen(app.get('port'), function() {
  console.log('Node app is running on port', app.get('port'));
});
