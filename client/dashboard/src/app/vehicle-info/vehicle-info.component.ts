import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {ReadingsService} from "../readings.service";
import * as moment from 'moment';
import {LinechartService} from "../shared/linechart/linechart.service";
import 'rxjs/Rx';

@Component({
  selector: 'app-vehicle-info',
  templateUrl: './vehicle-info.component.html',
  styleUrls: ['./vehicle-info.component.css']
})
export class VehicleInfoComponent implements OnInit{
  timeStampArray:Array<string>=[];
  displayData:Array<string>=[
    'speed',
    'engineHp',
    'engineRpm',
    'fuelVolume'
  ];
  getLocation=[];
  locationPoint = [];
  vehicleInfo = {};
  chartData;
  vin:Number;
  constructor(private route:ActivatedRoute,
              private router:Router,
              private readingService: ReadingsService,
              private lineChartService:LinechartService) {
  }

  ngOnInit() {
    this.vin = this.route.snapshot.params['vin'];
    this.readingService.getVehicleReading(this.vin).subscribe((response)=>{
      this.vehicleInfo = response.json();
      this.chartData = this.vehicleInfo['speed'].map((data,i)=>{
        return {date:new Date(this.vehicleInfo['timestamp'][i]),value:data}
      });
      this.getLocation = this.vehicleInfo['location'].map((item)=>{
        return item;
      });
      this.lineChartService.setData(this.chartData);
    })
  }

  onAlertShow(){

    this.router.navigate(['allalerts',this.vin]);
  }
  setLocation(){
    window.scrollTo(0,1000);
    this.locationPoint = this.getLocation;
  }

}
