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
exports.getImage = function(req, res, next) {

  // console.log(req.body);

  knex('images')
  .select('dataURL')
  .where({id:req.body.id})
  .then(function(data) {
    // console.log(data);

    res.send(data);
  })
  .catch(function(err) {
    console.log(err);
  })

}
exports.uploadImage = function(req, res, next) {

    console.log(req.body.data);

    var i = {
      dataURL: req.body.data
    }


  knex('images')
  .insert(i)
  .then(function(data) {
    console.log('success');
    res.send('success')
  })
  .catch(function(err) {
    res.send(err)
  })


}
