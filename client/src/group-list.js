import {inject} from 'aurelia-framework';
import  _  from 'lodash';
import {Service} from './service';


@inject(Service)
export class Activity {
  
  constructor(service){
    
    this.service = service;
    this._ = _;
    this.groups = []; 
    this.heading = 'Groups';
  }

  activate() {
    var self = this;
      self.service.getGroups().then(groups => {
          self.groups = groups;
        });
    }
}