import {Injectable, EventEmitter} from '@angular/core';
import {Message} from "./message";
import {MOCKMESSAGES} from "./MOCKMESSAGES";
import 'rxjs/Rx';
import {Headers, Http, Response} from "@angular/http";
import {Observable} from "rxjs";

@Injectable()
export class MessagesService {
  private messages: Message[] = [];
  messagesChanged = new EventEmitter<Message[]>();
  constructor(private http: Http) {

    /*this.initMessages();*/
  }

  getMessages() {
    return this.http.get('http://localhost:3000/messages')
      .map((response: Response) => {
        const messages = response.json().obj;
        let transformedMessages: Message[] = [];
        for (let message of messages) {
          transformedMessages.push(new Message(message.id, message.sender, message.subject, message.text));
        }
        this.messages = transformedMessages;
        return transformedMessages;
      })
      .catch((error: Response) => Observable.throw("Error in the messages service"));
  }

  getMessage(index: number) {
    return this.messages[index];
  }

  addMessage(message: Message) {
    const body = JSON.stringify(message);
    const headers = new Headers({'Content-Type': 'application/json'});
    return this.http.post('http://localhost:3000/messages', body, {headers: headers})
      .map((response: Response) => {
        const result = response.json();
        const message = new Message(result.id, result.sender, result.subject, result.text);
        this.messages.push(message);
        return message;
      })
      .catch((error: Response) => Observable.throw("Error in the messages service"));
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
