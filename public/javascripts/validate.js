function createErrors(text) {
    var container = document.getElementById('container');
    if(document.getElementById('errors') != null) {
        container.removeChild(document.getElementById('errors'));
    }
    var errors = document.createElement('div'); 
    errors.setAttribute('id', 'errors');
    errors.setAttribute('class', 'alert alert-danger alert-dismissible fade show');
    errors.setAttribute('role', 'alert');
    errors.innerHTML = text;
    var button = document.createElement('button');
    button.setAttribute('type', 'button');
    button.setAttribute('class', 'close');
    button.setAttribute('data-dismiss', 'alert');
    button.setAttribute('aria-label', 'Close');
    var span = document.createElement('span');
    span.setAttribute('aria-hidden', 'true');
    span.innerHTML = '&times;'
    button.appendChild(span);
    errors.appendChild(button);
    var form = document.getElementById('form');
    container.insertBefore(errors, form);
}

function getAge(birthdate) {
    var today =  new Date();
    let age = today.getFullYear() - new Date(birthdate).getFullYear();
    let month = today.getMonth() - new Date(birthdate).getMonth();
    if (month < 0 || (month === 0 && today.getDate() < new Date(birthdate).getDate())) {
        age--;
    }
    return age;
}

function validateSignUp() {
    var firstname = document.getElementById('firstname').value;
    var lastname = document.getElementById('lastname').value;
    var gender = document.getElementById('gender').value;
    var birthdate = document.getElementById('birthdate').value;
    var idcard = document.getElementById('idcard').value;
    var phonenumber = document.getElementById('phonenumber').value;
    var email = document.getElementById('email').value;
    var password = document.getElementById('password').value;
    var confirm_password = document.getElementById('confirm_password').value;
    var image = document.getElementById('image').value;
    var account = document.getElementById('account').value;
    var address = document.getElementById('address').value;
    var latitude = document.getElementById('latitude').value;
    var longitude = document.getElementById('longitude').value;
    var video = document.getElementById('video').value;
    var description = document.getElementById('description').value;
    var certificate = document.getElementById('certificate').value;
    var service = document.getElementById('service').value;
    var date_expression = /[0-9]{4}-[0-9]{2}-[0-9]{2}/;
    var id_expression = /[0-9]{8}/;
    var phone_expression = /[0-9]{9}/;
    var email_expression = /[^@\s]+@[^@\s]+\.[^@\s]+/;
    var url_expression = /^(?:http(s)?:\/\/)?[\w.-]+(?:\.[\w\.-]+)+[\w\-\._~:/?#[\]@!\$&'\(\)\*\+,;=.]+/;
    if (firstname === '' || lastname === '' || gender === '' || birthdate === '' || phonenumber === '' || email === '' || password === '' || confirm_password === '' || address === '' || latitude === '' || longitude === '') {
        createErrors('debes completar los campos.');
        return false;
    }
    if (!date_expression.test(birthdate)) {
        createErrors('fecha de nacimiento no válido.');
        return false;
    }
    if (getAge(birthdate) < 18) {
        createErrors('eres menor de 18 años.');
        return false;
    }
    if (!phone_expression.test(phonenumber)) {
        createErrors('número de teléfono no válido.');
        return false;
    }
    if (!email_expression.test(email)) {
        createErrors('correo electrónico no válido.');
        return false;
    }
    if (password != confirm_password) {
        createErrors('contraseñas no coinciden.');
        return false;
    }
    if (!isFinite(latitude)) {
        createErrors('latitud no válido.');
        return false;
    }
    if (!isFinite(longitude)) {
        createErrors('longitud no válido.');
        return false;
    }
    if (image != '') {
        if (!url_expression.test(image)) {
            createErrors('link imagen no válido.');
            return false;
        }
    }
    if (account === 'provider') {
        if(idcard === '' || video === '' || description === '' || service === '') {
            createErrors('debes completar los campos.');
            return false;
        }
    }
    if (idcard != '') {
        if (!id_expression.test(idcard)) {
            createErrors('dni no válido.');
            return false;
        }
    }
    if (video != '') {
        if (!url_expression.test(video)) {
            createErrors('link video no válido.');
            return false;
        }
    }
    if (certificate != '') {
        if (!url_expression.test(certificate)) {
            createErrors('link certificado no válido.');
            return false;
        }
    }
}

function validateLogIn() {
    var email = document.getElementById('email').value;
    var password = document.getElementById('password').value;
    var email_expression = /[^@\s]+@[^@\s]+\.[^@\s]+/;
    let phone_expression = /[0-9]{9}/;
    if (email === '' || password === '') {
        createErrors('debes completar los campos.');
        return false;
    }
    else {
        if (!email_expression.test(email) && !phone_expression.test(email)) {
            createErrors('correo electrónico o número de teléfono no válido.');
            return false;
        }
    }
}

function validateSearchService() {
    var services = document.getElementById('services').value;
    if (services === '') {
        createErrors('debes completar los campos.');
        return false;
    }
}

function validateSearchMap() {
    var services = document.getElementById('services').value;
    if (services === '') {
        createErrors('debes completar los campos.');
        return false;
    }
    else {
        searchMap();
        show();
    }
}

function testDate(date) {
    var status = false;
    var today =  new Date();
    var year = new Date(date).getFullYear() - today.getFullYear();
    var month = new Date(date).getMonth() - today.getMonth();
    var day = new Date(date).getDate() + 1 - today.getDate();
    if(year >= 0 && month >= 0 && day >= 0) {
        status = true;
    }
    return status;
}

function validateQuotation() {
    var provider = document.getElementById('provider').value;
    var service = document.getElementById('service').value;
    var date = document.getElementById('date').value;
    var description = document.getElementById('description').value;
    var image = document.getElementById('image').value;
    var date_expression = /[0-9]{4}-[0-9]{2}-[0-9]{2}/;
    var url_expression = /^(?:http(s)?:\/\/)?[\w.-]+(?:\.[\w\.-]+)+[\w\-\._~:/?#[\]@!\$&'\(\)\*\+,;=.]+/;
    if (provider === '' || service === '' || date === '' || description === '') {
        createErrors('debes completar los campos.');
        return false;
    }
    else {
        if (!date_expression.test(date)) {
            createErrors('fecha de cotización no válido.');
            return false;
        }
        if (!testDate(date)) {
            createErrors('fecha de cotización es menor a la fecha actual.');
            return false;
        }
        if (image != '') {
            if (!url_expression.test(image)) {
                createErrors('link imagen no válido.');
                return false;
            }
        }
    }
}

function validateQuoteService() {
    var cost = document.getElementById('cost').value;
    if (cost === '') {
        createErrors('debes completar los campos.');
        return false;
    }
    else {
        if (isNaN(cost)) {
            createErrors('costo no válido.');
            return false;
        }
        else {
            if(cost <= 0) {
                createErrors('costo menor o igual a cero.');
                return false;
            }
        }
    }
}

function validateRateService() {
    var rate = document.getElementsByName("rate");
    var comment = document.getElementById('comment').value;
    var status = false;
    var i = 0;
    while (!status && i < rate.length) {
        if (rate[i].checked) {
            status = true;
        } 
        i++;        
    }
    if (!status || comment === '') {
        createErrors('debes completar los campos.');
        return false;
    }
}

function validateDeleteAccount() {
    var password = document.getElementById('password').value;
    if (password === '') {
        createErrors('debes completar los campos.');
        return false;
    }
}