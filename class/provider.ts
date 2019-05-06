import {User} from './user';
import {connectDB} from '../connection';
import {provider_model} from '../schema/provider';
import mongoose from 'mongoose';
export class Provider extends User {
    idcard : number;
    video : string;
    description : string;
    certificate : string;
    service : string[];
    constructor(firstname : string, lastname : string, gender : string, birthdate : string, phonenumber : number, email : string, password : string, confirm_password : string, image : string, account : string, address :  string, latitude : number, longitude : number, idcard : number, video : string, description : string, certificate : string, service : string) {
        super(firstname, lastname, gender, birthdate, phonenumber, email, password, confirm_password, image, account, address, latitude, longitude);
        this.idcard = idcard;
        this.video = video;
        this.description = description;
        this.certificate = certificate;
        this.service = [service];
    }
    public getIdcard() : number {
		return this.idcard;
	}
	public setIdcard(idcard : number) : void {
		this.idcard = idcard;
    }
    public getVideo() : string {
		return this.video;
	}
	public setVideo(video : string) : void {
		this.video = video;
    }
    public getDescription() : string {
		return this.description;
	}
	public setDescription(description : string) : void {
		this.description = description;
    }
    public getCertificate() : string {
		return this.certificate;
	}
	public setCertificate(certificate : string) : void {
		this.certificate = certificate;
    }
    public getService() : string[] {
		return this.service;
	}
	public setService(service : string, newService : string) : void {
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
    public validateSignUp() : any[] {
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
    public createAccount() : void {
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
    public logIn(email : string) : any {
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
    public updateAccount(id : string) : void {
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
    public deleteAccount(id : string) : void {
        connectDB();
        provider_model.deleteOne({_id : id}, (error) => {
            if(error) {
                console.log(error);
            }
        });
    }
    public addService(service : string) {
        this.service.splice(service.length,0,service);
    }
    public deleteService(service : string) {
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
    public quoteService() : void {
        console.log('quote service');
    }
    public responseService() : void {
        console.log('response service');
    }
    public changeStatus() : void {
        console.log('change status');
    }
    public checkHistory() : void {
        console.log('check history');
    }
}