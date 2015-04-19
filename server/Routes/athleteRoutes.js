var express = require('express');

var routes = function(Athlete){
    var athleteRouter = express.Router();

    athleteRouter.route('/')
        .post(function(req, res){
            var athlete = new Athlete(req.body);

            athlete.save();
            res.status(201).send(athlete);

        })
        .get(function(req,res){

            var query = {};
            
            Athlete.find(query, function(err,athletes){
                if(err)
                    res.status(500).send(err);
                else
                    res.json(athletes);
            });
        });

    athleteRouter.use('/:athleteId', function(req,res,next){
        Athlete.findById(req.params.athleteId, function(err,athlete){
            if(err)
                res.status(500).send(err);
            else if(athlete)
            {
                req.athlete = athlete;
                next();
            }
            else
            {
                res.status(404).send('no athlete found');
            }
        });
    });
    athleteRouter.route('/:athleteId')
        .get(function(req,res){

            res.json(req.athlete);

        })
        .put(function(req,res){
            req.athlete.title = req.body.title;
            req.athlete.author = req.body.author;
            req.athlete.genre = req.body.genre;
            req.athlete.read = req.body.read;
            req.athlete.save(function(err){
                if(err)
                    res.status(500).send(err);
                else{
                    res.json(req.athlete);
                }
            });
        })
        .patch(function(req,res){
            if(req.body._id)
                delete req.body._id;

            for(var p in req.body)
            {
                req.athlete[p] = req.body[p];
            }

            req.athlete.save(function(err){
                if(err)
                    res.status(500).send(err);
                else{
                    res.json(req.athlete);
                }
            });
        })
        .delete(function(req,res){
            req.athlete.remove(function(err){
                if(err)
                    res.status(500).send(err);
                else{
                    res.status(204).send('Removed');
                }
            });
        });
    return athleteRouter;
};

module.exports = routes;