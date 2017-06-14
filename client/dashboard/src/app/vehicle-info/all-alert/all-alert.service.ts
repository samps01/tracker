import {Injectable} from '@angular/core';
import {Http} from "@angular/http";

@Injectable()
export class AllAlertService{

  constructor(private http:Http) { }

  getHighAlert(vin){
    return this.http.get(`http://localhost:3000/client/alert/${vin}`);
  }
}
