import { Injectable, EventEmitter } from '@angular/core';
import { Message } from './message.model';
import { MOCKMESSAGES } from './MOCKMESSAGES';
import { Subject } from 'rxjs';
import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class MessagesService {

  messageSelectedEvent = new EventEmitter<Message[]>();
  // messageChangedEvent = new EventEmitter<Message[]>();
  messageListChangedEvent = new Subject<Message[]>();

  messages: Message[] = [];
  maxMessageId: number;

  constructor(private http: HttpClient) {
    // this.messages = MOCKMESSAGES;
    this.maxMessageId = this.getMaxId();
    this.getMessages();
  }

  storeMessages() {
    this.messages = JSON.parse(JSON.stringify(this.messages));
    const header = new HttpHeaders({ 'Content-Type': 'application/json' });
    this.http.put('https://cms-data-9c4e6.firebaseio.com/messages.json', this.messages, { headers: header})
    .subscribe(
      (messages: Message[]) => {
        this.messageListChangedEvent.next(this.messages.slice());
      }
    );
  }

  getMessages() {
    this.http.get('https://cms-data-9c4e6.firebaseio.com/messages.json')
      .subscribe(
        (messages: Message[]) => {
          this.messages = messages;
          this.messages.sort((a, b) => (a.id < b.id) ? 1 : (a.id > b.id) ? -1 : 0);
          this.messageListChangedEvent.next(this.messages.slice());
        }, (error: any) => {
          console.log('something bad happened...');
        }
      );
  }

  getMessage(id: string): Message {
    for (let message of this.messages) {
      if (message.id === id) {
        return message
      }
    }
    return null;
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

  addMessage(newMessage: Message) {
    if (!newMessage) {
      return;
    }
    this.maxMessageId++;
    newMessage.id = String(this.maxMessageId);
    this.messages.push(newMessage);
    // this.messageChangeEvent.emit(this.messages.slice());
    this.storeMessages();
  }



}
