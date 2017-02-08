import { Component, OnInit, Input } from '@angular/core';
import {Message} from "../message";

@Component({
  selector: 'cms-message-item',
  templateUrl: './message-item.component.html'
})
export class MessageItemComponent implements OnInit {
  @Input() message: Message;
  constructor() { }

  ngOnInit() {
  }

}
