import {Component, Input, OnInit} from '@angular/core';
import * as moment from 'moment';
import {LinechartService} from "../../shared/linechart/linechart.service";
import { Router} from "@angular/router";

@Component({
  selector: 'app-reading-item',
  templateUrl: './reading-item.component.html',
  styleUrls: ['./reading-item.component.css']
})
export class ReadingItemComponent implements OnInit {
  @Input() individualName:string;
  @Input() individualData=[];
  @Input() individualTime=[];
  lastUpdated;
  chartData;
  constructor(private lineChartService:LinechartService) { }

  ngOnInit() {
    this.lastUpdated = moment(this.individualTime[this.individualTime.length-1]).fromNow();

    //this.lineChartService.setData()
  }

  onShowMore(){
    this.chartData = this.individualData.map((data,i)=>{
        return {date:new Date(this.individualTime[i]),value:data}
    });
    console.log(this.chartData);
    this.lineChartService.setData(this.chartData);
  }
}
