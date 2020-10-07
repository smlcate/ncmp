var express = require('express');
var app = express();
var knex = require('../db/knex');
var bodyParser = require('body-parser');

var bcrypt = require('bcrypt');
var crypto = require('crypto');

exports.signUp = function(req, res, next) {

  console.log("sMAck");

  console.log(req.body);
  var auth = req.body.auth;

  var user = {
    email:auth.email
  }

  const saltRounds = 10;
  const plainTextPassword = auth.password;

  bcrypt.genSalt(saltRounds, function(err, salt) {
    bcrypt.hash(plainTextPassword, salt, function(err, hash) {
      // Store hash in your password DB.
      user.hashed_passcode = hash;
      knex('people')
      .insert(user)
      .then(function(){
        user = {
          email: auth.email,
          membership: null
        }
        res.send(user);
      })
      .catch(function(err) {
        console.log(err);
      })

    });
  });




}

exports.signIn = function(req, res, next) {

  var auth = req.body.auth;
  var login;
  knex('people')
  .select('*')
  .where({email:auth.email})
  .then(function(data) {
    console.log('data', data);
    console.log('auth',auth);
    if (data.length == 0) {
      res.send({success:false, message:'Account does not exist'})
    } else {

      bcrypt.compare(auth.password, data[0].hashed_passcode, function(err, acc) {
        if (err) {
          console.log(err);
          res.send(err);
        } else if(acc) {
          console.log(res);
          if (acc === true) {

            user = {
              email: data[0].email,
              membership: data[0].membership,
              id:data[0].id
            }
            res.send(user)

          } else {
            res.send(acc)
          }
        } else {
          // response is OutgoingMessage object that server response http request
          res.send({success: false, message: 'passwords do not match'});
        }
      });

    }
    // res.send(login)
    // bcrypt.compare(auth.password,data.hashed_passcode,function(err, res) {
    //   // res.send(rec);
    //   // console.log(res);
    //   if (err) {
    //     console.log(err);
    //     res.send(err)
    //   } else if(res) {
    //     console.log(res);
    //     res.send(res)
    //   } else {
    //     // response is OutgoingMessage object that server response http request
    //     return res.send({success: false, message: 'passwords do not match'});
    //   }
    // })

  })
  // .then(function() {
  //   res.send(login);
  //
  // })

}
exports.getUsers = function(req, res, next) {
  console.log(req.body);
  knex('people')
  .select('*')
  .then(function(data) {
    console.log(data);
    var list = [];
    for (var i = 0; i < data.length; i++) {
      list.push(data[i]);
      // if (data[i].membership != null) {
      //   data[i].hashed_passcode = 'not displayed'
      //   list.push(data[i])
      // }
    }
    res.send(list)
  })
}
