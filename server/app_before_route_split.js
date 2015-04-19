var express = require('express'),
    mongoose = require('mongoose'),
    bodyParser = require('body-parser')

var db = mongoose.connect('mongodb://localhost/bookApi');

var Book = require('./models/bookModel');
var Athlete = require('./models/athleteModel');


var app = express();

var port = process.env.PORT || 3000;

app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());


var router = express.Router();

router.route('/books')
    .get(function(req,res){
        Book.Book.find(function(err, books){
           if(err){
           console.log(err)
           } else{
               res.json(books);
           }
        });
    })
    .post(function(req,res){
        var book = new Book.Book(req.body);
        book.save();
        res.status(201).send(book);
    });

router.route('/athlete')
    .get(function(req,res){
        Athlete.Athlete.find(function(err, athletes){
           if(err){
           console.log(err)
           } else{
               res.json(athletes);
           }
        });
    })
    .post(function(req,res){
        var athlete = new Athlete.Athlete(req.body);
        athlete.save();
        res.status(201).send(athlete);
    });


app.use('/api', router);

app.get('/', function(req, res){
    res.send('api thi hoes');
});

app.listen(port, function(){
    console.log('Running on PORT:' + port);
});

