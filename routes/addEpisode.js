//Dependencies
var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');

//Models
var Channel = require('../models/channel');

router.get('/', function (req, res, next) {
    res.render('addEpisode');
});

router.post('/', function (req, res, next) {

    //Getting Channel Object

    var channel = Channel.where({ title : req.body.channelTitle });

    channel.findOne(function(err, channel){
        if(channel){

            //Creatting Object to Push
            var newEpisode = {
                title : req.body.title,
                description : req.body.description,
                author :  req.body.author,
                fileUrl : req.body.fileUrl,
                fileSize : req.body.fileSize,
                pubDate: req.body.pubDate
            };
            
            //Push into Array
            var episodedUpdated = channel.episodes;
            episodedUpdated.push(newEpisode);

            //Updating Array
            if(channel.update({ $set: { episodes: episodedUpdated } }).exec()){
                console.log('Updated');
                res.render('index');
            }
        }
        else console.log(err);
    });

    


});

module.exports = router;