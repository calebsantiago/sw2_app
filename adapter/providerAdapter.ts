import mongoose from 'mongoose'
import {Provider} from '../dao/providerDAO'
export default abstract class ProviderAdapter {
    abstract insert(email : string, password : string, image : string, firstname : string, lastname : string, gender : string, birthdate : string, phonenumber : number, address : string, latitude : number, longitude : number, idcard : number, video : string, description : string, certificate : string, service : string) : void
    abstract findall() : mongoose.DocumentQuery<Provider[] | null, Provider, {}>
    abstract findbyservicesaveragerate(services : string) : Promise<any[]>
    abstract findbyid(id : string) : mongoose.DocumentQuery<Provider | null, Provider, {}>
    abstract findbyemail(email : string) : mongoose.DocumentQuery<Provider | null, Provider, {}>
    abstract findbyphonenumber(phonumber : number) :mongoose.DocumentQuery<Provider | null, Provider, {}>
    abstract updateprofile(id : string, firstname : string, lastname : string, email : string, password : string, image : string, phonenumber : number, idcard : number, video : string, description : string, certificate : string, service : string) : void
    abstract updatelocation(id : string, address : string, latitude : number, longitude : number) : void
    abstract delete(id : string) : void
}