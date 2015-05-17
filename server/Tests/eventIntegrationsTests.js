/// <reference path="../../typings/mocha/mocha.d.ts"/>
var should = require('should'),
	request = require('supertest'),
	app = require('../app.js'),
	mongoose = require('mongoose'),
	Event = mongoose.model('Event'),
	agent = request.agent(app);


	describe('Event crud tests ', function(){
		var eventId;
		it('Should allow a event to be created and return a _id', function(done){
			var eventPost = { name:'Påskuppvisning 2018', date:'2018-01-01', activities :['553d27e43d1a2c3415ef593e'] };
						
			agent.post('/api/event')
				.send(eventPost)
				.expect(200)
				.end(function(err, results){
					results.body.should.have.property('_id');
					eventId = results.body._id;
					done();
				});
		});
		
		it('event should be able to be created with activity', function (done) {
			
			//create activity
			var activityPost = {name:'Funkisfik', description:'Slänga käft i markan', location:'Sporthallen', event:eventId};
			agent.post('/api/activity')
				.send(activityPost)
				.end(function(err, results){
					activityId = results.body._id;
					activityId.should.be.a.String;

					results.body.event.should.equal(eventId);
					done();
				});
		});
		
		// it('should be populated with activity', function (done){
		// 	agent.get('/api/event/55353becf180cc9c132d7364')
		// 		.expect(200)
		// 		.end(function(err, results){
		// 			results.body.should.have.property('name', 'RM 3');
		// 			done();
		// 		});
		// });

		afterEach(function(done){
			Event.remove().exec();
			done();
		});
	});