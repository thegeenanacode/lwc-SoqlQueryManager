import { LightningElement, track, wire, api } from 'lwc';
import executeSOQL from '@salesforce/apex/SOQLQueryManagerController.executeSOQL';

export default class SoqlQueryManager extends LightningElement {
    @track soqlQuery;
    @track queryResults;
    @track columns;  // This should be dynamically set based on the query results if possible
    @track error;

    handleQueryChange(event) {
        console.log('handleQueryChange is called');
        this.soqlQuery = event.target.value;
    }

    executeQuery() {
        executeSOQL({ query: this.soqlQuery })
            .then(result => {
                this.queryResults = result;
                this.columns = Object.keys(result[0]).map(key => ({
                    label: key,
                    fieldName: key,
                    type: 'text'
                }));
            })
            .catch(error => {
                this.error = error;
                this.queryResults = undefined;
            });
    }
}
