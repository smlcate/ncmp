require('dotenv').config();
var express = require('express');
var app = express();
var knex = require('../db/knex');
var bodyParser = require('body-parser');

exports.getNews = function(req, res, next) {

  knex('news')
  .select('*')
  .then(function(data) {
    console.log(data);
    res.send(data)
  })

}
exports.saveNews = function(req, res, next) {
  console.log(req.body.news);
  // var art = req.body.news;
  var art = {
    title:req.body.news.title,
    article: req.body.news.article,
    set_type: {
      type: req.body.news.type,
      delayedUntil: req.body.news.delayedUntil,
      postponedUntil: req.body.news.postponedUntil,
      post_until:req.body.news.postUntil
    },
    posted_at: req.body.news.postedAt,
    event_id: req.body.news.selectedEvent.id,
    series_id: req.body.news.selectedSeries.id
  }
  if (req.body.news.type != 'normal') {
    art.set_type.color = req.body.news.selectedSeries.color;
  }
  art.set_type = JSON.stringify(art.set_type);
  knex('news')
  .insert(art)
  .then(function() {
    res.send('success')  
  })
  .catch(function(err) {
    console.log(err);
  })
}
