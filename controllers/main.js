require('dotenv').config();
var express = require('express');
var app = express();
var knex = require('../db/knex');
var bodyParser = require('body-parser');

exports.getData = function(req, res, next) {
  console.log('hit');
  res.send('hellooooo')
}
