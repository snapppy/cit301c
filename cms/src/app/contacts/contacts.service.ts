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
    const body = JSON.stringify(newContact);
    const headers = new Headers({'Content-Type': 'application/json'});
    return this.http.patch('http://localhost:3000/contacts/' + newContact.contactId, body, {headers: headers})
      .map((response: Response) => response.json())
      .catch((error: Response) => Observable.throw(error.json()));
  }

  deleteContact(contact: Contact) {
    this.contacts.splice(this.contacts.indexOf(contact), 1);
    return this.http.delete('http://localhost:3000/contacts/' + contact.contactId)
      .map((response: Response) => response.json())
      .catch((error: Response) => Observable.throw(error.json()));
  }

}
