import { Injectable, EventEmitter } from '@angular/core';
import { Contact } from './contact.model';
import { MOCKCONTACTS } from './MOCKCONTACTS';
import { Subject } from 'rxjs';
import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ContactService {

  contactChangedEvent = new EventEmitter<Contact[]>();
  contactSelectedEvent = new EventEmitter<Contact[]>();
  contactListChangedEvent = new Subject<Contact[]>();
  contacts: Contact[] = [];
  maxContactId: number;

  // storeContacts() {
  //   this.contacts = JSON.parse(JSON.stringify(this.contacts));
  //   const header = new HttpHeaders({ 'Content-Type': 'application/json' });
  //   this.http.put('https://cms-data-9c4e6.firebaseio.com/contacts.json', this.contacts, { headers: header})
  //   .subscribe(
  //     (contacts: Contact[]) => {
  //       this.contactListChangedEvent.next(this.contacts.slice());
  //     }
  //   );
  // }

  getContacts() {
    this.http.get('http://localhost:3000/contacts')
      .subscribe(
        (contacts: Contact[]) => {
          this.contacts = contacts;
          this.contacts.sort((a, b) => (a['name'] < b['name']) ? 1 : (a['name'] > b['name']) ? -1 : 0);
          this.contactListChangedEvent.next(this.contacts.slice());
        }, (error: any) => {
          console.log('something bad happened...');
        }
      );
  }

  // getContacts(): Contact[] {
  //   return this.contacts.slice();
  // }

  getContact(id: string): Contact {
    for (const contact of this.contacts) {
      if (contact.id === id) {
        return contact;
      }
    }
    return null;
  }

  getMaxId(): number {
    let maxId = 0;
    for (const contact of this.contacts) {
      const currentId = +contact.id;
      if (currentId > maxId) {
        maxId = currentId;
      }
    }
    return maxId;
  }

  addContact(newContact: Contact) {
    if (!newContact) {
      return;
    }

    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });
    newContact.id = '';
    const strContact = JSON.stringify(newContact);

    this.http.post('http://localhost:3000/contacts', strContact, { headers: headers })
      // .map(
      //   (res: Response) => {
      //     return res.json().obj;
      //   })
      .subscribe(
        (contacts: Contact[]) => {
          this.contacts = contacts;
          this.contactChangedEvent.next(this.contacts.slice());
        });

    // if (newContact == null || newContact == undefined) {
    //   return;
    // }
    // this.maxContactId++;
    // newContact.id = String(this.maxContactId);
    // this.contacts.push(newContact);
    // this.storeContacts();
  }

  updateContact(originalContact: Contact, newContact: Contact) {
    if (!originalContact || !newContact) {
      return;
    }

    const pos = this.contacts.indexOf(originalContact);
    if (pos < 0) {
      return;
    }

    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });

    const strContact = JSON.stringify(newContact);

    this.http.patch('http://localhost:3000/contacts/' + originalContact.id
      , strContact
      , { headers: headers })
      // .map(
      //   (res: Response) => {
      //     return res.json().obj;
      //   })
      .subscribe(
        (contacts: Contact[]) => {
          this.contacts = contacts;
          this.contactChangedEvent.next(this.contacts.slice());
        });
    // if (originalContact === null || newContact === null || newContact=== undefined || originalContact === undefined) {
    //   return;
    // }
    // let pos = this.contacts.indexOf(originalContact);
    // if (pos < 0) {
    //   return;
    // }
    // newContact.id = originalContact.id;
    // this.contacts[pos] = newContact;
    // this.storeContacts();
  }

  deleteContact(contact: Contact) {
    if (!contact) {
      return;
    }

    this.http.delete('http://localhost:3000/contacts/' + contact.id)
    // .map(
      //   (res: Response) => {
      //     return res.json().obj;
      //   })
      .subscribe(
        (contacts: Contact[]) => {
          this.contacts = contacts;
          this.contactChangedEvent.next(this.contacts.slice());
        });
    // if (contact === null || contact === undefined) {
    //   return;
    // }
    // let pos = this.contacts.indexOf(contact);
    // if (pos < 0) {
    //   return;
    // }
    // this.contacts.splice(pos, 1);
    // this.storeContacts();
  }

  constructor(private http: HttpClient) {
    // this.contacts = MOCKCONTACTS;
    this.maxContactId = this.getMaxId();
  }
}
