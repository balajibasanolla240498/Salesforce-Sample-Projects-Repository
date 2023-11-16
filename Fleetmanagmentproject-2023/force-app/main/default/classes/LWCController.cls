public with sharing class LWCController {
    public LWCController() {

    }

    @AuraEnabled(Cacheable=true)
    public static List<Bus__c> getBusData(String searchKey)
    {
        

        return [Select Id,Name,Resale_Value__c, year__c, Bus_Image__c,Odometer_Reading__c, Maximum_Capacity__c  
                from Bus__c 
                with SECURITY_ENFORCED 
                limit 50000];
        

        
        /*
        List<Bus__c> ListOfBuses;

        //Try to get Bus__c Data from Object.
        try 
        {
            ListOfBuses = [Select Id,Name,Resale_Value__c, year__c, Bus_Image__c, 
                           Odometer_Reading__c, Maximum_Capacity__c  
                           from Bus__c 
                           with SECURITY_ENFORCED 
                           limit 50000];
                           system.System.debug('List of Busses Records----->'+ListOfBuses);

        } 
        //Else show an error / Exception 
        catch (Exception e) 
        {
            System.debug('in catch:='+e.getStackTraceString());
        }

        //if data is there return into this list variable List<Bus__c> ListOfBuses;
        if(ListOfBuses.size()>0)
        {
            return ListOfBuses;
        }
        else 
        {
            return null;
        }
        
    }
    */
}