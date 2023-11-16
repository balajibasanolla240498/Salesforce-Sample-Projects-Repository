import { LightningElement,api } from 'lwc';
import { createRecord } from 'lightning/uiRecordApi';

export default class ChildComponent2 extends LightningElement 
{
    @api email;
    @api phone;

    handlesave()
    {
        // Create a record in the Contact object
         fields = {
            FirstName: this.firstName,
            LastName: this.lastName,
            Email: this.email,
            Phone: this.phone
        };

    }

}
