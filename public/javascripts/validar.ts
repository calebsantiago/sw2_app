import {Client} from './../../class/client';
function validate() {
    if (document.getElementById("username") != null && document.getElementById("password") != null && document.getElementById("image") !=null && 
    document.getElementById("account") != null && document.getElementById("firstname") != null && document.getElementById("lastname") != null && 
    document.getElementById("gender") != null && document.getElementById("idcard") != null && document.getElementById("birthdate") != null &&
    document.getElementById("phonenumber") != null && document.getElementById("email") != null && document.getElementById("address") != null &&
    document.getElementById("latitude") != null && document.getElementById("longitude") != null && document.getElementById("video") != null &&
    document.getElementById("description") != null && document.getElementById("certificate") != null && document.getElementById("service") != null) {
        let username : string = (<HTMLInputElement>document.getElementById("username")).value;
        let password : string = (<HTMLInputElement>document.getElementById("password")).value;
        let image : string = (<HTMLInputElement>document.getElementById("image")).value;
        let account : string = (<HTMLInputElement>document.getElementById("account")).value;
        let firstname : string = (<HTMLInputElement>document.getElementById("firstname")).value;
        let lastname : string = (<HTMLInputElement>document.getElementById("lastname")).value;
        let gender : string = (<HTMLInputElement>document.getElementById("gender")).value;
        let idcard : string = (<HTMLInputElement>document.getElementById("idcard")).value;
        let birthdate : string = (<HTMLInputElement>document.getElementById("birthdate")).value;
        let phonenumber : string = (<HTMLInputElement>document.getElementById("phonumber")).value;
        let email : string = (<HTMLInputElement>document.getElementById("email")).value;
        let address : string = (<HTMLInputElement>document.getElementById("address")).value;
        let latitude : string = (<HTMLInputElement>document.getElementById("latitude")).value;
        let longitude : string = (<HTMLInputElement>document.getElementById("longitude")).value;
        let video : string = (<HTMLInputElement>document.getElementById("video")).value;
        let description : string = (<HTMLInputElement>document.getElementById("description")).value;
        let certificate : string = (<HTMLInputElement>document.getElementById("certificate")).value;
        let service : string = (<HTMLInputElement>document.getElementById("service")).value;
        let url_expression : RegExp = /^(?:http(s)?:\/\/)?[\w.-]+(?:\.[\w\.-]+)+[\w\-\._~:/?#[\]@!\$&'\(\)\*\+,;=.]+/;
        let id_expression : RegExp = /[0-9]{8}/;
        let date_expression : RegExp = /[0-9]{4}-[0-9]{2}-[0-9]{2}/;
        let phone_expression : RegExp = /[0-9]{9}/;
        let email_expression : RegExp = /[^@\s]+@[^@\s]+\.[^@\s]+/;
        if(username === "" || password === "" || account === "" || firstname === "" || lastname === "" || gender === "" || birthdate === "" || phonenumber === "" || email === "" || address === "" || latitude === "" || longitude === "") {
            alert("you must complete fields");
            return false;
        }
        if (!date_expression.test(birthdate)) {
            alert("birthdate is not valid");
            return false;
        }
        if (!phone_expression.test(phonenumber)) {
            alert("phonenumber is not valid");
            return false;
        }
        if(!email_expression.test(email)) {
            alert("email is not valid");
            return false;
        }
        if (!isFinite(Number(latitude))) {
            alert("latitude is not valid");
            return false;
        }
        if (!isFinite(Number(longitude))) {
            alert("longitude is not valid");
            return false;
        }
        if (image != "") {
            if (!url_expression.test(image)) {
                alert("image is not valid");
                return false;
            }
        }
        if (account === "provider") {
            if(idcard === "" || video === "" || description === "" || service === "") {
                alert("you must complete fields");
                return false;
            }
        }
        if (idcard != "") {
            if (!id_expression.test(idcard)) {
                alert("idcard is not valid");
                return false;
            }
        }
        if (video != "") {
            if (!url_expression.test(video)) {
                alert("video is not valid");
                return false;
            }
        }
        if (certificate != "") {
            if (!url_expression.test(certificate)) {
                alert("certificate is not valid");
                return false;
            }
        }
        /*let user = new Client(username, password, image, account, firstname, lastname, gender, birthdate, Number(phonenumber), email, address, Number(latitude), Number(longitude));
        let condition = user.validateUsername();
        if (condition == true) {
            alert("username already exists");
            return false;
        }*/
    }
}