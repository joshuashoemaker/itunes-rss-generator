var mongoose = require('mongoose');

var episode = mongoose.Schema({
    channelTitle: {type: String, require: true},
    title: {type: String, require: true},
    description: {type: String, require: true},
    author: {type: String, require: true},
    fileUrl: {type: String, require: true}
});

module.exports = mongoose.model("Episodes", episode);