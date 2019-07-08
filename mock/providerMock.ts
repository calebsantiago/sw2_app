import mongoose from 'mongoose'
import {Provider, ProviderDAO} from '../dao/providerDAO'
import {ProviderAdapter} from '../adapter/providerAdapter'
export class ProviderMock extends ProviderAdapter {
    static INSTANCE : ProviderMock | undefined
    private constructor() {
        super()
    }
    static getInstance() : ProviderMock {
        if (ProviderMock.INSTANCE == undefined) {
            ProviderMock.INSTANCE = new ProviderMock()
        }
        return ProviderMock.INSTANCE
    }
    insert(email : string, password : string, image : string, firstname : string, lastname : string, gender : string, birthdate : string, phonenumber : number, address : string, latitude : number, longitude : number, idcard : number, video : string, description : string, certificate : string, service : string) : void {
        new ProviderDAO({
            _id: new mongoose.Types.ObjectId(),
            account : {
                email : email,
                password : password,
                image : image
            },
            name : {
                firstname : firstname,
                lastname : lastname
            },
            gender : gender,
            birthdate : birthdate,
            idcard : idcard,
            phonenumber : phonenumber,
            address :  address,
            coordinate : {
                latitude : latitude,
                longitude : longitude
            },
            video : video,
            description : description,
            certificate : certificate,
            service : {
                title : service
            }
        }).save((error) => {
            if (error) {
                console.log(error)
            }
        })
    }
    findall() : mongoose.DocumentQuery<Provider[] | null, Provider, {}> {
        return ProviderDAO.find({}, (error) => {
            if (error) {
                console.log(error)
            }
        })
    }
    findbyservicesaveragerate(services : string) : Promise<any[]> {
        return ProviderDAO.aggregate([
            {
                $lookup : {
                    from : 'quotations',
                    localField : '_id',
                    foreignField : '_id_provider',
                    as : 'fromQuotations'
                }
            },
            {
                $match : {
                    service : {
                        title : services
                    }
                }
            },
            {
                $project : {
                    name : 1,
                    service : 1,
                    description :1,
                    average : {
                        $avg : '$fromQuotations.rate'
                    },
                    coordinate : 1
                }
            }
        ], (error : any) => {
            if (error) {
                console.log(error)
            }
        })
    }
    findbyid(id : string) : mongoose.DocumentQuery<Provider | null, Provider, {}> {
        return ProviderDAO.findOne({_id : mongoose.Types.ObjectId(id)}, (error) => {
            if (error) {
                console.log(error)
            }
        })
    }
    findbyemail(email : string) : mongoose.DocumentQuery<Provider | null, Provider, {}> {
        return ProviderDAO.findOne({'account.email' : email}, (error) => {
            if (error){
                console.log(error)
            }
        })
    }
    findbyphonenumber(phonenumber : number) : mongoose.DocumentQuery<Provider | null, Provider, {}> {
        return ProviderDAO.findOne({phonenumber : phonenumber}, (error) => {
            if (error){
                console.log(error)
            }
        })
    }
    updateprofile(id : string, firstname : string, lastname : string, email : string, password : string, image : string, phonenumber : number, idcard : number, video : string, description : string, certificate : string, service : string) : void {
        ProviderDAO.updateOne({_id : mongoose.Types.ObjectId(id)}, {name : {firstname : firstname, lastname : lastname}, account : {email : email, password : password, image : image}, phonenumber : phonenumber, idcard : idcard, video : video, description : description, certificate : certificate, service : {title : service}}, (error) => {
            if (error) {
                console.log(error)
            }
        })
    }
    updatelocation(id : string, address : string, latitude : number, longitude : number) : void {
        ProviderDAO.updateOne({_id : mongoose.Types.ObjectId(id)}, {address : address, coordinate : {latitude : latitude, longitude : longitude}}, (error) => {
            if (error) {
                console.log(error)
            }
        })
    }
    delete(id : string) : void {
        ProviderDAO.deleteOne({_id : mongoose.Types.ObjectId(id)}, (error) => {
            if (error) {
                console.log(error)
            }
        })
    }
}