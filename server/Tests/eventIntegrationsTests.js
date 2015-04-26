var should = require('should'),
	request = require('supertest'),
	app = require('../app.js'),
	mongoose = require('mongoose'),
	Event = mongoose.model('Event'),
	agent = request.agent(app);


	describe('Event crud tests ', function(){

		it('Should allow a event to be created and return a _id', function(done){
			var eventPost = { name:'Påskuppvisning 2018', date:'2018-01-01'};

			agent.post('/api/event')
				.send(eventPost)
				.expect(200)
				.end(function(err, results){
					results.body.should.have.property('_id');
					done();
				})
		})

		afterEach(function(done){
			Event.remove().exec();
			done();
		})
	});