var express = require('express');

var routes = function(Event){
    var eventRouter = express.Router();

var eventController = require('../Controllers/eventController')(Event);
    eventRouter.route('/')
        .post(eventController.post)
        .get(eventController.get);

    eventRouter.use('/:eventId', function(req,res,next){
        Event.findById(req.params.eventId, function(err,event){
            if(err)
                res.status(500).send(err);
            else if(event)
            {
                req.event = event;
                next();
            }
            else
            {
                res.status(404).send('no event found');
            }
        });
    });
    eventRouter.route('/:eventId')
        .get(function(req,res){

            res.json(req.event);

        })
        .put(function(req,res){
            req.event.name = req.body.name;
            req.event.date = req.body.date;
            
            req.event.activities =req.body.activities;
            req.event.save(function(err){
                if(err)
                    res.status(500).send(err);
                else{
                    res.json(req.event);
                }
            });
        })
        .patch(function(req,res){
            if(req.body._id)
                delete req.body._id;

            for(var p in req.body)
            {
                req.event[p] = req.body[p];
            }

            req.event.save(function(err){
                if(err)
                    res.status(500).send(err);
                else{
                    res.json(req.event);
                }
            });
        })
        .delete(function(req,res){
            req.event.remove(function(err){
                if(err)
                    res.status(500).send(err);
                else{
                    res.status(204).send('Removed');
                }
            });
        });
    return eventRouter;
};

module.exports = routes;