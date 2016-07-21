//Dependencies
var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');
var urlEncodedParser = bodyParser.urlencoded({ extended: false });
var jsonParser = bodyParser.json();
var fs = require('fs');
var mongoose = require('mongoose');

//Models
var Channel = require('../models/channel');


router.get("/", function(req, res, next){
  res.render('createChannel');
});

router.post("/", function(req, res, next){
  var channel = new Channel();

  channel.title = req.body.channelTitle;
  channel.description = req.body.channelDescription;
  channel.author = req.body.authorName;
  channel.website = req.body.website;
  channel.image = req.body.imgLink;
  channel.pubDate = req.body.pubDate;
  channel.language = 'en-us';
  channel.copyright = req.body.copyright;
    channel.episodes = [{
      title : req.body.eptitle,
      description : req.body.epdescription,
      author : req.body.epauthor,
      fileUrl : req.body.epfileUrl,
      fileSize : req.body.epfileSize,
      pubDate : req.body.epPubDate
    }];



  channel.save(function(err, channel){
    if(err) {
      console.log(err);
    }
    else{
      console.log('saved');
      res.render('index');
    }
  });
});

module.exports = router;