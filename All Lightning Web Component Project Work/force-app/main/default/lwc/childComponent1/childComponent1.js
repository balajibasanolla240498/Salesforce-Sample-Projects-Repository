import { LightningElement,api,track } from 'lwc';

export default class ChildComponent1 extends LightningElement 
{
    @api firstname;
    @api lastname;

    @track email = '';
    @track phone = '';

    handleemailchange(event)
    {
        this.email = event.target.value;
    }
    handlephonechange(event)
    {
        this.phone = event.target.value;
    }

}