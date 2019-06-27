import { User, UserAdapter } from "./daouser";

export class Provider extends User{
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
}

export abstract class ProviderAdapter extends UserAdapter{
    abstract getIdcard() : number | undefined
    abstract setIdcard(idcard : number) : void
    abstract getVideo() : string | undefined
    abstract setvideo(video : string) : void
    abstract getDescription() : string | undefined
    abstract setDescription(description : string) : void
    abstract getCertificate() : string | undefined
    abstract setCertificate(certificate : string) : void
    abstract getService() : string[] | undefined
    abstract setService(service : string , newService : string) : void
    abstract validateSignUp() : any[]
    abstract createAccount() : void
    abstract logIn(email : string) : any
    abstract updateAccount(id : string) : void
    abstract deleteAccount(id : string) : void
    abstract addService(service : string) : void
    abstract deleteService(service : string) : void
    abstract checkQuotations() : void
    abstract quoteService() : void
    abstract responseService() : void
    abstract changeStatus() : void
    abstract checkHistory() : void 

}