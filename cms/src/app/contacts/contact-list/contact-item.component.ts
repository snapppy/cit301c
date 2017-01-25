import { Component, OnInit, Input } from '@angular/core';
import { Contact } from '../contact';
@Component({
  selector: 'cms-contact-item',
  templateUrl: './contact-item.component.html'
})
export class ContactItemComponent implements OnInit {
  @Input() contact: Contact;
  contactId: number;

  constructor() { }

  ngOnInit() {
  }

}
