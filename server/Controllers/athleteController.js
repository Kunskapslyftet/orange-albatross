var athleteController = function(Athlete){

    var post = function(req, res){
        var athlete = new Athlete(req.body);

        if(!req.body.name){
            res.status(400);
            res.send('Name is required');
        }
        else {
            athlete.save();
            res.status(201);
            res.send(athlete);
        }
    };

    var get = function(req,res){

        var query = {};
       
        Athlete.find(query, function(err,athletes){
            if(err)
                res.status(500).send(err);
            else
                res.json(athletes);
        });
    };

    return {
        post: post,
        get:get
    };
};

module.exports = athleteController;