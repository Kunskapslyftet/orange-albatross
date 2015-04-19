var mongoose = require('mongoose'),
    Schema = mongoose.Schema();

var athleteModel = new mongoose.Schema({
    name:String,
    emails:[String],
	phones:[String],
    genre:{type:String},
    //events:[{type: mongoose.Schema.Types.ObjectId, ref: 'Activity'}]
});

module.exports =  mongoose.model('Athlete', athleteModel);

