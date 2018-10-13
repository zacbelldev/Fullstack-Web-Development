import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { Contact } from '../contact.model';

@Component({
  selector: 'cms-contact-list',
  templateUrl: './contact-list.component.html',
  styleUrls: ['./contact-list.component.css']
})
export class ContactListComponent implements OnInit {
  @Output() contactWasSelected = new EventEmitter<Contact>();
  contacts: Contact[] = [
    new Contact(1, 'Bro. Jackson', 'test1@email.com', "123-123-1234", 'https://photo.byui.edu/img/s/v-3/p450467539-3.jpg'),
    new Contact(2, 'Bro. Barzee', 'test2@email.com', "234-234-2345", 'https://photo.byui.edu/img/s/v-3/p237606783-3.jpg')
  ];

  constructor() { }

  ngOnInit() {
  }

  onContactSelected(contact: Contact) {
    this.contactWasSelected.emit(contact);
  }

}
