require('dotenv').config();
var express = require('express');
var app = express();
var knex = require('../db/knex');
var bodyParser = require('body-parser');

var stripe = require('stripe')('sk_test_qU6GDXGLTMU9nhpJPF982Ksb')

exports.saveEventRegistry = function(req, res, next) {
  console.log(req.body);

  console.log(req.body.registry);
  // req.body.registry.passes = req.body.passes;

  knex('eventRegistry')
  .where({series_id:req.body.series.id})
  .select('*')
  .then(function(data) {
    if (data.length > 0) {
      knex('eventRegistry')
      .where({series_id:req.body.series.id})
      .update({registry_data:req.body.registry})
      .then(function() {
        res.send('success')
      })
      .catch(function(err) {
        console.log(err);
      })
    } else {
      knex('eventRegistry')
      .insert({
        series_id:req.body.series.id,
        registry_data:req.body.registry
      })
      .then(function() {
        res.send('success')
      })
      .catch(function(err) {
        console.log(err);
      })
    }
  })

}

exports.getEventEntryLists = function(req, res, next) {
  knex('entry_list')
  .select('*')
  .then(function(data) {
    console.log(data);
    res.send(data)
  })
}

exports.getMainEventRegistration = function(req, res, next) {
  knex('eventRegistry')
  .select('*')
  .then(function(data) {
    // console.log(data);
    res.send(data);
    // for (var i = 0; i < data.length; i++) {
    //   console.log('HIT',data[i]);
    //   if (data[i].registry_data.main_registration == true) {
    //     console.log('here',data[i]);
    //
    //     res.send(data[i]);
    //
    //   }
    // }
  })
  .catch(function(err) {
    console.log(err);
  })
}
exports.getEventRegistration = function(req, res, next) {
  console.log(req.body);
  knex('eventRegistry')
  .where({series_id:req.body.seriesId})
  .select('*')
  .then(function(data) {
    console.log(data);
    res.send(data[0])
  })
  .catch(function(err) {
    console.log(err);
  })
}
exports.addEntryLists = function(req, res, next) {
  console.log(req.body);

  var i = 0;

  function addList() {

    console.log('hit1');

    knex('entry_list')
    .insert({
      event_id:req.body.eventIds[i],
      entries:req.body.objectString
    })
    .then(function() {
      if (i+1 === req.body.eventIds.length) {
        res.send('success')
      } else {
        i++
        checkEntryList();
      }
    })
    .catch(function(err) {
      console.log(err);
    })

  }


  function checkEntryList() {

    knex('entry_list')
    .where({event_id:req.body.eventIds[i]})
    .select('*')
    .then(function(data) {
      if (data.length === 0) {
        addList();
      } else {
        console.log('hit2');
        if (i+1 === req.body.eventIds.length) {
          res.send('success')
        } else {
          i++
          checkEntryList();
        }
      }
    })

  }

  checkEntryList()


  // res.send('success')
}
// exports.getEntryList = function(req, res, next) {
//
//   knex('entry_list')
//   .where({})
//
// }
exports.buyRegistration = function(req, res, next) {

  console.log(req.body);

  var token = req.body.token;
  var member = req.body.member;
  var price = req.body.price*100;
  // var token = stripe.tokens.create(info);


  console.log(token);
  //
  stripe.charges.create({
    amount: price,
    currency: "usd",
    source: 'tok_visa', // obtained with Stripe.js
    description: "example charge for memberships"
  }, function(err, charge) {
    // asynchronously called
    if (err) {

      console.log(err);
      res.send(err);

    } else if(charge) {

      knex('entry_list')
      .select('*')
      .where({event_id:req.body.eventId})
      .then(function(data) {
        console.log('DATA:::',data);
        var driverData = req.body.data;
        var list = JSON.parse(data[0].entries)
        console.log('Driver Data::::', driverData);
        console.log('LIST::::::', list)
        console.log('DRIVERS::::::',driverData.drivers);
        console.log('CLASSES:::::::',driverData.classes);
        if (list.passes) {

        } else {
          list.passes = [];
        }
        for (var i = 0; i < driverData.drivers.length; i++) {
          for (var j = 0; j < driverData.drivers[i].classes.length; j++) {
            for (var k = 0; k < list.classes.length; k++) {
              console.log(list.classes);
              console.log(list.classes[k].name);
              console.log(driverData.classes[i]);
              if (list.classes[k].name == driverData.drivers[i].classes[j].name) {
                console.log(driverData.drivers[i].classes[j]);
                list.classes[k].list.push({
                  member_id: driverData.membership.id,
                  name: driverData.drivers[i].name,
                  transponder: driverData.drivers[i].classes[j].transponder,
                  number: driverData.drivers[i].classes[j].number
                })

                if (i+1 == driverData.drivers.length && j+1 == driverData.drivers[i].classes.length) {
                  var mem = driverData.membership;
                  console.log(mem);
                  // mem.id = list.members.length+1
                  list.members.push(mem)
                  for (var l = 0; l < driverData.options.length; l++) {
                    var opt = driverData.options[l];
                    opt.member_id = list.members.length
                    for (var m = 0; m < list.options.length; m++) {
                      if (list.options[m].name == driverData.options[l].name) {
                        list.options[m].list.push(opt)
                      }
                    }
                  }
                  list.passes.push({
                    order:driverData.passes,
                    member_id:mem.id
                  })
                  // list.passes = [];
                  console.log('hit2');
                  knex('entry_list')
                  .where({event_id:req.body.eventId})
                  .update({
                    entries:JSON.stringify(list)
                  })
                  .then(function() {
                    res.send('success')
                  })
                  .catch(function(err) {
                    console.log(err);
                    res.send(err)
                  })
                }
              }
            }
          }
        }
        console.log(driverData);
        console.log('NEW LIST::::',list);
      })
      .catch(function(err) {
        console.log(err);
      })

    }
  });

  // res.send('success')

}
