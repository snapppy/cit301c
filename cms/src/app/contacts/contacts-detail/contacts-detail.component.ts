import { Component, OnDestroy, OnInit, Input} from '@angular/core';
import { Contact } from "../contact";
import {Subscription} from "rxjs";
import {ActivatedRoute, Router} from "@angular/router";
import {ContactsService} from "../contacts.service";

@Component({
  selector: 'cms-contacts-detail',
  templateUrl: './contacts-detail.component.html'
})
export class ContactsDetailComponent implements OnInit, OnDestroy {
  @Input() selectedContact: Contact;

  contact: Contact;
  subscription: Subscription;
  contactGroup: Contact[] = [];
  contactIdx: number;
  hasGroup: boolean = false;

  constructor(private activatedRoute: ActivatedRoute,
              private contactsService: ContactsService,
              private router: Router) {

  }

  ngOnInit() {
    this.subscription = this.activatedRoute.params.subscribe(
      (params: any) => {
        this.contactIdx = params['idx'];
        this.contact = this.contactsService.getContact(this.contactIdx);
        this.contactGroup = this.contact.group;
      });
  }

  onDelete() {
    this.contactsService.deleteContact(this.contact).subscribe();
    this.router.navigate(['contacts']);
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

}
