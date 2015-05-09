/// <reference path="../typings/node/node.d.ts"/>
var express = require('express'),
    mongoose = require('mongoose'),
    bodyParser = require('body-parser');


//var db = mongoose.connect('mongodb://localhost/bookApi');
var db;
if(process.env.ENV === 'Test'){
	db = mongoose.connect('mongodb://localhost/bookApi');
} else {
    db = mongoose.connect('mongodb://localhost/bookApi');
	//db = mongoose.connect('mongodb://albatrossOne:Fritte123@ds033390.mongolab.com:33390/orangealbatross');
}

var Athlete = require('./models/athleteModel');
var Event = require('./models/eventModel');
var Activity = require('./models/activityModel');

var app = express();

var port = process.env.PORT || 3000;

app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());

athleteRouter = require('./Routes/athleteRoutes')(Athlete);
eventRouter = require('./Routes/eventRoutes')(Event);
activityRouter = require('./Routes/eventRoutes')(Activity);


app.use('/api/athlete', athleteRouter); 
app.use('/api/event', eventRouter); 
app.use('/api/activity', activityRouter); 

app.get('/', function(req, res){
    res.send('welcome to my API!');
});

app.listen(port, function(){
    console.log('Gulp is running my app on  PORT: ' + port);
});

module.exports = app;