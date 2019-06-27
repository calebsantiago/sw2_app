import { ClientAdapter, Client } from "./daoclient";
import {connectDB} from '../connection';
import {client_model} from '../schema/client';
import nodemailer from 'nodemailer';
import mongoose from 'mongoose';

export class MockClientAdapter extends ClientAdapter{

    static INSTANCE : MockClientAdapter | null

    clientes : Client[] = []

    private constructor(){
        super()
    }

    static getInstance()
    {
        if (MockClientAdapter.INSTANCE == null)
        {
            MockClientAdapter.INSTANCE = new MockClientAdapter()            
        }
        return MockClientAdapter.INSTANCE
    }

    validateSignUp(): any[] {
        let date_expression : RegExp = /[0-9]{4}-[0-9]{2}-[0-9]{2}/;
        let phone_expression : RegExp = /[0-9]{9}/;
        let email_expression : RegExp = /[^@\s]+@[^@\s]+\.[^@\s]+/;
        let url_expression : RegExp = /^(?:http(s)?:\/\/)?[\w.-]+(?:\.[\w\.-]+)+[\w\-\._~:/?#[\]@!\$&'\(\)\*\+,;=.]+/;
        let errors : any[] = [];
        if (this.getFirstname() === "" || this.getLastname() === "" || this.getGender() === "" || this.getBirthdate() === "" || this.getPhonenumber() === 0 || this.getEmail() === "" || this.getPassword() === "" || this.getConfirm_password() === "" || this.getAccount() === "" || this.getAddress() === "" || this.getCoordinate()[0] === 0 || this.getCoordinate()[1] === 0) {
            errors.push({text : 'debes completar los campos.'});
        }
        else {
            if (!date_expression.test(this.getBirthdate())) {
                errors.push({text : 'fecha de nacimiento no válido.'});
            }
            if (this.getAge(this.getBirthdate()) < 18) {
                errors.push({text : 'eres menor de 18 años.'});
            }
            if (!phone_expression.test(this.clientes.getPhonenumber().toString())) {
                errors.push({text : 'número de teléfono no válido.'});
            }
            if (!email_expression.test(this.getEmail())) {
                errors.push({text : 'correo electrónico no válido.'});
            }
            if (this.getPassword() != this.getConfirm_password()) {
                errors.push({text : 'contraseñas no coinciden.'});
            }
            if (!isFinite(this.clientes.getCoordinate()[0])) {
                errors.push({text : 'latitud no válido.'});
            }
            if (!isFinite(this.clientes.getCoordinate()[1])) {
                errors.push({text : 'longitud no válido.'});
            }
            if (this.getImage() != "") {
                if (!url_expression.test(this.clientes.getImage())) {
                    errors.push({text : 'link imagen no válido.'});
                }
            }
        }
        return errors;
    }    
    createAccount(): void {
        connectDB();
        let model = new client_model({
            _id: new mongoose.Types.ObjectId(),
            account : {
                email : this.getEmail(),
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
            address :  this.getAddress(),
            coordinate : {
                latitude : this.getCoordinate()[0],
                longitude : this.getCoordinate()[1]
            }
        });
        console.log(model);
        model.account.password = model.encryptPassword(this.getPassword());
        model.save((error : any) => {
            if (error) {
                console.log(error);
            }
        });
    }
    logIn(email: string) {
        connectDB();
        let email_expression : RegExp = /[^@\s]+@[^@\s]+\.[^@\s]+/;
        let doc;
        if (email_expression.test(email)) {
            doc = client_model.findOne({'account.email' : email}, (error) => {
                if(error) {
                    console.log(error);
                }
            });
        }
        else {
            doc = client_model.findOne({phonenumber : email}, (error) => {
                if(error) {
                    console.log(error);
                }
            });
        }
        return doc
    }
    updateAccount(id: string): void {
        connectDB();
        client_model.updateOne({_id : id}, {
            account : {
                email : this.getEmail(),
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
            address :  this.getAddress(),
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
    deleteAccount(id: string): void {
        connectDB();
        client_model.deleteOne({_id : id}, (error) => {
            if(error) {
                console.log(error);
            }
        });
    }
    searchService(): void {
        console.log('search service');
    }
    requestQutatio(): void {
        console.log('request quotation');
    }
    checkQuotations(): void {
        console.log('check quotations');
    }
    responseQuotation(): void {
        console.log('response quotation');
    }
    cancelService(): void {
        console.log('cancel service');
    }
    rateService(): void {
        console.log('rate service');
    }
    reportService(): void {
        console.log('report service');
    }
    checkHistory(): void {
        console.log('check history');
    }
    getFirstname(): string  | undefined{
        for(let i = 0; i < this.clientes.length ; i++){
            return this.clientes[i].firstname
        }        
    }
    setFirstname(firstname: string): void {
        for(let i = 0; i < this.clientes.length ; i++){
            this.clientes[i].firstname=firstname
        }
    }
    getLastname(): string | undefined {
        for(let i = 0; i < this.clientes.length; i++){
            return this.clientes[i].lastname
        }       
    }
    setLastname(lastname: string): void {
        for(let i = 0; i < this.clientes.length; i++){
            this.clientes[i].lastname = lastname
        }
    }
    getGender(): string | undefined {
        for(let i = 0; i < this.clientes.length; i++){
            return this.clientes[i].gender
        }
    }
    setGender(gender: string): void {
        for(let i = 0; i < this.clientes.length; i++){
            this.clientes[i].gender = gender
        }
    }
    getBirthdate(): string | undefined {
        for(let i = 0; i < this.clientes.length; i++){
            return this.clientes[i].birthdate
        }
    }
    setBirthdate(birthdate: string): void {
        for(let i = 0; i < this.clientes.length; i++){
            this.clientes[i].birthdate = birthdate
        }
    }
    getPhonenumber(): number | undefined {
        for(let i = 0; i < this.clientes.length; i++){
            return this.clientes[i].phonenumber
        }
    }
    setPhonenumber(phonenumber: number): void {
        for(let i = 0; i < this.clientes.length; i++){
            this.clientes[i].phonenumber = phonenumber
        }
    }
    getEmail(): string | undefined {
        for(let i = 0; i < this.clientes.length; i++){
            return this.clientes[i].email
        }
    }
    setEmail(email: string): void {
        for(let i = 0; i < this.clientes.length; i++){
            this.clientes[i].email = email
        }            
    }
    getPassword(): string | undefined {
        for(let i = 0; i < this.clientes.length; i++){
            return this.clientes[i].password
        }
    }
    setPassword(password: string): void {
        for(let i = 0; i < this.clientes.length; i++){
            this.clientes[i].password = password
        }
    }
    getConfirm_password(): string | undefined { 
        for(let i = 0; i < this.clientes.length; i++){
            return this.clientes[i].confirm_password
        }
    }
    setConfirm_password(confirm_password: string): void {
        for(let i = 0; i < this.clientes.length; i++){
            this.clientes[i].confirm_password = confirm_password
        }
    }
    getImage(): string | undefined{
        for(let i = 0; i < this.clientes.length; i++){
            return this.clientes[i].image
        }
    }
    setImage(image: string): void {
        for(let i = 0; i < this.clientes.length; i++){
            this.clientes[i].image = image
        }
    }
    geAccount(): string | undefined {
        for(let i = 0; i < this.clientes.length; i++){
            return this.clientes[i].account
        }
    }
    setAccount(account: string): void {
        for(let i = 0; i < this.clientes.length; i++){
            this.clientes[i].account = account
        }
    }
    getAddress(): string | undefined {
        for(let i = 0; i < this.clientes.length; i++){
            return this.clientes[i].address
        }
    }
    setAddress(address: string): void {
        for(let i = 0; i < this.clientes.length; i++){
            this.clientes[i].address = address
        }
    }
    getCoordinate(): number[] | undefined {
        for(let i = 0; i < this.clientes.length; i++){
            return this.clientes[i].coordinate
        }
    }
    setCoordinate(latitude: number, longitude: number): void {
        for(let i = 0; i < this.clientes.length; i++){
            this.clientes[i].coordinate = [latitude, longitude]
        }
    }
    getAge(birthdate: string): number {
        let today : Date = new Date();
        let age : number = today.getFullYear() - new Date(birthdate).getFullYear();
        let month : number = today.getMonth() - new Date(birthdate).getMonth();
        if (month < 0 || (month === 0 && today.getDate() < new Date(birthdate).getDate())) {
            age--;
        }
        return age;
    }    
    
    validateLogin(email: string, password: string): any[] {
        let email_expression : RegExp = /[^@\s]+@[^@\s]+\.[^@\s]+/;
        let phone_expression : RegExp = /[0-9]{9}/;
        let errors : any[] = [];
        if (email === "" || password === "") {
            errors.push({text : 'debes completar los campos.'});
        }
        else {
            if (!email_expression.test(email) && !phone_expression.test(email)) {
                errors.push({text : 'correo electrónico o número de teléfono no válido.'});
            }
        }
    return errors;
    }
    anotherAccount(): import("mongoose").DocumentQuery<any, any, {}>[] | undefined {
        connectDB();
        for(let i = 0 ;  i < this.clientes.length ; i++){
            let doc1 = client_model.findOne({'phonenumber' : this.getPhonenumber()}, (error) => {
                if (error){
                    console.log(error);
                }
            });
            let doc2 = client_model.findOne({'account.email' : this.getEmail()}, (error) => {
                if (error){
                    console.log(error);
                }
            });
            let doc3 = client_model.findOne({'phonenumber' : this.getPhonenumber()}, (error) => {
                if (error){
                    console.log(error);
                }
            });
            let doc4 = client_model.findOne({'account.email' : this.getEmail()}, (error) => {
                if (error){
                    console.log(error);
                }
            });
            return [doc1, doc2, doc3, doc4]
        }
    }    
    senMail(): void {
        let transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: 'contacta.no.reply@gmail.com',
                pass: 'contactasw2ulima'
            }
          });
          let mailOptions = {
              from: 'contacta.no.reply@gmail.com',
              to: this.getEmail(),
              subject: 'Contacta',
              text: 'Hola ' + this.getFirstname() + ' ' + this.getLastname() + ' te damos la bienvenida a Contacta.'
          };
          transporter.sendMail(mailOptions, (error: any, info: { response: string; }) => {
              if (error) {
                  console.log(error);
              }
              else {
                  console.log('Email sent: '+ info.response);
              }
          });
    }
    
    logOut(): void {
        console.log('log out')
    }

}