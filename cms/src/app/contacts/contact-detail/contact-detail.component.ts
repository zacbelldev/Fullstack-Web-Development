import { Component, OnInit, Input } from '@angular/core';
import { Contact } from '../contact.model';
import { ContactService } from '../contact.service';
import { Router, ActivatedRoute, Params } from '@angular/router';

@Component({
  selector: 'cms-contact-detail',
  templateUrl: './contact-detail.component.html',
  styleUrls: ['./contact-detail.component.css']
})
export class ContactDetailComponent implements OnInit {
  contacts: Contact;

  onDelete(){
    this.contactService.deleteContact(this.contacts)
    this.router.navigate(['/contact'], { relativeTo: this.route })
  }

  constructor(private contactService: ContactService, private router: Router, private route: ActivatedRoute) { }

  ngOnInit() {
    this.route.params
    .subscribe(
      (params: Params) => {
        const id = params['id'];
        this.contacts = this.contactService.getContact(id);
      }
    )
  }
  
}
