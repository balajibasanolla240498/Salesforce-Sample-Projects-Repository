import { LightningElement,wire } from 'lwc';
import getMyLeaves from '@salesforce/apex/LeaveRequstController.getMyLeaves';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';
import Id from '@salesforce/user/Id';
import {refreshApex} from '@salesforce/apex';

const COLUMNS =
                [ 
                    {label :'Request Id' , fieldName : 'Name',cellAttributes : {class:{fieldName:'cellClass'}}},
                    {label :'From Date' , fieldName : 'From_Date__c',cellAttributes : {class:{fieldName:'cellClass'}}},
                    {label :'To Date' , fieldName : 'To_Date__c',cellAttributes : {class:{fieldName:'cellClass'}}},
                    {label :'Reason' , fieldName : 'Reason__c',cellAttributes : {class:{fieldName:'cellClass'}}},
                    {label :'Status' , fieldName : 'Status__c',cellAttributes : {class:{fieldName:'cellClass'}}},
                    {label :'Manager Comment' , fieldName : 'Manager_Comment__c',cellAttributes : {class:{fieldName:'cellClass'}}},
                    {
                        type:"button" , typeAttributes : 
                        {
                            label : 'Edit',
                            name : 'Edit',
                            title : 'Edit',
                            value : 'edit',
                            disabled : {fieldName : 'isEditDisabled'}
                        },cellAttributes : {class:{fieldName:'cellClass'}}
                    }
                ];

export default class MyLeaves extends LightningElement 
{
    columns = COLUMNS;
    myLeaves = [];
    myLeavesWireResults;
    showModelpopup = false;
    objectApiName = 'LeaveRequest__c';
    recordId = '';
    currentUserId = Id;
    

    @wire(getMyLeaves)
    wiredMyLeaves({data,error})
    {
        this.myLeavesWireResults = data;

        if(data)
        {
            this.myLeaves = data.map(a=>({
                ...a,
                cellClass:a.Status__c == 'Approved'?'slds-theme_success'
                         :a.Status__c == 'Rejected'?'slds-theme_warning'
                         :'',
                         isEditDisabled:a.Status__c != 'Pending'

            }));
        }
        if (error) 
        {
            console.error('Error occurred retrieving Case records...');
        }
    }

    get noRecordsFound()
    {
        return this.myLeaves.length == 0;
    }

    newRequestClickHandler()
    {
        this.showModelpopup = true;
        this.recordId = '';
    }

    popupClosedHandler()
    {
        this.showModelpopup = false;
    }

    rowactionHandler(event)
    {
        this.showModelpopup = true;
        this.recordId = event.detail.row.Id;
    }

    successHandler(event)
    {
        this.showModelpopup =  false;                                                   
        this.ShowToast = 'Data saved successfully';
        refreshApex(this.myLeavesWireResults);

        //custome event
        const refreshEvent =  new customEvent('refreshleaverequests');
        this.dispatchEvent(refreshEvent);

    }
    submitHandler(event)
    {
        event.preventDefault();
        const fields ={...event.detail.fields};
        fields.Status__c = 'Pending';
        if(new Date(fields.From_Date__c) > new Date(fields.To_Date__c))
        {
            this.ShowToast('From Date should not be greater then To Date','Error','error');
        }
        else if(new Date() > new Date(fields.From_Date__c))
        {
            this.ShowToast('From Date should not be less then Today','Error','error');
        }
        else
        {
            this.refs.leveRequestFrom.submit(fields);
        }
    }

        
        ShowToast(message,title='success',variant='success')
        {
            const event = new ShowToastEvent
            ({
                title,
                message,
                variant
            });
            this.dispatchEvent(event);
        }
        
        /*
    showToast(message,title,variant) 
    {
        const event = new ShowToastEvent
        ({
            title: 'Get Help',
            message:'Data Saved Successfully',
            variant:'SUCCESS'
        });
        this.dispatchEvent(event);
    }
    */

    
}