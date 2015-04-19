var mongoose = require('mongoose'),
    Schema = mongoose.Schema();

var arrModel = new mongoose.Schema({
	_Id: Number,
    name:String,
    date:String,
    activities:[{type: mongoose.Schema.Types.ObjectId, ref: 'Activity'}]
});

var Arr = mongoose.model('Arr', arrModel);

var athleteModel = new mongoose.Schema({
    name:String,
    emails:[String],
	phones:[String],
    genre:{type:String},
    events:[{type: mongoose.Schema.Types.ObjectId, ref: 'Activity'}]
});

var Athlete = mongoose.model('Athlete', athleteModel);


var activityModel = new mongoose.Schema({
	_Id: Number,
	name		: String,
	description : String,
	location	: String,
	date		: Date,
	time		: String,
	athletes	: [{type: mongoose.Schema.Types.ObjectId, ref: 'Athlete'}],
	event 		: {type: mongoose.Schema.Types.ObjectId, ref: 'Arr'}
});

var Activity = mongoose.model('Activity', activityModel);

module.exports = {

	Arr: Arr,
	Athlete: Athlete,
	Activity: Activity

};