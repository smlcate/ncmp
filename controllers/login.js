var express = require('express');
var app = express();
var knex = require('../db/knex');
var bodyParser = require('body-parser');

// var bcrypt = require('bcrypt');
var crypto = require('crypto');

exports.signUp = function(req, res, next) {

  // var auth = req.body.auth;
  //
  // const saltRounds = 10;
  // const plainTextPassword = auth.password;
  //
  // bcrypt.genSalt(saltRounds, function(err, salt) {
  //     bcrypt.hash(plainTextPassword, salt, function(err, hash) {
  //         // Store hash in your password DB.
  //         res.send(hash);
  //
  //     });
  // });


}
