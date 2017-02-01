export class Contact {
  constructor(public contactId: string, public name: string, public email: string, public phone: string, public imageUrl: string, public group: Contact[]) {}
  /*contactId: number;
  name: string;
  email: string;
  phone: number;
  imageUrl: string;
  group: Contact[];

  constructor(contactId: number, name: string, email: string, phone: number, imageUrl: string, group: Contact[]) {
    this.contactId = contactId;
    this.name = name;
    this.email = email;
    this.phone = phone;
    this.imageUrl = imageUrl;
    this.group = group;
  }*/

  hasGroup() {
    if (this.group === null) {
      return false;
    } else {
      return true;
    }
  }
}
