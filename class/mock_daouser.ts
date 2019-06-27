import {User, UserAdapter} from './daouser'
import { connectDB } from '../connection';
import {client_model} from './../schema/client';
import {provider_model} from './../schema/provider';
import nodemailer from 'nodemailer';


export class MockUserAdapter extends UserAdapter{

    static INSTANCE : MockUserAdapter | null

    usuarios : User[] = []

    private constructor(){
        super()
    }

    static getInstance()
    {
        if (MockUserAdapter.INSTANCE == null)
        {
            MockUserAdapter.INSTANCE = new MockUserAdapter()            
        }
        return MockUserAdapter.INSTANCE
    }
    
    getFirstname(): string  | undefined{
        for(let i = 0; i < this.usuarios.length ; i++){
            return this.usuarios[i].firstname
        }        
    }
    setFirstname(firstname: string): void {
        for(let i = 0; i < this.usuarios.length ; i++){
            this.usuarios[i].firstname=firstname
        }
    }
    getLastname(): string | undefined {
        for(let i = 0; i < this.usuarios.length; i++){
            return this.usuarios[i].lastname
        }       
    }
    setLastname(lastname: string): void {
        for(let i = 0; i < this.usuarios.length; i++){
            this.usuarios[i].lastname = lastname
        }
    }
    getGender(): string | undefined {
        for(let i = 0; i < this.usuarios.length; i++){
            return this.usuarios[i].gender
        }
    }
    setGender(gender: string): void {
        for(let i = 0; i < this.usuarios.length; i++){
            this.usuarios[i].gender = gender
        }
    }
    getBirthdate(): string | undefined {
        for(let i = 0; i < this.usuarios.length; i++){
            return this.usuarios[i].birthdate
        }
    }
    setBirthdate(birthdate: string): void {
        for(let i = 0; i < this.usuarios.length; i++){
            this.usuarios[i].birthdate = birthdate
        }
    }
    getPhonenumber(): number | undefined {
        for(let i = 0; i < this.usuarios.length; i++){
            return this.usuarios[i].phonenumber
        }
    }
    setPhonenumber(phonenumber: number): void {
        for(let i = 0; i < this.usuarios.length; i++){
            this.usuarios[i].phonenumber = phonenumber
        }
    }
    getEmail(): string | undefined {
        for(let i = 0; i < this.usuarios.length; i++){
            return this.usuarios[i].email
        }
    }
    setEmail(email: string): void {
        for(let i = 0; i < this.usuarios.length; i++){
            this.usuarios[i].email = email
        }            
    }
    getPassword(): string | undefined {
        for(let i = 0; i < this.usuarios.length; i++){
            return this.usuarios[i].password
        }
    }
    setPassword(password: string): void {
        for(let i = 0; i < this.usuarios.length; i++){
            this.usuarios[i].password = password
        }
    }
    getConfirm_password(): string | undefined { 
        for(let i = 0; i < this.usuarios.length; i++){
            return this.usuarios[i].confirm_password
        }
    }
    setConfirm_password(confirm_password: string): void {
        for(let i = 0; i < this.usuarios.length; i++){
            this.usuarios[i].confirm_password = confirm_password
        }
    }
    getImage(): string | undefined{
        for(let i = 0; i < this.usuarios.length; i++){
            return this.usuarios[i].image
        }
    }
    setImage(image: string): void {
        for(let i = 0; i < this.usuarios.length; i++){
            this.usuarios[i].image = image
        }
    }
    geAccount(): string | undefined {
        for(let i = 0; i < this.usuarios.length; i++){
            return this.usuarios[i].account
        }
    }
    setAccount(account: string): void {
        for(let i = 0; i < this.usuarios.length; i++){
            this.usuarios[i].account = account
        }
    }
    getAddress(): string | undefined {
        for(let i = 0; i < this.usuarios.length; i++){
            return this.usuarios[i].address
        }
    }
    setAddress(address: string): void {
        for(let i = 0; i < this.usuarios.length; i++){
            this.usuarios[i].address = address
        }
    }
    getCoordinate(): number[] | undefined {
        for(let i = 0; i < this.usuarios.length; i++){
            return this.usuarios[i].coordinate
        }
    }
    setCoordinate(latitude: number, longitude: number): void {
        for(let i = 0; i < this.usuarios.length; i++){
            this.usuarios[i].coordinate = [latitude, longitude]
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
    validateSignUp(): any[]  {
        return this.validateSignUp()
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
        for(let i = 0 ;  i < this.usuarios.length ; i++){
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
    createAccount(): void {
        
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
    logIn(email: string) : any {
        
    }
    logOut(): void {
        console.log('log out')
    }
    updateAccount(id: string): void {
        
    }
    deleteAccount(id: string): void {
        
    }  

}