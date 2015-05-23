var express = require('express');
var _ = require('lodash');

var routes = function (Group, Athlete) {
    var groupRouter = express.Router();

    var groupController = require('../Controllers/groupController')(Group);
    groupRouter.route('/')
        .post(groupController.post)
        .get(groupController.get);

    groupRouter.use('/:groupId', function (req, res, next) {
        Group.findById(req.params.groupId, function (err, group) {
            if (err)
                res.status(500).send(err);
            else if (group) {
                req.group = group;
                next();
            }
            else {
                res.status(404).send('no group found');
            }
        });
    });
    
     groupRouter.use('/:groupId/athlete/:athleteId', function (req, res, next) {
       Athlete.findById(req.params.athleteId, function(err,athlete){
            if (err)
                res.status(500).send(err);
            else if (athlete) {
                req.athlete = athlete;
                next();
            }
            else {
                res.status(404).send('no athlete found');
            }
       })
    });
    
     groupRouter.route('/:groupId/athlete/:athleteId')
        .delete(function (req, res) {
            //Remove athlete with athleteId from group with groupId
            //Remove group with groupId from athlete with athleteId
            req.athlete.group = null;
            //remove athleteId from group.athletes
           
           req.group.athletes.pull(req.params.athleteId);
                            req.group.save(function (err) {
                                if (err)
                                    res.status(500).send(err);
                                else {
                                    res.json(req.group);
                                }
                            });   
            
            //Save athlete
//             req.athlete.save()
//                    .then(function(err) {
//                        if(err.errors){
//                            //console.log('inside then', err);
//                            res.status(500).send();   
//                        }else{
//                            req.group.athletes.pull({ _id: req.params.athleteId });
//                            req.group.save(function (err) {
//                                if (err)
//                                    res.status(500).send(err);
//                                else {
//                                    res.json(req.group);
//                                }
//                            });                            
//                         }
//                    });
        })
        .post(function (req, res){
            //Add athlete with athleteId to group with groupId
            //Add group with groupId to athlete with athleteId. Overwriting existing group
        });
    
    groupRouter.route('/:groupId')
        .get(function (req, res) {
            res.json(req.group);
        })
        .put(function (req, res) {
            req.group.name = req.body.name;
            req.group.description = req.body.description;
            req.group.coach = req.body.coach;
            req.group.athletes = req.body.athletes;
            req.group.save(function (err) {
                if (err)
                    res.status(500).send(err);
                else {
                    res.json(req.group);
                }
            });
        })
        .patch(function (req, res) {
            if (req.body._id)
                delete req.body._id; 
    
            for (var p in req.body) {
                req.group[p] = req.body[p];
            }
    
            req.group.save(function (err) {
                if (err)
                    res.status(500).send(err);
                else {
                    res.json(req.group);
                }
            });
        })
        .delete(function (req, res) {
            req.group.remove(function (err) {
                if (err)
                    res.status(500).send(err);
                else {
                    res.status(204).send('Removed');
                }
            });
    });
    return groupRouter;
};

module.exports = routes;