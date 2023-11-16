import { LightningElement ,track} from 'lwc';

export default class Parentcomponent extends LightningElement 
{
    @track firstName = '';
    @track lastName = '';

    handlefirstname(event)
    {
        this.firstName = event.target.value;
    }
    handlelastnme(event)
    {
        this.lastName = event.target.value;        
    }
}