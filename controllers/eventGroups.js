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

exports.addEventGroup = function(req, res, next) {

  console.log(req.body);
  knex('event_groups')
  .insert({
    name:req.body[0].name,
    description:req.body[0].description,
    color:req.body[0].color
  })
  .then(function() {
    return knex('event_groups')
    .select('id')
    .where({name:req.body[0].name})
    .then(function(data) {
      res.send(data);
    })
  })


}
