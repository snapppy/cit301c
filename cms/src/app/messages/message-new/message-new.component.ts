import { Component, OnInit } from '@angular/core';
import {Contact} from "../../contacts/contact";
import {ContactsService} from "../../contacts/contacts.service";
import {MessagesService} from "../messages.service";
import {Router} from "@angular/router";
import {Message} from "../message";

@Component({
  selector: 'cms-message-new',
  templateUrl: './message-new.component.html',
  styleUrls: ['./message-new.component.css']
})
export class MessageNewComponent implements OnInit {

  sender: Contact;

  constructor(private contactsService: ContactsService,
              private messagesService: MessagesService,
              private router: Router) {
    this.sender = this.contactsService.getCurrentContact();
  }

  ngOnInit() {
  }

  onSubmit(value) {
    const newMessage = new Message(null, this.sender.name, "", value.message);
    this.messagesService.addMessage(newMessage);
    this.router.navigate(['messages']);
  }

  onCancel() {
    this.router.navigate(['messages']);
  }

}
