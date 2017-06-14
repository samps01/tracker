import {Component, OnChanges, OnInit, SimpleChanges} from '@angular/core';

import * as d3 from 'd3-selection';
import * as d3Scale from "d3-scale";
import * as d3Shape from "d3-shape";
import * as d3Array from "d3-array";
import * as d3Axis from "d3-axis";
import {LinechartService} from "./linechart.service";
import 'rxjs/Rx';
@Component({
  selector: 'app-linechart',
  templateUrl:'./linechart.component.html',
  styleUrls: ['./linechart.component.css']
})
export class LinechartComponent implements OnInit,OnChanges {
  data=[];
  private margin = {top: 20, right: 20, bottom: 30, left: 50};
  private width: number;
  private height: number;
  private x: any;
  private y: any;
  private svg: any;
  private line: d3Shape.Line<[number, number]>;

  constructor(private lineChartService:LinechartService) {
    this.width = 900 - this.margin.left - this.margin.right ;
    this.height = 500 - this.margin.top - this.margin.bottom;
  }

  ngOnInit() {
    this.data = this.lineChartService.getData();
    this.lineChartService.dataSubject.subscribe((response:Array<any>)=>{
      this.data = response;
      d3.select("svg").html("");
      this.initSvg();
      this.initAxis(this.data);
      this.drawAxis();
      this.drawLine(this.data);
    },(err)=>{
      console.log(err);
    });
    this.initSvg();
    this.initAxis(this.data);
    this.drawAxis();
    this.drawLine(this.data);
  }

  ngOnChanges(changes: SimpleChanges) {


  }

  private initSvg() {
    this.svg = d3.select("svg")
      .append("g")
      .attr("transform", "translate(" + this.margin.left + "," + this.margin.top + ")");;
  }

  private initAxis(data) {
    this.x = d3Scale.scaleTime().range([0, this.width]);
    this.y = d3Scale.scaleLinear().range([this.height, 0]);
    this.x.domain(d3Array.extent(data, (d) => d['date'] ));
    this.y.domain(d3Array.extent(data, (d) => d['value'] ));
  }

  private drawAxis() {

    this.svg.append("g")
      .attr("class", "axis axis--x")
      .attr("transform", "translate(0," + this.height + ")")
      .call(d3Axis.axisBottom(this.x))
      .append("text")
      .attr("class", "axis-title")
      .attr("x", 550)
      .attr("y",-10)
      .attr("dx", "2em")
      .style("text-anchor", "start")
      .text("Time Period");

    this.svg.append("g")
      .attr("class", "axis axis--y")
      .call(d3Axis.axisLeft(this.y))
      .append("text")
      .attr("class", "axis-title")
      .attr("transform", "rotate(-90)")
      .attr("y", 6)
      .attr("dy", ".71em")
      .style("text-anchor", "end")
      .text("Vehicle Upper Limit");


    d3.selectAll('text').style('fill','white');
  }

  private drawLine(data) {
    this.line = d3Shape.line()
      .x( (d: any) => this.x(d.date) )
      .y( (d: any) => this.y(d.value) );

    this.svg.append("path")
      .datum(data)
      .attr("class", "line")
      .attr("d", this.line);
  }

}
