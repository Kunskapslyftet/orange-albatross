var express = require('express');

var routes = function(Activity){
    var activityRouter = express.Router();

    var activityController = require('../Controllers/activityController')(Activity);
    activityRouter.route('/')
        .post(activityController.post)
        .get(activityController.get);
    
    activityRouter.use('/:activityId', function(req,res,next){
        Activity.findById(req.params.activityId, function(err,activity){
            if(err)
                res.status(500).send(err);
            else if(activity)
            {
                req.activity = activity;
                next();
            }
            else
            {
                res.status(404).send('no activity found');
            }
        });
    });
    activityRouter.route('/:activityId')
        .get(function(req,res){

            res.json(req.activity);

        })
        .put(function(req,res){
            req.activity.title = req.body.title;
            req.activity.author = req.body.author;
            req.activity.genre = req.body.genre;
            req.activity.read = req.body.read;
            req.activity.save(function(err){
                if(err)
                    res.status(500).send(err);
                else{
                    res.json(req.activity);
                }
            });
        })
        .patch(function(req,res){
            if(req.body._id)
                delete req.body._id;

            for(var p in req.body)
            {
                req.activity[p] = req.body[p];
            }

            req.activity.save(function(err){
                if(err)
                    res.status(500).send(err);
                else{
                    res.json(req.activity);
                }
            });
        })
        .delete(function(req,res){
            req.activity.remove(function(err){
                if(err)
                    res.status(500).send(err);
                else{
                    res.status(204).send('Removed');
                }
            });
        });
    return activityRouter;
};

module.exports = routes;