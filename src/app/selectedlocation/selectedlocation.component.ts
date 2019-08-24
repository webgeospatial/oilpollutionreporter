//import core angular functions needed by this component
import { Component, OnInit, Input } from '@angular/core';
//currently activated route import
import { ActivatedRoute } from '@angular/router';
//location import service
import { Location } from '@angular/common';

//import the data structure and type definitiion - added here to aid binding
import { locationClassDefinition } from '../selectlocation';
//import the service export
import { GetlocationsService } from '../getlocations.service';

//define this components parts
@Component({
  selector: 'app-selectedlocation',
  templateUrl: './selectedlocation.component.html',
  styleUrls: ['./selectedlocation.component.css']
})

//export oninitialisation the following SelectedlocationComponent class
export class SelectedlocationComponent implements OnInit {
  //bind the userlocation variable to the input in the template
  @Input() userlocation: locationClassDefinition;

  constructor(
    //construct a currentRoute that's passed in from the router
    private currentRoute: ActivatedRoute,
    //construct local data instance
    private localServiceInstance: GetlocationsService,
    //construct angular:location variable
    private angularLocation: Location
  ) { }

  //call getItemID from below
  ngOnInit(): void {
    this.getItemID();
  }
  
  getItemID(): void {
    //set the id variable
    const id = +this.currentRoute.snapshot.paramMap.get('id');
    //???????
    this.localServiceInstance.getItemID(id)
      .subscribe(userlocation => this.userlocation = userlocation);
  }

  //back button using location import
  goBack(): void {
    this.angularLocation.back();
  }

}
