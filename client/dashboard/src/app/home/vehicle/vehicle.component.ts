import {Component, Input, OnInit} from '@angular/core';
import {Router} from "@angular/router";

@Component({
  selector: 'app-vehicle',
  templateUrl: './vehicle.component.html',
  styleUrls: ['./vehicle.component.css']
})
export class VehicleComponent implements OnInit {
 @Input() vehicleInfo ={};
  constructor(private router:Router) { }

  ngOnInit() {
  }

  onCarSelect(){
     this.router.navigate(['/vehicle',this.vehicleInfo['vin']])
  }
}
