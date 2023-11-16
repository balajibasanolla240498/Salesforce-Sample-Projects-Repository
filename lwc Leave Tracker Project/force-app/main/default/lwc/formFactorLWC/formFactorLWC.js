import { LightningElement } from 'lwc';
import FORM_FACTOR from "@salesforce/client/formFactor";

const columns=
[
    {label:'Name',fieldName:'name'},
    { label: 'Website', fieldName: 'website', type: 'url' },
    { label: 'Type', fieldName: 'type' }
];


export default class FormFactorLWC extends LightningElement 
{
    deviceType;
    columns = columns;

    data = 
    [
        { id: 1, name: 'Ankit', type: 'CS', website: 'https://techdicer.com/' },
        { id: 2, name: 'Rijwan', type: 'EC', website: 'https://techdicer.com/' },
        { id: 3, name: 'Himanshu', type: 'MEC', website: 'https://techdicer.com/' },
    ];

    connectedCallback() 
    {
        this.handleFormFactor();
    }

    handleFormFactor() 
    {
        if (FORM_FACTOR === "Large") {
            this.deviceType = "Desktop/Laptop";
        } else if (FORM_FACTOR === "Medium") {
            this.deviceType = "Tablet";
        } else if (FORM_FACTOR === "Small") {
            this.deviceType = "Mobile";
        }
    }

}