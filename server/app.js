var express = require('express'),
    mongoose = require('mongoose'),
    bodyParser = require('body-parser');


var db = mongoose.connect('mongodb://localhost/bookApi');

var Athlete = require('./models/athleteModel');
var Event = require('./models/eventModel');

var app = express();

var port = process.env.PORT || 3000;

app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());

athleteRouter = require('./Routes/athleteRoutes')(Athlete);
eventRouter = require('./Routes/eventRoutes')(Event);


app.use('/api/athlete', athleteRouter); 
app.use('/api/event', eventRouter); 



app.get('/', function(req, res){
    res.send('welcome to my API!');
});

app.listen(port, function(){
    console.log('Gulp is running my app on  PORT: ' + port);
});