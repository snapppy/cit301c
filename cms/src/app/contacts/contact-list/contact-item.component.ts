import { Component, OnInit, Input } from '@angular/core';

import { Contact } from "../contact";

@Component({
  selector: 'cms-contact-item',
  templateUrl: './contact-item.component.html'
})
export class ContactItemComponent implements OnInit {
  @Input() contact: Contact;
  @Input() contactIdx: number;
  contactId: number;

  constructor() { }

  ngOnInit() {

  }
}





