import {Injectable, EventEmitter} from '@angular/core';
import {Message} from "./message";
import {MOCKMESSAGES} from "./MOCKMESSAGES";
import 'rxjs/Rx';
import {Headers, Http, Response} from "@angular/http";

@Injectable()
export class MessagesService {
  private messages: Message[] = [];
  messagesChanged = new EventEmitter<Message[]>();
  constructor(private http: Http) {

    /*this.initMessages();*/
  }

  getMessages() {
    this.messages = MOCKMESSAGES;
    return this.messages;
  }

  getMessage(index: number) {
    return this.messages[index];
  }

  addMessage(message: Message) {
    this.messages.push(message);
    /*this.storeMessages();*/
  }

  // /*initMessages() {
  //   return this.http.get('https://jameswcms.firebaseio.com/messages.json')
  //     .map((response: Response) => response.json())
  //     .subscribe(
  //       (data: Message[]) => {
  //         this.messages = data;
  //         this.messagesChanged.emit(this.messages);
  //       }
  //
  //     );
  // }*/

  /*storeMessages() {
    const body = JSON.stringify(this.messages);
    const headers = new Headers({
      'Content-Type': 'application/json'
    });
    return this.http.put('https://jameswcms.firebaseio.com/messages.json',
      body, {headers: headers}).toPromise();
  }*/

}
