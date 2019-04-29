import {User} from './user';
export class Client extends User {
    constructor(username : string, password : string, account : string, name : string, lastname : string, gender : string, birthdate : string, phonenumber : number, email : string, address :  string, latitude : number, longitude : number) {
        super(username, password, account, name, lastname, gender, birthdate, phonenumber, email, address, latitude, longitude);
    }
    public searchService() : void {
        console.log('search service');
    }
    public requestQuotation() : void {
        console.log('request quotation');
    }
    public responseQuotation() : void {
        console.log('response quotation');
    }
    public cancelService() : void {
        console.log('cancel service');
    }
    public rateService() : void {
        console.log('rate service');
    }
    public reportService() : void {
        console.log('report service');
    }
    public checkHistory() : void {
        console.log('check history');
    }
}