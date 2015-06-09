
import {inject} from 'aurelia-framework';
import {HttpClient} from 'aurelia-http-client';


@inject(HttpClient)
export class Service {
	constructor(http) {
		this.http = http;
        this.url = 'http://localhost:8000/api/';
		
		this.http.configure(h => {
            h.withHeader('content-type', 'application/json');
        });
	}
//Events
	getEvents() {
		return new Promise( resolve => {
	       this.http.get(this.url + 'event','callback').then(response => {
		       resolve(response.content);
	     });
	  	});
  	}
	getEvent(id) {
		return new Promise( resolve => {
	       this.http.get(this.url + 'event','callback').then(response => {
		       resolve(response.content);
	     });
	  	});
  	}

	patchEvent(id, activity){
		return new Promise( resolve => {
	       this.http.patch(this.url + 'event/' + id, activity).then(response => {
		       resolve(response.content);
			});
		});
	}
	
//Activity
	postActivity(activity){
		return new Promise( resolve => {
	       this.http.post(this.url + 'activity/', activity).then(response => {
		       resolve(response.content);
			});
		});
	}

//Athlete
	postAthlete(athlete){
		return new Promise( resolve => {
	       this.http.post(this.url + 'athlete/', athlete).then(response => {
		       resolve(response.content);
			});
		});
	}

//Group
	getGroups() {
			return new Promise( resolve => {
		       this.http.get(this.url + 'group','callback').then(response => {
			       resolve(response.content);
		     });
		  	});
	  	}

	getGroup(id) {
			return new Promise( resolve => {
		       this.http.get(this.url + 'group/' + id ,'callback').then(response => {
			       resolve(response.content);
		     });
		  	});
	  	}	  		
	postGroup(group){
		return new Promise( resolve => {
	       this.http.post(this.url + 'group/', group).then(response => {
		       resolve(response.content);
			});
		});
	}
putGroup(group){
		return new Promise( resolve => {
	       this.http.put(this.url + 'group/' + group._id, group).then(response => {
		       resolve(response.content);
			});
		});
	}
	removeAthleteFromGroup(groupId, athleteId){
		return new Promise( resolve => {
	       this.http.delete(this.url + 'group/' + groupId + '/athlete/' + athleteId).then(response => {
		       resolve(response.content);
			});
		});	
	}

	addAthleteGroup(groupId, athleteId){
		return new Promise( resolve => {
			       this.http.put(this.url + 'group/' + groupId + '/athlete/' + athleteId).then(response => {
				       resolve(response.content);
					});
				});	
	}
	
//Copy paste food from flightdelay	
	getDetails(id) {
	  	return new Promise( resolve => {
	       this.http.jsonp(this.url + 'details/' + id,'callback').then(response => {
		       resolve(response.content);
	     });
	  	});
  	}
	  

}