var express     = require('express');
var app         = express();
var http        = require('http').Server(app);
var bodyParser  = require('body-parser');

//const routeS3 = require('./controllers/s3/routeS3');
const csv = require('./controllers/csv');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
var port = 8080

app.get('/', function(req, res) {
  res.send('Hello! The API is at http://localhost:' + port + '/api');
});

//app.use('/imagenes', routeS3);
app.use('/csv', csv);
 
// Start the server
app.listen(port);