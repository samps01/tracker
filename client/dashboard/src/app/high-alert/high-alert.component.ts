import { Component, OnInit } from '@angular/core';
import {HighAlertService} from "../high-alert.service";

@Component({
  selector: 'app-high-alert',
  templateUrl: './high-alert.component.html',
  styleUrls: ['./high-alert.component.css']
})
export class HighAlertComponent implements OnInit {
  highAlertObj = {};
  vinObj = [];
  constructor(private highAlertService: HighAlertService) { }

  ngOnInit() {
    this.highAlertService.getHighAlert().subscribe((response)=>{
        this.highAlertObj = response.json();
        for(let prop in this.highAlertObj){
          this.vinObj.push(prop)
        }
    },(err)=>{
      console.log(err);
    })
  }

}
