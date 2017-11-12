require('dotenv').config();

var pg = require('pg');

var express = require('express');
var app = express();
var knex = require('./db/knex');
var bodyParser = require('body-parser');

var bcrypt = require('bcrypt');

var server = {
  events: require('./controllers/events.js'),
  event_groups: require('./controllers/eventGroups.js'),
  images: require('./controllers/images.js'),
  news: require('./controllers/news.js'),
  login: require('./controllers/login.js')
}


app.use(express.static('public'));
app.use(bodyParser.json({limit:1024*1024*20, type:'application/json'}));

app.get('/getData', server.events.getData)

app.post('/uploadImage', server.images.uploadImage)
app.get('/getImages', server.images.getImages)
app.post('/getImage', server.images.getImage)

app.get('/getNews', server.news.getNews)

app.get('/getAllEventGroups', server.event_groups.getAllEventGroups)
app.post('/getEventGroups', server.event_groups.getEventGroups)

app.post('/signUp', server.login.signUp)

app.set('port', process.env.PORT || 3000);
app.listen(app.get('port'), function() {
  console.log('Express server listening on port ' + app.get('port'));
});
