import { Injectable } from '@angular/core';
import {Http} from "@angular/http";

@Injectable()
export class ReadingsService {
  readings = {}
  constructor(private http:Http) { }

  getVehicleReading(vin){
    return this.http.get(`http://localhost:3000/client/vehicle/${vin}`)
  }

}
