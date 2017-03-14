import {Component, OnInit, EventEmitter, Output, Input} from '@angular/core';
import {Contact} from "../contact";
import {ContactsService} from "../contacts.service";

@Component({
  selector: 'cms-contact-list',
  templateUrl: './contact-list.component.html',
  styleUrls: ['./contact-list.component.css']
})

export class ContactListComponent implements OnInit {

  private term: string;

  @Output() selectedContact = new EventEmitter<Contact>();
  @Input() contact: Contact = null;
  contacts: Contact[] = [];

  constructor(private contactService: ContactsService) {
  }

  ngOnInit() {
    this.contacts = this.contactService.getContacts();
    this.contactService.contactsChanged.subscribe(
      (contacts: Contact[]) => this.contacts = contacts
    );
  }

  onSelected(contact: Contact) {
    this.selectedContact.emit(contact);
  }

  onKeyPress(value: string) {
    this.term = value;
  }

}




