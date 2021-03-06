require('dotenv').config();
var express = require('express');
var app = express();
var knex = require('../db/knex');
var bodyParser = require('body-parser');

exports.getData = function(req, res, next) {

  knex('events')
  .select('*')
  .orderBy('date')
  .then(function(data) {
    console.log(data);
    res.send(data);
  })
  .catch(function(err) {
    console.log(err)
  })

}

exports.addEvents = function(req, res, next) {

  console.log(req.body);
  console.log(req.body[0].events);

  for (var i = 0; i < req.body.length; i++) {

    // for (var j = 0; j < req.body[i].events.length; j++) {
    //   req.body[i].events[j].event_group_id = req.body[i].event_group_id;
    //
    // }


    knex('events')
    .insert(req.body[i].events)
    .then(function() {
      if (i+1 === req.body.length) {
        res.send('success');
      }
    })
    .catch(function(err) {
      console.log(err);
    })

  }



  // for (var i = 0; i < req.body.length; i++) {
  //
  //   var e = req.body[i].info;
  //
  //   e.image = JSON.stringify(req.body[i].image.id)
  //
  //   if (req.body[i].daysLength > 1) {
  //
  //     var j = 0
  //     var m = e.date.slice(5,-17);
  //     var d = e.date.slice(8,-14);
  //     var y = e.date.slice(0, -20);
  //
  //     function multipleEvents(e, b) {
  //
  //       var newE = e;
  //
  //       if (j === b.dayslength && i === req.body.length-1) {
  //         res.send('success');
  //       } else {
  //
  //         var nd = Number(d) + j;
  //
  //         console.log(m + '/' + nd + '/' + y);
  //         console.log(e);
  //         console.log(b);
  //
  //         newE.date = m + '/' + nd + '/' + y;
  //         j++;
  //
  //         knex('events')
  //         .insert(newE)
  //         .then(function() {
  //           multipleEvents(e, b);
  //         })
  //         .catch(function(err) {
  //           console.log(err);
  //         })
  //
  //       }
  //
  //     }
  //
  //     multipleEvents(e, req.body[i])

      // knex('events')
      // .insert(e)
      // .then(function() {
      //   if (i === req.body.length) {
      //     res.send('success')
      //   }
      // })
      // .catch(function(err) {
      //   console.log(err);
      // })
  //   }
  //
  // }

  }

  exports.deleteEvent = function(req, res, next) {

    console.log(req.body);

    for (var i = 0; i < req.body.length; i++) {

      knex('events')
      .where({id:req.body[i].id})
      .delete()
      .then(function() {

      })
      .catch(function(err) {
        res.send(err);
      })

      res.send('success');
    }

  }
  exports.removeAllEvents = function(req, res, next) {
    knex('events')
    .truncate()
    .then(function() {
      res.send('success')
    })
    .catch(function(err) {
      console.log(err);
    })

}
  exports.editEventsBySeries = function(req, res, next) {
    knex('events')
    .where({event_group_id:req.body.series.id})
    .update({
      color: req.body.color,
      description: req.body.description,
      image: req.body.image
    })
    .then(function() {
      res.send('success')
    })
    .catch(function(err) {
      console.log(err);
    })
  }

  exports.editEvent = function(req, res, next) {
    console.log('BODY',req.body);
    // var newEvent = {
    //   name: req.body.name,
    //   description: req.body.description,
    //   date: req.body
    // }
    var i = 0;
    var evs = req.body.events;
    var id = req.body.id;
    function update() {

      thisId = id + i;
      console.log(id);
      // console.log(req.body.eventLength);
      console.log(evs[i].date);
      if (req.body.type == 'news') {
        id = evs[i].id
        knex('events')
        .where({id:id})
        .update({
          display_date:evs[i].display_date,
          date:evs[i].date,
          // display_start:evs[i].display_start,
          start:evs[i].start

        })
        .then(function() {
          if (req.body.events.length-1 == i) {
            res.send('success')
          } else {
            i++;
            update();
          }
        })
      } else {

        knex('events')
        .where({id:thisId})
        .update({
          name:evs[i].name,
          date:evs[i].date,
          display_date:evs[i].display_date,
          event_key:evs[i].event_key
        })
        .then(function() {
          i++;
          if (req.body.events.length === i) {
            console.log('success');
            res.send('success')
          } else {
            update();
          }
        })
        .catch(function(err) {
          console.log(err);
          res.send(err)
        })

      }


    }
    update();


  }
