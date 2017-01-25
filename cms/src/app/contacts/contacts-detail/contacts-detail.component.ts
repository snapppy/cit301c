import { Component, OnInit, Input} from '@angular/core';
import { Contact } from "../contact";

@Component({
  selector: 'cms-contacts-detail',
  templateUrl: './contacts-detail.component.html'
})
export class ContactsDetailComponent implements OnInit {
  @Input() selectedContact: Contact;
  constructor() { }

  ngOnInit() {
  }

}
