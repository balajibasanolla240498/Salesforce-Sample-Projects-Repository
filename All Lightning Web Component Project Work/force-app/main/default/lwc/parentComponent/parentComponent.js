import { LightningElement,track } from 'lwc';

export default class ParentComponent extends LightningElement 
{
    @track firstName = '';
    @track lastName = '';

    handlefirstnamechange(event)
    {
        this.firstName = event.target.value;
    }
    handlelastnamechange(event)
    {
        this.lastName = event.target.value;
    }
}