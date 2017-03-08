import { Injectable } from '@angular/core';
import {Message} from "./message";
import {MOCKMESSAGES} from "./MOCKMESSAGES";

@Injectable()
export class MessagesService {
  private messages: Message[] = [];
  constructor() { }

  getMessages() {
    this.messages = MOCKMESSAGES;
    return this.messages;
  }

  getMessage(index: number) {
    return this.messages[index];
  }

  addMessage(message: Message) {
    this.messages.push(message);
  }

}
