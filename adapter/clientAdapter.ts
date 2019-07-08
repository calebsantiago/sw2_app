import mongoose from 'mongoose'
import {Client} from '../dao/clientDAO'
export abstract class ClientAdapter {
    abstract insert(email : string, password : string, image : string, firstname : string, lastname : string, gender : string, birthdate : string, phonenumber : number, address : string, latitude : number, longitude : number) : void
    abstract findbyid(id : string) : mongoose.DocumentQuery<Client | null, Client, {}>
    abstract findbyemail(email : string) : mongoose.DocumentQuery<Client | null, Client, {}>
    abstract findbyphonenumber(phonumber : number) :mongoose.DocumentQuery<Client | null, Client, {}>
    abstract updateprofile(id : string, firstname : string, lastname : string, email : string, password : string, image : string, phonenumber : number) : void
    abstract updatelocation(id : string, address : string, latitude : number, longitude : number) : void
    abstract delete(id : string) : void
}