import { Injectable } from '@angular/core';
import {Http} from "@angular/http";

@Injectable()
export class HighAlertService {

  constructor(private http:Http) { }
  getHighAlert(){
    return this.http.get('http://localhost:3000/client/highalerts');
  }
}
