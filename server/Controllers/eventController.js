var eventController = function(Event){

    var post = function(req, res){
        var event = new Event(req.body);

        if(!req.body.name){
            res.status(400);
            res.send('Name is required');
        }
        else {
            event.save();
            res.status(201);
            res.send(event);
        }
    };

    var get = function(req,res){

        var query = {};
  
        Event
            .find(query)
            .populate('activities')
            .populate('athletes')
            .exec(function (err, events) {
            if (err) 
                res.status(500).send(err);
            else
                res.json(events);
  
            });
    };

    return {
        post: post,
        get:get
    };
};

module.exports = eventController; 