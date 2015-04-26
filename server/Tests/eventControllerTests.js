var shout = require('should'),
	sinon = require('sinon');


describe('Event Controller tests', function (){
	describe('Post', function(){
		it('should not allow an empty name on post', function(){

			//Mock event object with a save function, that does jack shit, which is fine
			var Event = function(Event){this.save = function (){}};

			var req = {
				body:{
					date: '2015-05-01'
				}
			}

			var res = {
				status: sinon.spy(),
				send: sinon.spy()
			}

			var eventController = require('../Controllers/eventController')(Event);
			eventController.post(req,res);

			//res.status.args[0][0] första 0an är vilket call i ordningen och andra vilket argument i ordnignen
			res.status.calledWith(400).should.equal(true,'bad status' + res.status.args[0][0]);
			res.send.calledWith('Name is required').should.equal(true);
		})
	})
})