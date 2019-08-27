//import core angular functions needed by this component
import { Component, OnInit } from '@angular/core';
//import the data structure and type definitiion - added here to aid binding
import { locationClassDefinition } from '../selectlocation';
//import the service export
import { GetlocationsService } from '../getlocations.service';

//define this components parts
@Component({
  selector: 'app-selectlocation',
  templateUrl: './selectlocation.component.html',
  styleUrls: ['./selectlocation.component.css']
})

//export oninitialisation the following
export class SelectlocationComponent implements OnInit {
  //defines the data structure and type definitiion of variable userlocations
  userlocations: locationClassDefinition[];
  
  //constructs a private instance of the service for use in this component only
  constructor(private PrivateInstanceOfService: GetlocationsService) { }
  
  //calls LoadLocations() from this component 
  ngOnInit() {
    this.LoadLocations();
  }

  //internal component function to assign the data made available from the private service instance to this.userlocations
  LoadLocations(): void {
    //invoke the constructor
    this.PrivateInstanceOfService.LoadLocationOptions()
      //subscribe to the Observable and apply it to userlocations variable
      .subscribe(userlocations => this.userlocations = userlocations) 
  }

  //add a new item to the list
  add(state: string): void {
    state = state.trim();
    if (!state) { return; }
    this.PrivateInstanceOfService.addItem({ state } as locationClassDefinition)
      .subscribe(userlocations => {
        this.userlocations.push(userlocations);
      });
  }

  delete(userlocations: locationClassDefinition): void {
    this.userlocations = this.userlocations.filter(h => h !== userlocations);
    this.PrivateInstanceOfService.deleteItem(userlocations).subscribe();
  }
  

}

