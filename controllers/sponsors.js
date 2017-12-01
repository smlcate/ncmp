require('dotenv').config();
var express = require('express');
var app = express();
var knex = require('../db/knex');
var bodyParser = require('body-parser');

exports.getSponsors = function(req, res, send) {
  
  knex('sponsors')
  .select('*')
  .then(function(data) {
    console.log(data);
    res.send(data);
  })
  .catch(function(err) {
    res.send(err);
  })
  
}
exports.addSponsor = function(req, res, send) {
  console.log(req.body);
  knex('sponsors')
  .insert(req.body)
  .then(function() {
    res.send('success');
  })
  .catch(function(err) {
    res.send(err);
  })
  
} 
