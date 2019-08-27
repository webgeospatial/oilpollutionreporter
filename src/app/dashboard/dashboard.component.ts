//import core angular functions needed by this component
import { Component, OnInit } from '@angular/core';
//import the data structure and type definitiion - added here to aid binding
import { locationClassDefinition } from '../selectlocation';
//import the service export
import { GetlocationsService } from '../getlocations.service';

//component parts locations
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: [ './dashboard.component.css' ]
})

//export DashboardComponentClass
export class DashboardComponent implements OnInit {
  //define local scope locations instance/property, defined by the class, as an empty array
  locations: locationClassDefinition[] = [];
  //construct a local scope service instance/property
  constructor(private localDashboardService: GetlocationsService) { }

  //initiate the construction
  ngOnInit() {
    this.getServiceOutputs();
  }

  //function to subscribe to the service
  getServiceOutputs(): void {
    this.localDashboardService.LoadLocationOptions()
      .subscribe(locations => this.locations = locations.slice(0, 20));
  }
}
