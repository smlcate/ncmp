require('dotenv').config();
var express = require('express');
var app = express();
var knex = require('../db/knex');
var bodyParser = require('body-parser');

exports.getNews = function(req, res, next) {

  knex('news')
  .select('*')
  .then(function(data) {
    res.send(data)
  })

}
