import mongoose from 'mongoose'
import {Quotation} from './../dao/quotationDAO';
export abstract class QuotationAdapter {
    abstract insert(id_client : string, id_provider: string, service : string, date : string, description : string, image : string) : void
    abstract findcheckbyclient(id : string) : Promise<any[]>
    abstract findcheckbyprovider(id : string) : Promise<any[]>
    abstract findbyid(id : string) : mongoose.DocumentQuery<Quotation | null, Quotation, {}>
    abstract findhistorybyclient(id : string) : Promise<any[]>
    abstract findhistorybyprovider(id : string) : Promise<any[]>
    abstract updatecost(id : string, cost : number) : void
    abstract updatestatus(id : string, status : string) : void
    abstract updateratecomment(id : string, rate : number, comment : string) : void
    abstract updatemanybyclient(id : string) : void
    abstract updatemanybyprovider(id : string) : void
}