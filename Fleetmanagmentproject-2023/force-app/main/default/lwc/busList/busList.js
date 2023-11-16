import { LightningElement,wire,track } from 'lwc';
import getBusData from '@salesforce/apex/LWCController.getBusData';
import {createMessageContext, releaseMessageContext,APPLICATION_SCOPE,subscribe, unsubscribe, publish } from 'lightning/messageService';
import SAMPLEMC from '@salesforce/messageChannel/SampleMessageChannel__c';
import ANOTHERMC from '@salesforce/messageChannel/AnotherMessageChannel__c';
import {refreshApex} from '@salesforce/apex';

export default class BusList extends LightningElement 
{
    
    @track data;
    @track error;
    @track initialRecords;
    @track searchString;
    recordId='';
    context = createMessageContext();
    receivedMessage = '';




    @wire(getBusData)

    wiredbuses({data,error})
    {
        if(data)
        {
            console.log(data);
            this.data = data;
            this.initialRecords = data;
            this.error = undefined;
        }
        else if(error)
        {
            this.error = error;
            this.data = undefined;
        }
    }
    /*....................................................*/ 
    handleSearch(event)
    {
        const searchKey  = event.target.value.toLowerCase();

        if(searchKey)
        {
            this.data = this.initialRecords;

            if(this.data)
            {
                let searchRecords = [];

                for(let record  of this.data)
                {
                    let valuesArray = Object.values(record);

                    for (let val of valuesArray) 
                    {
                        console.log('val is ' + val);
                        let strVal = String(val);
 
                        if (strVal) 
                        {
 
                            if (strVal.toLowerCase().includes(searchKey))  
                            {
                                searchRecords.push(record);
                                break;
                            }
                        }
                    }
                }
                console.log('Matched Accounts are ' + JSON.stringify(searchRecords));
                this.data = searchRecords;
            }
        }
        else 
        {
            this.data = this.initialRecords;
        }

    }

    /*****************************************************************************/ 
    //////// publish////////
    handleClick(event)
    {
        event.preventDefault();
        const message = 
        {
                  recordId:event.target.dataset.actid,
                  recordData:{value:"Message from First LWC"}
        };

        publish(this.context,SAMPLEMC,message);
    }

    ///////Publisher////////


///////subscriber/////
connectedCallback()
{

    this.subscribeMC();
}

subscribeMC() 
{

    if (this.subscription) 
    {
        return;
    }
    this.subscription = subscribe(this.context,ANOTHERMC,(message) => 
    {
        this.handleMessage(message);
    },{scope:APPLICATION_SCOPE});

}

handleMessage(message)
{
    refreshApex(this.data)
    this.receivedMessage = message ? message.newrecordData.value : 'no message payload';
}   
disconnectedCallback() 
{
  releaseMessageContext(this.context);
}
///////subscriber/////

/*****************************************************************************/


}