import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import {RouterModule, Routes} from "@angular/router";
import {FormsModule} from "@angular/forms";
import {HttpModule} from "@angular/http";
import {VehicleService} from "./vehicle.service";
import { HomeComponent } from './home/home.component';
import { VehicleComponent } from './home/vehicle/vehicle.component';
import { VehicleInfoComponent } from './vehicle-info/vehicle-info.component';
import {ReadingsService} from "./readings.service";
import { HighAlertComponent } from './high-alert/high-alert.component';
import {HighAlertService} from "./high-alert.service";
import { LinechartComponent } from './shared/linechart/linechart.component';
import { ReadingItemComponent } from './vehicle-info/reading-item/reading-item.component';
import {LinechartService} from "./shared/linechart/linechart.service";
import { AllAlertComponent } from './vehicle-info/all-alert/all-alert.component';
import {AllAlertService} from "./vehicle-info/all-alert/all-alert.service";

import { AgmCoreModule } from '@agm/core';
import { LocationComponent } from './vehicle-info/location/location.component';

const appRoutes:Routes = [
  {path:'', component: HomeComponent},
  {path:'vehicle/:vin',component:VehicleInfoComponent},
  {path:'highalerts',component:HighAlertComponent},
  {path:'allalerts/:vin',component:AllAlertComponent}
]

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    HomeComponent,
    VehicleComponent,
    VehicleInfoComponent,
    HighAlertComponent,
    LinechartComponent,
    ReadingItemComponent,
    AllAlertComponent,
    LocationComponent
  ],
  imports: [
    HttpModule,
    FormsModule,
    BrowserModule,
    RouterModule.forRoot(appRoutes),
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyABsRBhhylEcLI3A1Vzg0nvWng-KU7-MiM'
    })
  ],
  providers: [
    AllAlertService,
    LinechartService,
    VehicleService,
    ReadingsService,
    HighAlertService],
  bootstrap: [AppComponent]
})
export class AppModule { }
