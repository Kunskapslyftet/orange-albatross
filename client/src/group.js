import {inject} from 'aurelia-framework';
import  _  from 'lodash';
import {Service} from './service';


@inject(Service)
export class Activity {
  
  constructor(service){
    
    this.service = service;
    this._ = _;
    this.events = []; 
    this.name = "";
    this.description = "";
    this.date = null;
    this.time = null;
    this.selectedEvent = null;
    this.heading = 'Group';
  }

  activate() {
      this.service.getEvents().then(lotusNotes => {
        var sorted = _.sortBy(lotusNotes, 'date');
        this.events = sorted;
    });
  }
 create(){
  
  console.log(this.selectedEvent);
  
  var activity = {
    name: this.name,
    description: this.description,
    date: this.date,
    time: this.time,
    event: this.selectedEvent
   };
   
   this.service.postActivity(activity).then(results => {
     //console.log(results);
     var activityId = results._id;
     //Update event with this activity
     var activity = {activities:activityId};
     this.service.patchEvent(results.event, activity).then(x=> {
       console.log('gurka');
     });
   });
  }
  canDeactivate(){
    
  }
}