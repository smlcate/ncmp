require('dotenv').config();
var express = require('express');
var app = express();
var knex = require('../db/knex');
var bodyParser = require('body-parser');

exports.getImages = function(req, res, next) {

  knex('images')
  .select('*')
  .then(function(data) {
    res.send(data);
  })
  .catch(function(err) {
    res.send(err);
  })

}
exports.uploadImage = function(req, res, next) {

  var i = {
    dataURL: req.body.data
  }

  knex('images')
  .insert(i)
  .then(function(data) {
    res.send('success')
  })
  .catch(function(err) {
    res.send(err)
  })


}
