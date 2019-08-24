//allow this service to be injectable
import { Injectable } from '@angular/core';

//inject the service at the root scope
@Injectable({
  providedIn: 'root',
})

//define MessageService class
export class MessageService {
  //define message service structure as an empty array of strings
  messages: string[] = [];

  //function to add a message when called
  add(message: string) {
    this.messages.push(message);
  }

  //function to clear the message when called
  clear() {
    this.messages = [];
  }
}
