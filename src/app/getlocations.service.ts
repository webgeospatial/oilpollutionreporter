//make this service injectable
import { Injectable } from '@angular/core';
//import the data structure and type definitiion
import { locationClassDefinition } from './selectlocation';
//import the moccklocations data array
import { MOCKLOCATIONS } from './mock-locations';
//import the rxjs Observable
import { Observable, of } from 'rxjs';
//import the message service
import { MessageService } from './message.service';

//inject into the root of the app so eveything can see the what the service exports
@Injectable({
  providedIn: 'root'
})

//define a class for this service, and load the data array into locationClassDefinition[]
export class GetlocationsService {

  //construct InstanceOfMessageService for export
  constructor(private InstanceOfMessageService: MessageService) { }

  LoadLocationOptions(): Observable<locationClassDefinition[]> {
    // TODO: send the message _after_ fetching the heroes
    this.InstanceOfMessageService.add('The get locations service has fetched the locations');
    return of(MOCKLOCATIONS);
  }

  getItemID(id: number): Observable<locationClassDefinition> {
    // TODO: send the message _after_ fetching the heroes
    this.InstanceOfMessageService.add(`The get locations service has fetched the item id=${id}`);
    //work out what is going on here and why changing it has no effect
    return of(MOCKLOCATIONS.find(userlocations => userlocations.id === id));
  }
}

