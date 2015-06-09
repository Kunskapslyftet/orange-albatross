import {inject} from 'aurelia-framework';
import  _  from 'lodash';
import {Service} from './service';


@inject(Service)
export class Home {
  
  constructor(service){
    
    this.service = service;
    this._ = _;
    this.events = []; 
    this.event = null;
  }

  activate() {
      this.service.getEvents().then(lotusNotes => {
        var sorted = _.sortBy(lotusNotes, 'date');
        this.events = sorted;
    });
  }

  loadEvent(id){
    console.log('load event with id:', id);
    this.service.getEvent(id).then(result => {
      this.event = result;
    })
    //Load event by id
  }

  canDeactivate(){
    
  }
}