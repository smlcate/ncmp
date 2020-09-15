require('dotenv').config();

// var pg = require('pg');

var express = require('express');
var app = express();
var knex = require('./db/knex');
var bodyParser = require('body-parser');

// var bcrypt = require('bcrypt');

var server = {
  events: require('./controllers/events.js'),
  event_groups: require('./controllers/eventGroups.js'),
  images: require('./controllers/images.js'),
  news: require('./controllers/news.js'),
  login: require('./controllers/login.js'),
  sponsors: require('./controllers/sponsors.js'),
  members: require('./controllers/members.js'),
  registry: require('./controllers/eventRegistries.js'),
  payments: require('./controllers/payments.js'),
  points: require('./controllers/points.js'),
  rules: require('./controllers/rules.js'),


}


app.use(express.static('public'));
app.use(bodyParser.json({limit:1024*1024*20, type:'application/json'}));

app.get('/getData', server.events.getData)
app.post('/addEvents', server.events.addEvents)
app.post('/deleteEvent', server.events.deleteEvent)
app.post('/editEventsBySeries', server.events.editEventsBySeries)
app.post('/editEvent', server.events.editEvent)
app.post('/removeAllEvents', server.events.removeAllEvents)


app.post('/uploadImage', server.images.uploadImage)
app.get('/getImages', server.images.getImages)
app.post('/getImage', server.images.getImage)

app.get('/getNews', server.news.getNews)
app.post('/saveNews', server.news.saveNews)

app.post('/saveRuleLists', server.rules.saveRuleLists)
app.get('/getRules', server.rules.getRules)

app.get('/getAllEventGroups', server.event_groups.getAllEventGroups)
app.post('/getEventGroups', server.event_groups.getEventGroups)
app.post('/getEventGroup', server.event_groups.getEventGroup)
app.post('/addEventGroup', server.event_groups.addEventGroup)
app.post('/editEventGroup', server.event_groups.editEventGroup)
app.post('/deleteEventGroup', server.event_groups.deleteEventGroup)
app.post('/removeAllGroups', server.event_groups.removeAllGroups)


app.post('/saveEventRegistry', server.registry.saveEventRegistry)
app.post('/getEventRegistration', server.registry.getEventRegistration)
app.post('/addEntryLists', server.registry.addEntryLists)
app.post('/buyRegistration', server.registry.buyRegistration)
app.get('/getEventEntryLists', server.registry.getEventEntryLists)
app.get('/getMainEventRegistration', server.registry.getMainEventRegistration)


app.post('/updatePoints', server.points.updatePoints)
app.get('/getPoints', server.points.getPoints)


app.get('/getSponsors', server.sponsors.getSponsors)
app.post('/addSponsor', server.sponsors.addSponsor)

app.get('/getMembers', server.members.getMembers)


app.post('/signUp', server.login.signUp)
app.post('/signIn', server.login.signIn)
app.get('/getUsers', server.login.getUsers)



app.post('/buyMembership', server.payments.buyMembership)




app.set('port', process.env.PORT || 3000);
app.listen(app.get('port'), function() {
  console.log('Express server listening on port ' + app.get('port'));
});
