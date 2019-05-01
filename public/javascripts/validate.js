function validate() {
    var username = document.getElementById("username").value;
    var password = document.getElementById("password").value;
    var image = document.getElementById("image").value;
    var account = document.getElementById("account").value;
    var firstname = document.getElementById("firstname").value;
    var lastname = document.getElementById("lastname").value;
    var gender = document.getElementById("gender").value;
    var idcard = document.getElementById("idcard").value;
    var birthdate = document.getElementById("birthdate").value;
    var phonenumber = document.getElementById("phonenumber").value;
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
    if (!isFinite(latitude)) {
        alert("latitude is not valid");
        return false;
    }
    if (!isFinite(longitude)) {
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
}