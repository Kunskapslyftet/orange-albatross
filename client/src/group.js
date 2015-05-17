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
    this.coach = null;
    this.heading = 'Group';
  }

  activate() {
    var self = this;
      self.service.getEvents().then(lotusNotes => {
        var sorted = _.sortBy(lotusNotes, 'date');
        this.events = sorted;})
      .then(function(){
        self.service.getGroups().then(groups => {
          console.log(groups);
        });
    });
  }
 create(){
    console.log(this.selectedEvent);
    var group = {
      name: this.name,
      description: this.description,
      event: this.selectedEvent
   };
   
   this.service.postGroup(group).then(results => {
     //console.log(results);
     //var activityId = results._id;
     //Update event with this activity
     //var activity = {activities:activityId};
     //this.service.patchEvent(results.event, activity).then(x=> {
     //  console.log('gurka');
     //});
   });
 }
 
canDeactivate(){}

}