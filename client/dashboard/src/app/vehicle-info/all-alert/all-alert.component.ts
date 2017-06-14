import { Component, OnInit } from '@angular/core';
import {AllAlertService} from "./all-alert.service";
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-all-alert',
  templateUrl: './all-alert.component.html',
  styleUrls: ['./all-alert.component.css']
})
export class AllAlertComponent implements OnInit {
  alertData={};
  constructor(private allAlertService:AllAlertService,
              private route:ActivatedRoute) { }

  ngOnInit() {
    const vin = this.route.snapshot.params['vin'];
    this.allAlertService.getHighAlert(vin).subscribe((response)=>{
        this.alertData = response.json();
    },(err)=>{
      console.log(err)
    })
  }

  getColor(text){
    if(text==='HIGH'){
      return '#B71C1C';
    }else if(text === 'Medium'){
      return '#EF6C00'
    }else{
      return '#FFC107'
    }

}
}
