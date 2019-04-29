import {User} from './user';
export class Provider extends User {
    idcard : number;
    service : string[];
    description : string;
    constructor(username : string, password : string, account : string, name : string, lastname : string, gender : string, birthdate : string, phonenumber : number, email : string, address :  string, latitude : number, longitude : number, idcard : number, service : string, description : string) {
        super(username, password, account, name, lastname, gender, birthdate, phonenumber, email, address, latitude, longitude);
        this.idcard = idcard;
        this.service = [service];
        this.description = description;
    }
    public getIdcard() : number {
		return this.idcard;
	}
	public setIdcard(idcard : number) : void {
		this.idcard = idcard;
    }
    public getService() : string[] {
		return this.service;
	}
	public setService(service : string, newService : string) : void {
        let index = 0;
        let state = false;
        while (index < this.service.length && state == false) {
            if(this.service[index].toLowerCase == service.toLowerCase){
                state = true;
            }
            else {
                index++;
            }
        }
        if (state == true){
            this.service.splice(index,1,newService);
        }
    }
    public getDescription() : string {
		return this.description;
	}
	public setDescription(description : string) : void {
		this.description = description;
    }
    public addService(service : string) {
        this.service.splice(service.length,0,service);
    }
    public deleteService(service : string) {
        let index = 0;
        let state = false;
        while (index < this.service.length && state == false) {
            if(this.service[index].toLowerCase == service.toLowerCase){
                state = true;
            }
            else {
                index++;
            }
        }
        if (state == true) {
            this.service.splice(index,1);
        }
    }
    public quoteService() : void {
        console.log('quote service');
    }
    public responseService() : void {
        console.log('response service');
    }
    public changeStatus() : void {
        console.log('change status');
    }
    public checkHistory() : void {
        console.log('check history');
    }
}