var express = require('express');
var app = express();
var knex = require('../db/knex');
var bodyParser = require('body-parser');

exports.saveSchedules = function(req, res, send) {

  console.log(req.body);

  var newSchedules = JSON.stringify(req.body.schedules);

  knex('eventSchedule')
  .select('*')
  .then(function(data) {
    if (data.length > 0) {
      console.log('Found Data');
      knex('eventSchedule')
      .where({id:1})
      .update({
        schedule_data:newSchedules
      })
      .catch(function(err) {
        console.log(err);
        res.send(err);

      })
    } else {
      console.log('Didnt find data');
      knex('eventSchedule')
      .insert({
        schedule_data:newSchedules
      })
      .catch(function(err) {
        console.log(err);
        res.send(err);

      })
    }
  })
  .catch(function(err) {
    console.log(err);
    res.send(err);
  })

  res.send('success')

}
exports.getSchedules = function(req, res, send) {

  knex('eventSchedule')
  .select('*')
  .then(function(data) {
    res.send(data)
  })
  .catch(function(err) {
    console.log(err);
    res.send(err);
  })

}
