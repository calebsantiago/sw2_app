import mongoose from 'mongoose'
import {Client, ClientDAO} from '../dao/clientDAO'
import ClientAdapter from '../adapter/clientAdapter'
export default class ClientMock extends ClientAdapter {
    static INSTANCE : ClientMock | undefined
    private constructor() {
        super()
    }
    static getInstance() : ClientMock {
        if (ClientMock.INSTANCE == undefined) {
            ClientMock.INSTANCE = new ClientMock()
        }
        return ClientMock.INSTANCE
    }
    insert(email : string, password : string, image : string, firstname : string, lastname : string, gender : string, birthdate : string, phonenumber : number, address : string, latitude : number, longitude : number) : void {
        new ClientDAO({
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
            phonenumber : phonenumber,
            address :  address,
            coordinate : {
                latitude : latitude,
                longitude : longitude
            }
        }).save((error) => {
            if (error) {
                console.log(error)
            }
        })
    }
    findbyid(id : string) : mongoose.DocumentQuery<Client | null, Client, {}> {
        return ClientDAO.findOne({_id : mongoose.Types.ObjectId(id)}, (error) => {
            if (error) {
                console.log(error)
            }
        })
    }
    findbyemail(email : string) : mongoose.DocumentQuery<Client | null, Client, {}> {
        return ClientDAO.findOne({'account.email' : email}, (error) => {
            if (error){
                console.log(error)
            }
        })
    }
    findbyphonenumber(phonenumber : number) : mongoose.DocumentQuery<Client | null, Client, {}> {
        return ClientDAO.findOne({phonenumber : phonenumber}, (error) => {
            if (error){
                console.log(error)
            }
        })
    }
    updateprofile(id : string, firstname : string, lastname : string, email : string, password : string, image : string, phonenumber : number) : void {
        ClientDAO.updateOne({_id : mongoose.Types.ObjectId(id)}, {name : {firstname : firstname, lastname : lastname}, account : {email : email, password : password, image : image}, phonenumber : phonenumber}, (error) => {
            if (error) {
                console.log(error)
            }
        })
    }
    updatelocation(id : string, address : string, latitude : number, longitude : number) : void {
        ClientDAO.updateOne({_id : mongoose.Types.ObjectId(id)}, {address : address, coordinate : {latitude : latitude, longitude : longitude}}, (error) => {
            if (error) {
                console.log(error)
            }
        })
    }
    delete(id : string) : void {
        ClientDAO.deleteOne({_id : mongoose.Types.ObjectId(id)}, (error) => {
            if (error) {
                console.log(error)
            }
        })
    }
}