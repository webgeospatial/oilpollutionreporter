//import some core modules
import { Component, OnInit } from '@angular/core';

//import observable functions and operators
import { Observable, Subject } from 'rxjs';
import {
  debounceTime, distinctUntilChanged, switchMap
} from 'rxjs/operators';

//import the data structure and type definitiion - added here to aid binding
import { locationClassDefinition } from '../selectlocation';
//import the service export
import { GetlocationsService } from '../getlocations.service';

@Component({
  selector: 'app-searchbox',
  templateUrl: './searchbox.component.html',
  styleUrls: ['./searchbox.component.css']
})
export class SearchboxComponent implements OnInit {

  returnedresults$: Observable<locationClassDefinition[]>;
  private searchTerms = new Subject<string>();

  constructor(private localServiceInstance: GetlocationsService) {}

  // Push a search term into the observable stream.
  search(term: string): void {
    this.searchTerms.next(term);
  }

  ngOnInit(): void {
    this.returnedresults$ = this.searchTerms.pipe(
      // wait 300ms after each keystroke before considering the term
      debounceTime(300),
      // ignore new term if same as previous term
      distinctUntilChanged(),
      // switch to new search observable each time the term changes
      switchMap((term: string) => this.localServiceInstance.searchItems(term)),
    );
  }

}
