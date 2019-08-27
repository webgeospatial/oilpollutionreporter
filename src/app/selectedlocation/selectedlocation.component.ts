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
    //set the id variable for this selected item from the url route
    const id = +this.currentRoute.snapshot.paramMap.get('id');
    //get the item with that id from the local service instance
    this.localServiceInstance.getItemID(id)
    //by subscribing to the service and assigning it
      .subscribe(userlocation => this.userlocation = userlocation);
  }

  save(): void {
    this.localServiceInstance.updateItem(this.userlocation)
      .subscribe(() => this.goBack());
  }

  //back button using location import
  goBack(): void {
    this.angularLocation.back();
  }

}
