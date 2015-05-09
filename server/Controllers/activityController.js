var activityController = function(Activity){

    var post = function(req, res){
        var activity = new Activity(req.body);

        if(!req.body.name){
            res.status(400);
            res.send('Title is required');
        }
        else {
            activity.save();
            res.status(201);
            res.send(activity);
        }
    }

    var get = function(req,res){
        var query = {};

        Activity.find(query, function(err,activities){
            if(err)
                res.status(500).send(err);
            else
                res.json(activities);
        });
    }

    return {
        post: post,
        get:get
    }
}

module.exports = activityController;