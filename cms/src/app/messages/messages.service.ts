import { Injectable, EventEmitter } from '@angular/core';
import { Message } from './message.model';
import { MOCKMESSAGES } from './MOCKMESSAGES';

@Injectable({
  providedIn: 'root'
})
export class MessagesService {

  messageChangeEvent = new EventEmitter<Message[]>();

  messages: Message[];

  addMessage(message: Message) {
    this.messages.push(message);
    this.messageChangeEvent.emit(this.messages.slice());
  }

  getMessage(id: string): Message {
    for (let message of this.messages) {
      if (message.id === id) {
        return message
      }
    }
    return null;
  }

  getMessages(): Message[] {
    return this.messages.slice();
  }

  constructor() {
    this.messages = MOCKMESSAGES;
  }
}
