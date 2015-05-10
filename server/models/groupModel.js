var mongoose = require('mongoose'),
    Schema = mongoose.Schema();


var groupModel = new mongoose.Schema({
    name:String,
    description:String,
	coach:String,
    athletes:[{type: mongoose.Schema.Types.ObjectId, ref: 'Athlete'}]
});

module.exports =  mongoose.model('Group', groupModel);

