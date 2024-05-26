public with sharing class SOQLQueryManagerController {
    @AuraEnabled
    public static List<sObject> executeSOQL(String query) {
        try {
            return Database.query(query);
        } catch (Exception e) {
            throw new AuraHandledException('Invalid SOQL Query: ' + e.getMessage());
        }
    }
}
