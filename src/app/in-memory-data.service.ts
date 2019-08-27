//import the in memory data-service from angular core
import { InMemoryDbService } from 'angular-in-memory-web-api';
//import the data structure and type definitiion
import { locationClassDefinition } from './selectlocation';
//make this data service injectable
import { Injectable } from '@angular/core';
//inject the data service into the root of the application
@Injectable({
  providedIn: 'root',
})


//export InMemoryDataService class, with an array called InMemoryDataServiceItems that contains all items
export class InMemoryDataService implements InMemoryDbService {
  createDb() {
    const InMemoryDataServiceItems = [
      {id: 1, state: 'A State', lga: 'Port Harcourt', ward: 'Somewhere local', x: 1, y: 1,},
      {id: 2, state: 'B State', lga: 'Warri', ward: 'Somewhere local', x: 2, y: 2,},
      {id: 3, state: 'C State', lga: 'Uyo', ward: 'Somewhere local', x: 3, y: 3,},
      {id: 4, state: 'D State', lga: 'Delta', ward: 'Somewhere local', x: 4, y: 4,},
      {id: 5, state: 'E State', lga: 'Ukit', ward: 'Somewhere local', x: 5, y: 5,},
      {id: 6, state: 'F State', lga: 'Funiwa', ward: 'Somewhere local', x: 6, y: 6,},
      {id: 7, state: 'G State', lga: 'Gabran', ward: 'Somewhere local', x: 7, y: 7,}
    ];
    return {InMemoryDataServiceItems};
  }

  // Overrides the genId method to ensure that an item always has an id.
  // If the array is empty, the method below returns the initial number (11).
  // if the array is not empty, the method below returns the highest id + 1.
  genId(InMemoryDataServiceItems: locationClassDefinition[]): number {
    return InMemoryDataServiceItems.length > 0 ? Math.max(...InMemoryDataServiceItems.map(locationClassDefinition => locationClassDefinition.id)) + 1 : 11;
  }
}