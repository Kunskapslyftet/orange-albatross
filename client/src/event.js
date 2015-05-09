import {inject} from 'aurelia-framework';
import  _  from 'lodash';
import {Service} from './service';


@inject(Service)
export class Home {
  
  constructor(service){
    
    this.service = service;
    this._ = _;
    this.events = []; 
  }

  activate() {
      this.service.getEvents().then(lotusNotes => {
        var sorted = _.sortBy(lotusNotes, 'date');
        this.events = sorted;
    });
  }

  canDeactivate(){
    
  }
}