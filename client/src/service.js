
import {inject} from 'aurelia-framework';
import {HttpClient} from 'aurelia-http-client';


@inject(HttpClient)
export class Service {
	constructor(http) {
		this.http = http;
        this.url = 'http://localhost:8000/api/';
	}

	getEvents() {
		return new Promise( resolve => {
	       this.http.get(this.url + 'event','callback').then(response => {
		       resolve(response.content);
	     });
	  	});
  	}
	
	getDetails(id) {
	  	return new Promise( resolve => {
	       this.http.jsonp(this.url + 'details/' + id,'callback').then(response => {
		       resolve(response.content);
	     });
	  	});
  	}
}