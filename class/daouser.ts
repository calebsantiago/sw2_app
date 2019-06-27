import {connectDB} from './../connection';
import {client_model} from './../schema/client';
import {provider_model} from './../schema/provider';
import {DocumentQuery} from 'mongoose';
import nodemailer from 'nodemailer';
export class User{
    firstname : string;
    lastname : string;
    gender : string;
    birthdate : string;
    phonenumber : number;
    email : string;
    password : string;
    confirm_password : string;
    image :  string;
    account : string;
    address :  string;
    coordinate : [number, number];
    constructor(firstname : string, lastname : string, gender : string, birthdate : string, phonenumber : number, email : string, password : string, confirm_password : string, image : string, account : string,  address :  string, latitude : number, longitude : number) {
        this.firstname = firstname;
        this.lastname = lastname;
        this.gender = gender;
        this.birthdate = birthdate;
        this.phonenumber = phonenumber;
        this.email = email;
        this.password = password;
        this.confirm_password = confirm_password;
        this.image = image;
        this.account = account;
        this.address = address;
        this.coordinate = [latitude, longitude];
    }
}
export abstract class UserAdapter{
    abstract getFirstname() : string | undefined
    abstract setFirstname(firstname : string) : void
    abstract getLastname() : string | undefined
    abstract setLastname(lastname : string) : void
    abstract getGender() : string | undefined
    abstract setGender(gender : string) : void
    abstract getBirthdate() : string | undefined
    abstract setBirthdate(birthdate : string) : void
    abstract getPhonenumber() : number | undefined
    abstract setPhonenumber(phonenumber : number) : void
    abstract getEmail() : string | undefined
    abstract setEmail(email : string) : void
    abstract getPassword() : string | undefined
    abstract setPassword(password : string) : void
    abstract getConfirm_password() : string | undefined
    abstract setConfirm_password(confirm_password : string) : void
    abstract getImage() : string | undefined
    abstract setImage(image : string) : void
    abstract geAccount() : string | undefined
    abstract setAccount(account : string) : void
    abstract getAddress() : string | undefined
    abstract setAddress(address : string) :void
    abstract getCoordinate() : number[] | undefined
    abstract setCoordinate(latitude : number, longitude : number) : void
    abstract getAge(birthdate : string) : number 
    abstract validateSignUp() : any[] 
    abstract validateLogin(email : string, password : string) : any[]
    abstract anotherAccount() : DocumentQuery<any , any , {}>[] | undefined
    abstract createAccount() : void
    abstract senMail() : void
    abstract logIn(email : string) : any
    abstract logOut() : void
    abstract updateAccount(id : string) : void
    abstract deleteAccount(id : string) : void
}