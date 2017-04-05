import {Injectable, EventEmitter} from '@angular/core';
import {Contact} from "./contact";
import {Response, Http, Headers} from "@angular/http";
import {Observable} from "rxjs";

@Injectable()
export class ContactsService {
  private contacts: Contact[] = [];
  private currentContact: Contact;
  contactsChanged = new EventEmitter<Contact[]>();
  constructor(private http: Http) {
    /*this.initContacts();*/
    //this.contacts = this.getContacts();
    this.currentContact = new Contact("18", "James", "email@email.com", "883-323-2342", "../../images/me.jpg", null);
  }

  getContact(index: number) {
    return this.contacts[index];
  }

  getContactById(index: string): Contact {
    return this.contacts.find((contact: Contact) => contact.contactId === index);
  }

  getContacts() {
    console.log("Inside get contacts");
    return this.http.get('http://localhost:3000/contacts')
      .map((response: Response) => {
        const contacts = response.json().obj;
        let transformedContacts: Contact[] = [];
        for (let contact of contacts) {
          transformedContacts.push(new Contact(contact.id, contact.name, contact.email, contact.phone, contact.imageUrl, contact.group));
        }
        console.log(transformedContacts);
        this.contacts = transformedContacts;
        return transformedContacts;
      })
      .catch((error: Response) => Observable.throw("Error in getContacts Service"));
  }

  compareNames(contactA: Contact, contactB: Contact) {

    if (contactA.name < contactB.name)
      return -1;
    if (contactA.name > contactB.name)
      return 1;
    return 0;

  }

  getCurrentContact() {
    return this.currentContact;
  }

  addContact(contact: Contact) {
    console.log("Inside addContact");
    const body = JSON.stringify(contact);
    const headers = new Headers({'Content-Type': 'application/json'});
    return this.http.post('http://localhost:3000/contacts', body, {headers: headers})
      .map((response: Response) => {
        const result: Contact = response.json().obj;
        const contact = new Contact(result.contactId, result.name, result.email, result.phone, result.imageUrl, result.group);
        return contact;
      })
      .catch((error: Response) => Observable.throw("Error in add contact"));
  }

  updateContact(oldContact: Contact, newContact: Contact) {
    if (!oldContact || !newContact) {
      return;
    }
    this.contacts[this.contacts.indexOf(oldContact)] =newContact;
    this.contacts = this.contacts.sort(this.compareNames);
    /*this.storeContacts();*/
  }

  deleteContact(contact: Contact) {
    if (!contact) {
      return;
    }

    const pos = this.contacts.indexOf(contact);
    if (pos < 0) {
      return;
    }

    this.contacts.splice(pos, 1);
    this.contacts = this.contacts.sort(this.compareNames);
    /*this.storeContacts();*/
  }

  /*initContacts() {
    return this.http.get('https://jameswcms.firebaseio.com/contacts.json')
      .map((response: Response) => response.json())
      .subscribe(
        (data: Contact[]) => {
          this.contacts = data;
          this.currentContact = this.getContactById("7");
          this.contacts = this.contacts.sort(this.compareNames);
          this.contactsChanged.emit(this.contacts);
        }

      );
  }*/

  /*storeContacts() {
    const body = JSON.stringify(this.contacts);
    const headers = new Headers({
      'Content-Type': 'application/json'
    });
    return this.http.put('https://jameswcms.firebaseio.com/contacts.json',
      body, {headers: headers}).toPromise();
  }*/
}
