require('dotenv').config();
var express = require('express');
var app = express();
var knex = require('../db/knex');
var bodyParser = require('body-parser');

var stripe = require('stripe')(process.env.STRIPE_API_KEY)
exports.buyMembership = function(req, res, next) {
  
  console.log(req.body);
  var token = req.body.token;
  var member = req.body.member;
  var user = req.body.user;
  
  // var token = stripe.tokens.create(info);

  
  console.log(token);
  // 
  stripe.charges.create({
    amount: 2000,
    currency: "usd",
    source: 'tok_visa', // obtained with Stripe.js
    description: "example charge for memberships"
  }, function(err, charge) {
    // asynchronously called
    if (err) {
      
      console.log(err);
      res.send(err);
      
    } else if(charge) {
      
      console.log(charge);
      knex('people')
      .where({email:user.email})
      .update({membership:member})
      .then(function() {
        knex('people')
        .select('*')
        .where({email:user.email})
        .then(function(data) {
          res.send({res:'success',user:data});
          console.log(data);
        })
      })
      .catch(function(err) {
        console.log(err);
      })
      
      
    }
  });
  
}
