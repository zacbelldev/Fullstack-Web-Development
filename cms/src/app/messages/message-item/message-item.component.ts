import { Component, OnInit, Input } from '@angular/core';
// CONTACTS
import { ContactService } from 'src/app/contacts/contact.service';
import { Contact } from 'src/app/contacts/contact.model';
// MESSAGES
import { Message } from '../message.model';
import { MessagesService } from '../messages.service';

@Component({
  selector: 'cms-message-item',
  templateUrl: './message-item.component.html',
  styleUrls: ['./message-item.component.css']
})
export class MessageItemComponent implements OnInit {
  @Input() message: Message;

  messageSender: string = "";

  constructor(private contactService: ContactService, private messagesService: MessagesService) { }

  ngOnInit() {
    let contact: Contact = this.contactService.getContact(this.message.sender);
    this.messageSender = contact.name;
    console.log('asdfasdf', contact.name);
  }

}
