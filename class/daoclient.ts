import { User, UserAdapter } from "./daouser";
import {connectDB} from '../connection';
import {client_model} from '../schema/client';
import mongoose from 'mongoose';


export class Client extends User{
    constructor(firstname : string, lastname : string, gender : string, birthdate : string, phonenumber : number, email : string, password : string, confirm_password : string, image : string, account : string, address :  string, latitude : number, longitude : number) {
        super(firstname, lastname, gender, birthdate, phonenumber, email, password, confirm_password, image, account, address, latitude, longitude);
    }
}

export abstract class ClientAdapter extends UserAdapter{
    abstract validateSignUp() : any[] 
    abstract createAccount() : void
    abstract logIn(email : string) : any
    abstract updateAccount(id : string) : void
    abstract deleteAccount(id : string) : void
    abstract searchService() : void
    abstract requestQutatio() : void
    abstract checkQuotations() : void
    abstract responseQuotation() : void
    abstract cancelService() : void
    abstract rateService() : void
    abstract reportService() : void
    abstract checkHistory() : void
}