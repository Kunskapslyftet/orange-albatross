var express = require('express');

var routes = function (Group) {
    var groupRouter = express.Router();

    var groupController = require('../Controllers/groupController')(Group);
    groupRouter.route('/')
        .post(groupController.post)
        .get(groupController.get);

    groupRouter.use('/:groupId', function (req, res, next) {
        Group.findById(req.params.activityId, function (err, group) {
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