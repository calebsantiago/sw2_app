import { ProviderAdapter, Provider } from "./daoprovider";
import {connectDB} from '../connection';
import {provider_model} from '../schema/provider';
import mongoose from 'mongoose';
import nodemailer from 'nodemailer';

export class MockProviderAdapter extends ProviderAdapter{

    static INSTANCE : MockProviderAdapter | null

    providers : Provider[] = []    

    private constructor(){
        super()
    }

    static getInstance()
    {
        if (MockProviderAdapter.INSTANCE == null)
        {
            MockProviderAdapter.INSTANCE = new MockProviderAdapter()            
        }
        return MockProviderAdapter.INSTANCE
    }
    getIdcard(): number | undefined {
        for(let i = 0 ; i < this.providers.length;i++){
            return this.providers[i].idcard
        }
    }
    setIdcard(idcard: number): void {
        for(let i = 0 ; i < this.providers.length;i++){
            this.providers[i].idcard = idcard
        }
    }
    getVideo(): string | undefined {
        for(let i = 0 ; i < this.providers.length;i++){
            return this.providers[i].video
        }
    }
    setvideo(video: string): void {
        for(let i = 0 ; i < this.providers.length;i++){
            this.providers[i].video = video
        }
    }
    getDescription(): string | undefined {
        for(let i = 0 ; i < this.providers.length;i++){
            return this.providers[i].description 
        }
    }
    setDescription(description: string): void {
        for(let i = 0 ; i < this.providers.length;i++){
            this.providers[i].description = description
        }
    }
    getCertificate(): string | undefined {
        for(let i = 0 ; i < this.providers.length;i++){
            return this.providers[i].certificate
        }
    }
    setCertificate(certificate: string): void {
        for(let i = 0 ; i < this.providers.length;i++){
            this.providers[i].certificate = certificate
        }
    }
    getService(): string[] | undefined {
        for(let i = 0 ; i < this.providers.length;i++){
            return this.providers[i].service
        }
    }
    setService(service: string, newService: string): void {
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
    validateSignUp(): any[] {
        let date_expression : RegExp = /[0-9]{4}-[0-9]{2}-[0-9]{2}/;
        let phone_expression : RegExp = /[0-9]{9}/;
        let email_expression : RegExp = /[^@\s]+@[^@\s]+\.[^@\s]+/;
        let url_expression : RegExp = /^(?:http(s)?:\/\/)?[\w.-]+(?:\.[\w\.-]+)+[\w\-\._~:/?#[\]@!\$&'\(\)\*\+,;=.]+/;
        let id_expression : RegExp = /[0-9]{8}/;
        let errors : any[] = [];
        if (this.getFirstname() === "" || this.getLastname() === "" || this.getGender() === "" || this.getBirthdate() === "" || this.getPhonenumber() === 0 || this.getEmail() === "" || this.getPassword() === "" || this.getConfirm_password() === "" || this.getAccount() === "" || this.getAddress() === "" || this.getCoordinate()[0] === 0 || this.getCoordinate()[1] === 0 || this.getIdcard() === 0 || this.getVideo() === "" || this.getDescription() === "" || this.getService()[0] === "") {
            errors.push({text : 'debes completar los campos.'});
        }
        else {
            if (!date_expression.test(this.getBirthdate())) {
                errors.push({text : 'fecha de nacimiento no válido.'});
            }
            if (this.getAge(this.getBirthdate()) < 18) {
                errors.push({text : 'eres menor de 18 años.'});
            }
            if (!phone_expression.test(this.getPhonenumber().toString())) {
                errors.push({text : 'número de teléfino no válido.'});
            }
            if (!email_expression.test(this.getEmail())) {
                errors.push({text : 'correo electrónico no válido.'});
            }
            if (this.getPassword() != this.getConfirm_password()) {
                errors.push({text : 'contraseñas no coinciden.'});
            }
            if (!isFinite(this.getCoordinate()[0])) {
                errors.push({text : 'latitud no válido.'});
            }
            if (!isFinite(this.getCoordinate()[1])) {
                errors.push({text : 'longitud no válido.'});
            }
            if (this.getImage() != "") {
                if (!url_expression.test(this.getImage())) {
                    errors.push({text : 'link imagen no válido.'});
                }
            }
            if (!id_expression.test(this.getIdcard().toString())) {
                errors.push({text : 'dni no válido.'});
            }
            if (!url_expression.test(this.getVideo())) {
                errors.push({text : 'link video no válido.'});
            }
            if (this.getCertificate() != "") {
                if (!url_expression.test(this.getCertificate())) {
                    errors.push({text : 'link certificado no válido.'});
                }
            }
        }
        return errors;
    }
    createAccount(): void {
        connectDB();
        let model = new provider_model({
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
            idcard : this.getIdcard(),
            phonenumber : this.getPhonenumber(),
            address :  this.getAddress(),
            coordinate : {
                latitude : this.getCoordinate()[0],
                longitude : this.getCoordinate()[1]
            },
            video : this.getVideo(),
            description : this.getDescription(),
            certificate : this.getCertificate(),
            service : {
                title : this.getService()[0]
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
            doc = provider_model.findOne({'account.email' : email}, (error) => {
                if(error) {
                    console.log(error);
                }
            });
        }
        else {
            doc = provider_model.findOne({phonenumber : email}, (error) => {
                if(error) {
                    console.log(error);
                }
            });
        }
        return doc
    }
    updateAccount(id: string): void {
        connectDB();
        provider_model.updateOne({_id : id}, {
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
            idcard : this.getIdcard(),
            phonenumber : this.getPhonenumber(),
            address :  this.getAddress(),
            coordinate : {
                latitude : this.getCoordinate()[0],
                longitude : this.getCoordinate()[1]
            },
            video : this.getVideo(),
            description : this.getDescription(),
            certificate : this.getCertificate(),
            service : {
                type : this.getService()
            }
        }, (error) => {
            if(error) {
                console.log(error);
            }
        });
    }
    deleteAccount(id: string): void {
        connectDB();
        provider_model.deleteOne({_id : id}, (error) => {
            if(error) {
                console.log(error);
            }
        });
    }
    addService(service: string): void {
        this.service.splice(service.length,0,service);
    }
    deleteService(service: string): void {
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
    checkQuotations(): void {
        console.log('check quotations');
    }
    quoteService(): void {
        console.log('quote service');
    }
    responseService(): void {
        console.log('response service');
    }
    changeStatus(): void {
        console.log('change status');
    }
    checkHistory(): void {
        console.log('check history');
    }
    getFirstname(): string  | undefined{
        for(let i = 0; i < this.providers.length ; i++){
            return this.providers[i].firstname
        }        
    }
    setFirstname(firstname: string): void {
        for(let i = 0; i < this.providers.length ; i++){
            this.providers[i].firstname=firstname
        }
    }
    getLastname(): string | undefined {
        for(let i = 0; i < this.providers.length; i++){
            return this.providers[i].lastname
        }       
    }
    setLastname(lastname: string): void {
        for(let i = 0; i < this.providers.length; i++){
            this.providers[i].lastname = lastname
        }
    }
    getGender(): string | undefined {
        for(let i = 0; i < this.providers.length; i++){
            return this.providers[i].gender
        }
    }
    setGender(gender: string): void {
        for(let i = 0; i < this.providers.length; i++){
            this.providers[i].gender = gender
        }
    }
    getBirthdate(): string | undefined {
        for(let i = 0; i < this.providers.length; i++){
            return this.providers[i].birthdate
        }
    }
    setBirthdate(birthdate: string): void {
        for(let i = 0; i < this.providers.length; i++){
            this.providers[i].birthdate = birthdate
        }
    }
    getPhonenumber(): number | undefined {
        for(let i = 0; i < this.providers.length; i++){
            return this.providers[i].phonenumber
        }
    }
    setPhonenumber(phonenumber: number): void {
        for(let i = 0; i < this.providers.length; i++){
            this.providers[i].phonenumber = phonenumber
        }
    }
    getEmail(): string | undefined {
        for(let i = 0; i < this.providers.length; i++){
            return this.providers[i].email
        }
    }
    setEmail(email: string): void {
        for(let i = 0; i < this.providers.length; i++){
            this.providers[i].email = email
        }            
    }
    getPassword(): string | undefined {
        for(let i = 0; i < this.providers.length; i++){
            return this.providers[i].password
        }
    }
    setPassword(password: string): void {
        for(let i = 0; i < this.providers.length; i++){
            this.providers[i].password = password
        }
    }
    getConfirm_password(): string | undefined { 
        for(let i = 0; i < this.providers.length; i++){
            return this.providers[i].confirm_password
        }
    }
    setConfirm_password(confirm_password: string): void {
        for(let i = 0; i < this.providers.length; i++){
            this.providers[i].confirm_password = confirm_password
        }
    }
    getImage(): string | undefined{
        for(let i = 0; i < this.providers.length; i++){
            return this.providers[i].image
        }
    }
    setImage(image: string): void {
        for(let i = 0; i < this.providers.length; i++){
            this.providers[i].image = image
        }
    }
    geAccount(): string | undefined {
        for(let i = 0; i < this.providers.length; i++){
            return this.providers[i].account
        }
    }
    setAccount(account: string): void {
        for(let i = 0; i < this.providers.length; i++){
            this.providers[i].account = account
        }
    }
    getAddress(): string | undefined {
        for(let i = 0; i < this.providers.length; i++){
            return this.providers[i].address
        }
    }
    setAddress(address: string): void {
        for(let i = 0; i < this.providers.length; i++){
            this.providers[i].address = address
        }
    }
    getCoordinate(): number[] | undefined {
        for(let i = 0; i < this.providers.length; i++){
            return this.providers[i].coordinate
        }
    }
    setCoordinate(latitude: number, longitude: number): void {
        for(let i = 0; i < this.providers.length; i++){
            this.providers[i].coordinate = [latitude, longitude]
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
        for(let i = 0 ;  i < this.providers.length ; i++){
            let doc1 = provider_model.findOne({'phonenumber' : this.getPhonenumber()}, (error) => {
                if (error){
                    console.log(error);
                }
            });
            let doc2 = provider_model.findOne({'account.email' : this.getEmail()}, (error) => {
                if (error){
                    console.log(error);
                }
            });
            let doc3 = provider_model.findOne({'phonenumber' : this.getPhonenumber()}, (error) => {
                if (error){
                    console.log(error);
                }
            });
            let doc4 = provider_model.findOne({'account.email' : this.getEmail()}, (error) => {
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