require('dotenv').config();
var express = require('express');
var app = express();
var knex = require('../db/knex');
var bodyParser = require('body-parser');

exports.getData = function(req, res, next) {

  knex('events')
  .select('*')
  .then(function(data) {
    // console.log(data);
    res.send(data);
  })
  .catch(function(err) {
    console.log(err)
  })

}
