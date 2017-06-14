import { Injectable } from '@angular/core';
import {Subject} from "rxjs/Subject";

@Injectable()

export class LinechartService{
  dataSubject = new Subject();
  data=[];
  constructor() { }

  setData(data){
    this.data = data;
    this.dataSubject.next(this.data);
  };

  getData(){
    return this.data;
  }
}
