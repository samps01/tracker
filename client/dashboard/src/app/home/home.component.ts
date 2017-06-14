import { Component, OnInit } from '@angular/core';
import {VehicleService} from "../vehicle.service";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  vehiclesData = [];

  constructor(private vehicleService:VehicleService) { }

  ngOnInit() {
    this.vehicleService.getVehicleData().subscribe((response)=>{
      this.vehiclesData = response.json();
    },(error)=>{
      console.log(error);
    })
  }

}
