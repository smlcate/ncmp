require('dotenv').config();
var express = require('express');
var app = express();
var knex = require('../db/knex');
var bodyParser = require('body-parser');

exports.getScheduleControllers = function(req, res, next) {

  knex('scheduleController')
  .select('*')
  .then(function(data) {
    res.send(data);
  })
  .catch(function(err) {
    console.log(err);
    res.send(err);
  })

}
