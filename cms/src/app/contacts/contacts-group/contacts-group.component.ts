import { Component, OnInit, Input } from '@angular/core';
import { Contact } from '../contact';
@Component({
  selector: 'cms-contacts-group',
  templateUrl: './contacts-group.component.html'
})
export class ContactsGroupComponent implements OnInit {
  @Input() selectedContact: Contact;
  contactGroup: Contact[] = [];

  constructor() { }

  ngOnInit() {
  }

  ngOnChanges() {
    this.contactGroup = this.selectedContact.group;
  }

}
