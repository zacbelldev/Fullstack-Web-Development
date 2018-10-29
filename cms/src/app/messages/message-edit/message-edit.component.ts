import { Component, OnInit, ViewChild, ElementRef, Output, EventEmitter } from '@angular/core';
import { Message } from '../message.model';
import { MessagesService } from '../messages.service';

@Component({
  selector: 'cms-message-edit',
  templateUrl: './message-edit.component.html',
  styleUrls: ['./message-edit.component.css']
})
export class MessageEditComponent implements OnInit {
  public currentSender: string = "1";
  // @Output() addMessageEvent = new EventEmitter<Message>();
  @ViewChild('subject') subject: ElementRef;
  @ViewChild('msgText') msgText: ElementRef;

  onSendMessage() {
    const subject = this.subject.nativeElement.value;
    const msgText = this.msgText.nativeElement.value;
    const newMessageObj = new Message("1", subject, msgText, this.currentSender);
    this.messagesService.addMessage(newMessageObj);
    this.onClear();
  }

  onClear() {
    this.subject.nativeElement.value = '';
    this.msgText.nativeElement.value = '';
  }

  constructor(private messagesService: MessagesService) { }

  ngOnInit() {
  }

}
