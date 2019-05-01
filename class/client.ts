import {User} from './user';
import {connectDB} from '../connection';
import {client_model} from '../schema/client';
import mongoose from 'mongoose';

export class Client extends User {
    constructor(username : string, password : string, image : string, account : string, firstname : string, lastname : string, gender : string, birthdate : string, phonenumber : number, email : string, address :  string, latitude : number, longitude : number) {
        super(username, password, image, account, firstname, lastname, gender, birthdate, phonenumber, email, address, latitude, longitude);
    }
    public createAccount() : void {
        connectDB();
        let model = new client_model({
            _id: new mongoose.Types.ObjectId(),
            account : {
                username : this.getUsername(),
                password : this.getPassword(),
                image : this.getImage()
            },
            name : {
                firstname : this.getFirstname(),
                lastname : this.getLastname()
            },
            gender : this.getGender(),
            birthdate : this.getBirthdate(),
            phonenumber : this.getPhonenumber(),
            email : this.getEmail(),
            address :  this.getAddres(),
            coordinate : {
                latitude : this.getCoordinate()[0],
                longitude : this.getCoordinate()[1]
            }
        });
        console.log(model);
        model.save((error) => {
            if(error) {
                console.log(error);
            }
        });
    }
    public updateAccount(id : string) {
        connectDB();
        client_model.updateOne({_id : id}, {
            account : {
                username : this.getUsername(),
                password : this.getPassword(),
                image : this.getImage()
            },
            name : {
                firstname : this.getFirstname(),
                lastname : this.getLastname()
            },
            gender : this.getGender(),
            birthdate : this.getBirthdate(),
            phonenumber : this.getPhonenumber(),
            email : this.getEmail(),
            address :  this.getAddres(),
            coordinate : {
                latitude : this.getCoordinate()[0],
                longitude : this.getCoordinate()[1]
            }
        }, (error) => {
            if(error) {
                console.log(error);
            }
        });
    }
    public deleteAccount(id : string) : void {
        connectDB();
        client_model.deleteOne({_id : id}, (error) => {
            if(error) {
                console.log(error);
            }
        });
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