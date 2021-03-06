import {inject} from 'aurelia-framework';
import  _  from 'lodash';
import {Service} from './service';


@inject(Service)
export class Activity {
  
  constructor(service){
    this.heading = 'Create new athlete';
    this.service = service;
    this._ = _;
    this.groups = []; 
    
    this.name = "";
    this.description = "";
    this.selectedGroup = null;
    this.phones = [];
    this.emails = [];
    this.newPhone = null
    this.newEmail = null
  }

  activate() {
      this.service.getGroups().then(groups => {
        var sorted = _.sortBy(groups, 'name');
        this.groups = sorted;
    });
  }

  addPhone(){

    if(this.newPhone === null)
      return;

    if(this.newPhone === '')
      return;
   
      this.phones.push(this.newPhone);
      this.newPhone = null;
  }

  addEmail(){

    if(this.newEmail === null)
      return;


    if(this.newEmail === '')
      return;
   
      this.emails.push(this.newEmail);
      this.newEmail = null;
  }

  create(){
  
  console.log(this.selectedEvent);
  
  var athlete = {
    name: this.name,
    description: this.description,
    phones: this.phones,
    emails: this.emails,
    group: this.selectedGroup
   };
   
   this.service.postAthlete(athlete).then(results => {
     var athlete = results;
     console.log(results);
     this.service.addAthleteGroup(athlete.group, athlete._id).then(results => {
        console.log(results);
     });

   });
  };

  canDeactivate(){ }
}