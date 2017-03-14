import { Component, OnInit } from '@angular/core';
import {Message} from "../message";
import {MessagesService} from "../messages.service";

@Component({
  selector: 'cms-message-list',
  templateUrl: './message-list.component.html'
})
export class MessageListComponent implements OnInit {
  private messages: Message[] =[];
  constructor(private messagesService: MessagesService) { }

  ngOnInit() {
    this.messages = this.messagesService.getMessages();
    this.messagesService.messagesChanged.subscribe(
      (messages: Message[]) => this.messages = messages
    );
  }

}
