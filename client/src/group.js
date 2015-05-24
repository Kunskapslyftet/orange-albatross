import {inject} from 'aurelia-framework';
import  _  from 'lodash';
import {Service} from './service';
import {Router} from 'aurelia-router';

@inject(Service, Router)
export class Activity {
  
  constructor(service, router){
    
    this.router = router;
    this.service = service;
    this._ = _;
    this.heading = 'Group';
    this.group = null;
  }

  activate(parameter) {
    var self = this;
   self.service.getGroup(parameter.id).then(group => {
    console.log(group);
         self.group = group;
        });
  }

  removeAthlete(athleteId){
    var self = this;
    console.log(athleteId, this.group._id);
     this.service.removeAthleteFromGroup(self.group._id, athleteId).then(results => {

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