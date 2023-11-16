import { LightningElement } from 'lwc';

export default class LeaveTracker extends LightningElement 
{
    refreshleaveRequestHandler(event)
    {
        this.refs.myLeavescomp.refreshGrid();
    }
}