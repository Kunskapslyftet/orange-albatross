var mongoose = require('mongoose'),
    Schema = mongoose.Schema();

var activityModel = new mongoose.Schema({
    _Id			: Number,
	name		: String,
	description : String,
	location	: String,
	date		: Date,
	time		: String,
	athletes	: [{type: mongoose.Schema.Types.ObjectId, ref: 'Athlete'}],
	event 		: {type: mongoose.Schema.Types.ObjectId, ref: 'Arr'}
});

module.exports =  mongoose.model('Activity', activityModel);



