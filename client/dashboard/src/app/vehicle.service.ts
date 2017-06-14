import { Injectable } from '@angular/core';
import {Http} from "@angular/http";

@Injectable()
export class VehicleService {

  constructor(private http:Http) { }

  getVehicleData(){
    return this.http.get('http://localhost:3000/client/vehicles');
  }

}
