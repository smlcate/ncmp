var express = require('express');
var app = express();
var knex = require('../db/knex');
var bodyParser = require('body-parser');

exports.getRules = function(req, res, next) {

  knex('rules')
  .select('*')
  .then(function(data) {
    console.log(data);
    res.send(data)
  })
  .catch(function(err) {
    console.log(err);
  })

}

exports.saveRuleLists = function(req, res, next) {

  knex('rules')
  .select('*')
  .then(function(data) {
    if (data.length) {
      knex('rules')
      .where({id:1})
      .update({
        ruleData:req.body.data
      })
      .then(function() {
        console.log('updated');
        res.send('success');
      })
      .catch(function(err) {
        console.log(err);
      })
    } else {
      knex('rules')
      .insert({
        ruleData:req.body.data
      })
      .then(function() {
        console.log('created new');
        res.send('success')
      })
      .catch(function(err) {
        console.log(err);
      })
    }
  })



}
