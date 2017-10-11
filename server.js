require('dotenv').config();

var pg = require('pg');

var express = require('express');
var app = express();
var knex = require('./db/knex');
var bodyParser = require('body-parser');

var server = {
  events: require('./controllers/events.js')
}


app.use(express.static('public'));
app.use(bodyParser.json());

app.get('/getData', server.events.getData)


app.set('port', process.env.PORT || 3000);
app.listen(app.get('port'), function() {
  console.log('Express server listening on port ' + app.get('port'));
});
