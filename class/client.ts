import {User} from './user';
import {connectDB} from '../connection';
import {client_model} from '../schema/client';
import mongoose from 'mongoose';
export class Client extends User {
    constructor(firstname : string, lastname : string, gender : string, birthdate : string, phonenumber : number, email : string, password : string, confirm_password : string, image : string, account : string, address :  string, latitude : number, longitude : number) {
        super(firstname, lastname, gender, birthdate, phonenumber, email, password, confirm_password, image, account, address, latitude, longitude);
    }
    public validateSignUp() : any[] {
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
            if (!phone_expression.test(this.getPhonenumber().toString())) {
                errors.push({text : 'número de teléfono no válido.'});
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
        }
        return errors;
    }
    public createAccount() : void {
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
    public logIn(email : string) : any {
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
    public updateAccount(id : string) : void {
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
    public deleteAccount(id : string) : void {
        connectDB();
        client_model.deleteOne({_id : id}, (error) => {
            if(error) {
                console.log(error);
            }
        });
    }
    public searchService() : void {
        console.log('search service');
    }
    public requestQuotation() : void {
        console.log('request quotation');
    }
    public responseQuotation() : void {
        console.log('response quotation');
    }
    public cancelService() : void {
        console.log('cancel service');
    }
    public rateService() : void {
        console.log('rate service');
    }
    public reportService() : void {
        console.log('report service');
    }
    public checkHistory() : void {
        console.log('check history');
    }
}