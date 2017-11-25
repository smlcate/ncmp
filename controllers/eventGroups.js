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

  var name = req.body.name


  knex('event_groups')
  .insert({
    name:req.body.info.name,
    description:req.body.info.description,
    color:req.body.info.color,
    picture_ids: '['+req.body.image+']'
  })
  .then(function() {
    res.send('success');
  })
  .catch(function(err) {
    console.log(err);
  })


}

exports.getEventGroup = function(req, res, next) {

  console.log(req.body)

  knex('event_groups')
  .select('id')
  .where({name:req.body.info.name})
  .then(function(data) {
    res.send(data);
  })
  .catch(function(err) {
    console.log(err)
  })

}
