var groupController = function(Group){

    var post = function(req, res){
        var group = new Group(req.body);

        if(!req.body.name){
            res.status(400);
            res.send('Title is required');
        }
        else {
            group.save();
            res.status(201);
            res.send(group);
        }
    }

    var get = function(req,res){
        var query = {};

        Group.find(query, function(err,groups){
            if(err)
                res.status(500).send(err);
            else
                res.json(groups);
        });
    }

    return {
        post: post,
        get:get
    }
}

module.exports = groupController;