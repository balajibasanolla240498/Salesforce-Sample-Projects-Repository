public with sharing class lwc_contact_controller 
{
    @AuraEnabled(cacheable=true)
    public static List<Contact> getContactList() 
    {
        return [
            SELECT
                Id,
                Name,
                FirstName,
                LastName,
                Title,
                Phone,
                Email,
                Picture__c
            FROM Contact
            WHERE Picture__c != NULL
            WITH USER_MODE
            
        ];
    }
    
}