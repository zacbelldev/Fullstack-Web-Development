import { Injectable, EventEmitter } from '@angular/core';
import { Message } from './message.model';
import { MOCKMESSAGES } from './MOCKMESSAGES';
import { Subject } from 'rxjs';
import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class MessagesService {

  messageChangeEvent = new EventEmitter<Message[]>();
  messages: Message[];
  maxMessageId: number;
  messageListChangedEvent = new Subject<Message[]>();

  constructor(private http: HttpClient) {
    // this.messages = MOCKMESSAGES;
    this.initMessages();
  }

  getMaxId(): number {
    let maxId = 0;
    for (let message of this.messages) {
      let currentId = +message.id;
      if (currentId > maxId) {
        maxId = currentId;
      }
    }
    return maxId;
  }

  storeMessages() {
    this.messages = JSON.parse(JSON.stringify(this.messages));
    const header = new HttpHeaders({ 'Content-Type': 'application/json' });
    this.http.put('https://cms-data-9c4e6.firebaseio.com/messages.json', this.messages, { headers: header})
    .subscribe(
      (messages: Message[]) => {
        this.messageChangeEvent.next(this.messages.slice());
      }
    );
  }

  initMessages() {
    this.http.get('https://cms-data-9c4e6.firebaseio.com/messages.json')
      .subscribe(
        (messages: Message[]) => {
          this.messages = messages;
          // this.messages.sort((a, b) => (a['name'] < b['name']) ? 1 : (a['name'] > b['name']) ? -1 : 0);
          this.messageListChangedEvent.next(this.messages.slice());
        }, (error: any) => {
          console.log('something bad happened...');
        }
      );
  }

  addMessage(message: Message) {
    this.messages.push(message);
    // this.messageChangeEvent.emit(this.messages.slice());
    this.storeMessages();
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


}
