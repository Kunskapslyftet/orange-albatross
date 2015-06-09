var mongoose = require('mongoose'),
    Schema = mongoose.Schema();


var eventModel = new mongoose.Schema({
	_Id: Number,
    name:String,
    date:String,
	activities:[{type: mongoose.Schema.Types.ObjectId, ref: 'Activity'}]
});

module.exports =  mongoose.model('Event', eventModel);

