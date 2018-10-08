export class Contact {
    public contactId: number;
    public name: string;
    public email: string;
    public phone: string;
    public imageUrl: string;
    public group?: Array<Contact>;

    constructor(contactId: number, name: string, email: string, phone: string, imageUrl: string, group?: Array<Contact>) {
        this.contactId = contactId;
        this.name = name;
        this.email = email;
        this.phone = phone;
        this.imageUrl = imageUrl;
        this.group = group;
    }
}