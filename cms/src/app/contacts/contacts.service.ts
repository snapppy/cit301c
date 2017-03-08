import { Injectable } from '@angular/core';
import {Contact} from "./contact";

@Injectable()
export class ContactsService {
  private contacts: Contact[] = [];
  private currentContact: Contact;
  constructor() {
    this.contacts = this.getContacts();
    this.currentContact = new Contact("18", "James", "email@email.com", "883-323-2342", "../../images/me.jpg", null);
  }

  getContact(index: number) {
    return this.contacts[index];
  }

  getContacts() {
    // individual contacts
    this.contacts[0] = new Contact("1", "Rex Barzee", "barzeer@byui.edu", "208-496-3768",
      "../../images/barzeer.jpg", null);
    this.contacts[1] = new Contact("2", "Bradley Armstrong", "armstrongb@byui.edu", "208-496-3766",
      "../../images/armstrongb.jpg", null);
    this.contacts[2] = new Contact("3", "Lee Barney", "barneyl@byui.edu", "208-496-3767",
      "../../images/barneyl.jpg", null);
    this.contacts[3] = new Contact("5", "Kory Godfrey", "godfreyko@byui.edu", "208-496-3770",
      "../../images/godfreyko.jpg", null);
    this.contacts[4] = new Contact("7", "R. Kent Jackson", "jacksonk@byui.edu", "208-496-3771",
      "../../images/jacksonk.jpg", null);
    this.contacts[5] = new Contact("8", "Craig Lindstrom", "lindstromc@byui.edu", "208-496-3769",
      "../../images/lindstromc.jpg", null);
    this.contacts[6] = new Contact("9", "Michael McLaughlin", "mclaughlinm@byui.edu", "208-496-3772",
      "../../images/mclaughlinm.jpg", null);
    this.contacts[7] = new Contact("11", "Brent Morring", "morringb@byui.edu", "208-496-3778",
      "../../images/morringb.jpg", null);
    this.contacts[8] = new Contact("12", "Mark Olaveson", "olavesonm@byui.edu", "208-496-3773",
      "../../images/olavesonm.jpg", null);
    this.contacts[9] = new Contact("13", "Steven Rigby", "rigbys@byui.edu", "208-496-3774",
      "../../images/rigbys.jpg", null);
    this.contacts[10] = new Contact("15", "Blaine Robertson", "robertsonb@byui.edu", "208-496-3775",
      "../../images/robertsonb.jpg", null);
    this.contacts[11] = new Contact("16", "Randy Somsen", "somsenr@byui.edu", "208-496-3776",
      "../../images/somsenr.jpg", null);
    this.contacts[12] = new Contact("17", "Shane Thompson", "thompsonda@byui.edu", "208-496-3776",
      "../../images/thompsonda.jpg", null);

    // group Contacts
    this.contacts[13] = new Contact("4", "Network/OS team", " ", " ", " ",
      [this.contacts[1], this.contacts[5], this.contacts[8], this.contacts[9]]);
    this.contacts[14] = new Contact("6", "Software Development team", " ", " ", " ",
      [this.contacts[0], this.contacts[2], this.contacts[4], this.contacts[8]]);
    this.contacts[15] = new Contact("10", "Web Development team", " ", " ", " ",
      [this.contacts[10], this.contacts[11], this.contacts[12]]);
    this.contacts[16] = new Contact("14", "Database team", " ", " ", " ",
      [this.contacts[4], this.contacts[6], this.contacts[7]]);
    this.contacts[17] = new Contact("18", "Computer Security team", " ", " ", " ",
      [this.contacts[3], this.contacts[5], this.contacts[9]]);

    // sort by name
    this.contacts = this.contacts.sort(this.compareNames);

    return this.contacts;
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
    if (!contact)
      return;
    this.contacts.push(contact);
    this.contacts = this.contacts.sort(this.compareNames);
  }

  updateContact(oldContact: Contact, newContact: Contact) {
    if (!oldContact || !newContact) {
      return;
    }
    this.contacts[this.contacts.indexOf(oldContact)] =newContact;
    this.contacts = this.contacts.sort(this.compareNames);
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
  }
}
