import { Component, OnInit, OnDestroy } from '@angular/core';
import { Message } from '../message.model';
import { MessagesService } from '../messages.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'cms-message-list',
  templateUrl: './message-list.component.html',
  styleUrls: ['./message-list.component.css']
})
export class MessageListComponent implements OnInit, OnDestroy {
  subscription: Subscription;
  messages: Message[] = [];

  constructor(private messageService: MessagesService) {
    this.messageService.getMessages();
  }

  ngOnInit() {
    this.subscription = this.messageService.messageListChangedEvent
      .subscribe(
        (message: Message[]) => {
          this.messages = message;
        }
      )
      this.messageService.getMessages();
  }

  ngOnDestroy(){
    this.subscription.unsubscribe();
  }

  onAddMessage(message: Message) {
    this.messages.push(message);
  }

  onSelectedMessage(message: Message[]) {
    this.messageService.messageListChangedEvent.next(message);
  }

  

  



}
