import { LightningElement ,wire} from 'lwc';
import getBusData from '@salesforce/apex/LWCController.getBusData';

export default class BusBeerList extends LightningElement 
{
    //wire decorator to get data
    @wire(getBusData)
    buses;
}