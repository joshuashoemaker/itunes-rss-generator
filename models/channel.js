var mongoose = require('mongoose');

var channel = mongoose.Schema({
    paswword: {type: String, require: true},
    email: {type: String, require: true},
    title: String,
    description: String,
    author: String,
    website: String,
    image: String,
    created: String,
    language: {type: String, default: 'en-us'},
    copywright: String,
    pubDate: String,
    episodes: [{
        title: {type: String, require: true, default: 'first'},
        description: {type: String, require: true,  default: 'first'},
        author: {type: String, require: true,  default: 'first'},
        fileUrl: {type: String, require: true,  default: 'first'},
        fileSize: {type: Number, require: true},
        pubDate: {type: String, require: true}
    }]
});

module.exports = mongoose.model("Channels", channel);