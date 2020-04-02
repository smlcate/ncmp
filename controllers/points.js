require('dotenv').config();
var express = require('express');
var app = express();
var knex = require('../db/knex');
var bodyParser = require('body-parser');

exports.updatePoints = function(req, res, next) {

  console.log(req.body);
  knex('kra_points')
  .select('*')
  .then(function(data) {
    if (data.length === 0) {
      knex('kra_points')
      .insert({results:req.body.data})
      .then(function() {
        res.send('success')
      })
    } else {
      knex('kra_points')
      .where({id:data.length})
      .update({results:req.body.data})
      .then(function() {
        res.send('success')
      })
    }
  })

}

exports.getPoints = function(req, res, next) {

  console.log('hit');

  knex('kra_points')
  .select('*')
  .then(function(data) {
    res.send(data);
  })

}
