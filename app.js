/*
----------------------------------------------------
Change Pub DAte input types to date inputs
When saving the date times colons cant be used to those
 will need to be add in the string by hard code.
----------------------------------------------------
*/


//Module dependencies.
var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var http = require('http');
var path = require('path');
var mongoose = require('mongoose');


// all environments
app.set('port', process.env.PORT || 3000);
app.set('views', './views');
app.set('view engine', 'ejs');
app.use(express.static(path.join(__dirname, 'public')));

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use('/', require('./routes/home'));
app.use('/createChannel', require('./routes/createChannel'));
app.use('/addEpisode', require('./routes/addepisode'));
app.use('/generateFeed', require('./routes/generateFeed'));

//Models
var Episode = require('./models/episode');



//Connect to Local Database
if(mongoose.connect('mongodb://localhost/rssfeed')){
    console.log('Connected to Local Database');
}
else
    console.log('Could not connect to Local Database');



app.listen(3000);
console.log('API is on Port 3000');
