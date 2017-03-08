import {Component, OnInit, EventEmitter, Output, Input} from '@angular/core';
import {Contact} from "../contact";
import {ContactsService} from "../contacts.service";

@Component({
  selector: 'cms-contact-list',
  templateUrl: './contact-list.component.html',
  styleUrls: ['./contact-list.component.css']
})

export class ContactListComponent implements OnInit {


  @Output() selectedContact = new EventEmitter<Contact>();
  @Input() contact: Contact = null;
  contacts: Contact[] = [];

  constructor(private contactService: ContactsService) {
  }

  ngOnInit() {
    this.contacts = this.contactService.getContacts();
  }

  onSelected(contact: Contact) {
    this.selectedContact.emit(contact);
  }

}




