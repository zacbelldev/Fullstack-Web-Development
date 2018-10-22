import { Component, OnInit } from '@angular/core';
import { Message } from '../message.model';

@Component({
  selector: 'cms-message-list',
  templateUrl: './message-list.component.html',
  styleUrls: ['./message-list.component.css']
})
export class MessageListComponent implements OnInit {

  messages: Message[] = [
    new Message(1, "Test Subject", "Test Message Text", "Test Sender"),
    new Message(2, "Test Subject2", "Test Message Text2", "Test Sender2"),
    new Message(3, "Test Subject3", "Test Message Text3", "Test Sender3")
  ]

  onAddMessage(message: Message){
    this.messages.push(message);
  }

  constructor() { }

  ngOnInit() {
  }

}
