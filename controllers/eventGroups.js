require('dotenv').config();
var express = require('express');
var app = express();
var knex = require('../db/knex');
var bodyParser = require('body-parser');

exports.getAllEventGroups = function(req, res, next) {

  knex('event_groups')
  .select('*')
  .then(function(data) {
    console.log(data);
    res.send(data);
  })
  .catch(function(err) {
    console.log(err);
    res.send(err);
  })

}

exports.getEventGroups = function(req, res, next) {

  knex('event_groups')
  .select('*')
  .where({id:req.body.id})
  .then(function(data) {
    console.log(data);
    res.send(data);
  })
  .catch(function(err) {
    console.log(err);
    res.send(err);
  })

}
