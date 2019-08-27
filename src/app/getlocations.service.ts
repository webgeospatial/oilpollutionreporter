//make this service injectable
import { Injectable } from '@angular/core';
//import the http module
import { HttpClient, HttpHeaders } from '@angular/common/http';
//import the data structure and type definitiion
import { locationClassDefinition } from './selectlocation';
//import the rxjs Observable
import { Observable, of } from 'rxjs';
//and some of its operators
import { catchError, map, tap } from 'rxjs/operators';
//import the message service
import { MessageService } from './message.service';

//inject into the root of the app so eveything can see the what the service exports
@Injectable({
  providedIn: 'root'
})

//define a class for this service, and load the data array into locationClassDefinition[]
export class GetlocationsService {

  //api url is in the format root/arrayofoutputteditems from in http service
  private NamedUrlForAPI = 'api/InMemoryDataServiceItems';  // URL to web service api

  //construct new local instances of classes and services for use within the current scope
  constructor(
    private httpService: HttpClient,
    private InstanceOfMessageService: MessageService) { }

  LoadLocationOptions(): Observable<locationClassDefinition[]> {
    //return items from service
    return this.httpService.get<locationClassDefinition[]>(this.NamedUrlForAPI)
      .pipe(
        tap(_ => this.log('fetched items')),
        catchError(this.handleError<locationClassDefinition[]>('LoadLocationOptions', []))
      );
  }

  //get the item id from observable as type:number
  getItemID(id: number): Observable<locationClassDefinition> {
    //construct url path
    const url = `${this.NamedUrlForAPI}/${id}`; 
    //return the individual item from the service based on the url
    return this.httpService.get<locationClassDefinition>(url)
      .pipe(
        tap(_ => this.log(`fetched item with the id of ${id}`)),
        catchError(this.handleError<locationClassDefinition>(`LoadLocationOptions id=${id}`))
        );
  }

  //Handle Http operation that fail
  private handleError<T> (operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead
      // TODO: better job of transforming error for user consumption
      this.log(`${operation} failed: ${error.message}`);
      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }  

  /** PUT: update the item on the server */
  updateItem(userlocation: locationClassDefinition): Observable<any> {
    return this.httpService.put(this.NamedUrlForAPI, userlocation, this.httpOptions).pipe(
      tap(_ => this.log(`updated item id=${userlocation.id}`)),
      catchError(this.handleError<any>('updateItem'))
    );
  }

  //set httpOptions to define new http headers of type json
  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  /** POST: add a new hero to the server */
  addItem(userlocation: locationClassDefinition): Observable<locationClassDefinition> {
    return this.httpService.post<locationClassDefinition>(this.NamedUrlForAPI, userlocation, this.httpOptions).pipe(
      tap((newItem: locationClassDefinition) => this.log(`added item with id=${newItem.id}`)),
      catchError(this.handleError<locationClassDefinition>('addItem'))
    );
  }

  /** DELETE: delete the item from the server */
  deleteItem(userlocation: locationClassDefinition | number): Observable<locationClassDefinition> {
    const id = typeof userlocation === 'number' ? userlocation : userlocation.id;
    const url = `${this.NamedUrlForAPI}/${id}`;

    return this.httpService.delete<locationClassDefinition>(url, this.httpOptions).pipe(
      tap(_ => this.log(`deleted item id=${id}`)),
      catchError(this.handleError<locationClassDefinition>('deleteItem'))
  );
  }

  /* GET items whose name contains search term */
  searchItems(searchterm: string): Observable<locationClassDefinition[]> {
    if (!searchterm.trim()) {
      // if not search term, return empty array.
      return of([]);
    }
    return this.httpService.get<locationClassDefinition[]>(`${this.NamedUrlForAPI}/?state=${searchterm}`).pipe(
      tap(_ => this.log(`found items matching "${searchterm}"`)),
      catchError(this.handleError<locationClassDefinition[]>('searchItems', []))
    );
  }

  //message log to pass messages to
  private log(message: string) {
    this.InstanceOfMessageService.add(`GetLocationsService says: ${message}`);
  }
  
}

