import { LightningElement,wire,api } from 'lwc';
import getLeaveRequests from '@salesforce/apex/LeaveRequstController.getLeaveRequests';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';
import Id from '@salesforce/user/Id';
import {refreshApex} from '@salesforce/apex';

const COLUMNS =
            [ 
                {label :'Request Id' , fieldName : 'Name',cellAttributes : {class:{fieldName:'cellClass'}}},
                {label :'User' , fieldName : 'userName',cellAttributes : {class:{fieldName:'cellClass'}}},
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

export default class LeaveRequests extends LightningElement 
{
columns = COLUMNS;
leaveRequests = [];
leaveRequestsWireResults;
showModelpopup = false;
objectApiName = 'LeaveRequest__c';
recordId = '';
currentUserId = Id;


@wire(getLeaveRequests)
wiredMyLeaves({data,error})
{
    this.leaveRequestsWireResults = data;

    if(data)
    {
        this.leaveRequests = data.map(a=>({
            ...a,
            userName:a.User__r.Name,
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
    return this.leaveRequests.length == 0;
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
    this.refreshGrid();
    //refreshApex(this.leaveRequestsWireResults);

}

@api
refreshGrid()
{
    refreshApex(this.leaveRequestsWireResults);
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
    
    
}