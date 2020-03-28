var express = require('express');
var app = express();
var knex = require('../db/knex');
var bodyParser = require('body-parser');

exports.getMembers = function(req, res, next) {

  knex('people')
  .select('*')
  .then(function(data) {
    console.log(data);
    res.send(data)
  })
  .catch(function(err) {
    console.log(err);
  })

}
