//import core angular functions needed by this component
import { Component, OnInit } from '@angular/core';
//import the message service
import { MessageService } from '../message.service';


//define component parts
@Component({
  selector: 'app-messages',
  templateUrl: './messages.component.html',
  styleUrls: ['./messages.component.css']
})

//export a MessagesCompenent class
export class MessagesComponent implements OnInit {

  //construce publicInstanceOfMessageService and bind to template
  constructor(public PublicInstanceOfMessageService: MessageService) { }

  ngOnInit() {
  }

}
