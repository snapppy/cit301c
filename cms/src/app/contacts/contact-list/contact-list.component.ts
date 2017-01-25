import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { Contact } from '../contact';
import { ContactItemComponent } from './contact-item.component';

@Component({
  selector: 'cms-contact-list',
  templateUrl: './contact-list.component.html'
})
export class ContactListComponent implements OnInit {
  contacts: Contact[] = [];
  @Output() contactSelected = new EventEmitter<Contact>();
  contact = new Contact(1, "Bob", "bob@gmail.com", "(567) 432-5464", "https://imagazine.pl/wp-content/uploads/2012/06/Bob-Mansfield.png", this.contacts);

  constructor() {
  }

  ngOnInit() {
  }
  onSelected(contact: Contact) {
    this.contactSelected.emit(contact);
  }
}
