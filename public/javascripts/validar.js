"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function validate() {
    if (document.getElementById("username") != null && document.getElementById("password") != null && document.getElementById("image") != null &&
        document.getElementById("account") != null && document.getElementById("firstname") != null && document.getElementById("lastname") != null &&
        document.getElementById("gender") != null && document.getElementById("idcard") != null && document.getElementById("birthdate") != null &&
        document.getElementById("phonenumber") != null && document.getElementById("email") != null && document.getElementById("address") != null &&
        document.getElementById("latitude") != null && document.getElementById("longitude") != null && document.getElementById("video") != null &&
        document.getElementById("description") != null && document.getElementById("certificate") != null && document.getElementById("service") != null) {
        var username = document.getElementById("username").value;
        var password = document.getElementById("password").value;
        var image = document.getElementById("image").value;
        var account = document.getElementById("account").value;
        var firstname = document.getElementById("firstname").value;
        var lastname = document.getElementById("lastname").value;
        var gender = document.getElementById("gender").value;
        var idcard = document.getElementById("idcard").value;
        var birthdate = document.getElementById("birthdate").value;
        var phonenumber = document.getElementById("phonumber").value;
        var email = document.getElementById("email").value;
        var address = document.getElementById("address").value;
        var latitude = document.getElementById("latitude").value;
        var longitude = document.getElementById("longitude").value;
        var video = document.getElementById("video").value;
        var description = document.getElementById("description").value;
        var certificate = document.getElementById("certificate").value;
        var service = document.getElementById("service").value;
        var url_expression = /^(?:http(s)?:\/\/)?[\w.-]+(?:\.[\w\.-]+)+[\w\-\._~:/?#[\]@!\$&'\(\)\*\+,;=.]+/;
        var id_expression = /[0-9]{8}/;
        var date_expression = /[0-9]{4}-[0-9]{2}-[0-9]{2}/;
        var phone_expression = /[0-9]{9}/;
        var email_expression = /[^@\s]+@[^@\s]+\.[^@\s]+/;
        if (username === "" || password === "" || account === "" || firstname === "" || lastname === "" || gender === "" || birthdate === "" || phonenumber === "" || email === "" || address === "" || latitude === "" || longitude === "") {
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
        if (!email_expression.test(email)) {
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
            if (idcard === "" || video === "" || description === "" || service === "") {
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
