import { Component, OnInit } from '@angular/core';
import { Contact } from '../contact.model';
import { ContactService } from '../contact.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'cms-contact-list',
  templateUrl: './contact-list.component.html',
  styleUrls: ['./contact-list.component.css']
})
export class ContactListComponent implements OnInit {
  subscription: Subscription;
  contacts: Contact[] = [];
  term: string;

  onKeyPress(value: string) {
    this.term = value;
    console.log('SEARCH TERM', value);
  }

  constructor(private contactService: ContactService) {
    this.contactService.getContacts();
  }

  ngOnInit() {
    this.subscription = this.contactService.contactListChangedEvent
      .subscribe(
        (contacts: Contact[]) => {
          this.contacts = contacts;
        }
      )
  }

}

