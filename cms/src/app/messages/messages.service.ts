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

  // storeMessages() {
  //   this.messages = JSON.parse(JSON.stringify(this.messages));
  //   const header = new HttpHeaders({ 'Content-Type': 'application/json' });
  //   this.http.put('https://cms-data-9c4e6.firebaseio.com/messages.json', this.messages, { headers: header})
  //   .subscribe(
  //     (messages: Message[]) => {
  //       this.messageListChangedEvent.next(this.messages.slice());
  //     }
  //   );
  // }

  getMessages() {
    // this.http.get('http://localhost:3000/messages/')
    this.http.get<{ message: string, messages: Message[]}>('http://localhost:3000/messages')
      .subscribe(
        (messageData) => {
          this.messages = messageData.messages;
          this.messages.sort((a, b) => (a.id < b.id) ? 1 : (a.id > b.id) ? -1 : 0);
          this.messageListChangedEvent.next(this.messages.slice());
        }, (error: any) => {
          console.log('something bad happened...');
        }
      );
  }

  getMessage(id: string): Message {
    for (const message of this.messages) {
      if (message.id === id) {
        return message;
      }
    }
    return null;
  }

  getMaxId(): number {
    let maxId = 0;
    for (const message of this.messages) {
      const currentId = +message.id;
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

    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });
    newMessage.id = '';
    const strMessage = JSON.stringify(newMessage);

    this.http.post('http://localhost:3000/messages', strMessage, { headers: headers })
      // .map(
      //   (res: Response) => {
      //     return res.json().obj;
      //   })
      .subscribe(
        (messages: Message[]) => {
          this.messages = messages;
          this.messageListChangedEvent.next(this.messages.slice());
        });
    // if (!newMessage) {
    //   return;
    // }
    // this.maxMessageId++;
    // newMessage.id = String(this.maxMessageId);
    // this.messages.push(newMessage);
    // this.storeMessages();
  }



}
