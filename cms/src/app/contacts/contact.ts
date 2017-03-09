export class Contact {
  constructor(public contactId: string, public name: string, public email: string, public phone: string, public imageUrl: string, public group: Contact[]) {}

  hasGroup() {
    if (this.group === null) {
      return false;
    } else {
      return true;
    }
  }
}
