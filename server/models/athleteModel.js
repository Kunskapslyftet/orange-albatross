var mongoose = require('mongoose'),
    Schema = mongoose.Schema();

var athleteModel = new mongoose.Schema({
    name:String,
    emails:[String],
	phones:[String],
    genre:{type:String},
    activities:[{type: mongoose.Schema.Types.ObjectId, ref: 'Activity'}],
    group: {type: mongoose.Schema.Types.ObjectId, ref: 'Group'}
});

module.exports =  mongoose.model('Athlete', athleteModel);

