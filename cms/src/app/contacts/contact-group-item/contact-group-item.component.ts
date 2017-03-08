import {Component, Input} from '@angular/core';
import {Contact} from "../contact";

@Component({
  selector: 'cms-contact-group-item',
  template: `
      <a class="list-group-item clearfix">
        <div class="pull-left">
          <span class="list-group-item-heading" style="font-size: 2rem">{{contact?.name}}</span>
        </div>
        <span class="pull-right">
            <img class="img-responsive"
                 src="{{contact?.imageUrl}}"
                 style="max-height: 50px;"/>
        </span>
      </a>
  `
})
export class ContactGroupItemComponent {
  @Input() contact: Contact;
  constructor() {
  }


}
