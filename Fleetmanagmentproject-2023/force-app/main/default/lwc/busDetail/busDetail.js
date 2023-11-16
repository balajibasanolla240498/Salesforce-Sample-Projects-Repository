import { LightningElement,api } from 'lwc';
import { createMessageContext, releaseMessageContext,APPLICATION_SCOPE,subscribe, unsubscribe, publish } from 'lightning/messageService';
import ANOTHERMC from "@salesforce/messageChannel/AnotherMessageChannel__c";
import NAME_FIELD from '@salesforce/schema/Bus__c.Name';
import YEAR_FIELD from '@salesforce/schema/Bus__c.Year__c';
import ODOMETER_FIELD from '@salesforce/schema/Bus__c.Odometer_Reading__c';
import CAPACITY_FIELD from '@salesforce/schema/Bus__c.Maximum_Capacity__c';



export default class BusDetail extends LightningElement {

    context1 = createMessageContext();

    @api context
    @api subscription
    @api receivedMessage
    @api busRec;
    @api objectApiName
    fields = [NAME_FIELD, YEAR_FIELD, CAPACITY_FIELD, ODOMETER_FIELD];

     /////////publisher/////
    handleSuccess(event)
    {
        const message = 
        {
            newrecordData:{value:"Message from Another LWC"}
        };
 
        publish(this.context1,ANOTHERMC,message);
        eval("$A.get('e.force:refreshView').fire();");
     }
    /////////publisher/////
}