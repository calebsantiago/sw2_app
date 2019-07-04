"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var nodemailer_1 = __importDefault(require("nodemailer"));
var User = /** @class */ (function () {
    function User(firstname, lastname, gender, birthdate, phonenumber, email, password, confirm_password, image, account, address, latitude, longitude) {
        this.firstname = firstname;
        this.lastname = lastname;
        this.gender = gender;
        this.birthdate = birthdate;
        this.phonenumber = phonenumber;
        this.email = email;
        this.password = password;
        this.confirm_password = confirm_password;
        this.image = image;
        this.account = account;
        this.address = address;
        this.coordinate = [latitude, longitude];
    }
    User.prototype.getFirstname = function () {
        return this.firstname;
    };
    User.prototype.setFirstname = function (firstname) {
        this.firstname = firstname;
    };
    User.prototype.getLastname = function () {
        return this.lastname;
    };
    User.prototype.setLastname = function (lastname) {
        this.lastname = lastname;
    };
    User.prototype.getGender = function () {
        return this.gender;
    };
    User.prototype.setGender = function (gender) {
        this.gender = gender;
    };
    User.prototype.getBirthdate = function () {
        return this.birthdate;
    };
    User.prototype.setBirthdate = function (birthdate) {
        this.birthdate = birthdate;
    };
    User.prototype.getPhonenumber = function () {
        return this.phonenumber;
    };
    User.prototype.setPhonenumber = function (phonenumber) {
        this.phonenumber = phonenumber;
    };
    User.prototype.getEmail = function () {
        return this.email;
    };
    User.prototype.setEmail = function (email) {
        this.email = email;
    };
    User.prototype.getPassword = function () {
        return this.password;
    };
    User.prototype.setPassword = function (password) {
        this.password = password;
    };
    User.prototype.getConfirm_password = function () {
        return this.confirm_password;
    };
    User.prototype.setConfirm_password = function (confirm_password) {
        this.confirm_password = confirm_password;
    };
    User.prototype.getImage = function () {
        return this.image;
    };
    User.prototype.setImage = function (image) {
        this.image = image;
    };
    User.prototype.getAccount = function () {
        return this.account;
    };
    User.prototype.setAccount = function (account) {
        this.account = account;
    };
    User.prototype.getAddress = function () {
        return this.address;
    };
    User.prototype.setAddress = function (address) {
        this.address = address;
    };
    User.prototype.getCoordinate = function () {
        return this.coordinate;
    };
    User.prototype.setCoordinate = function (latitude, longitude) {
        this.coordinate = [latitude, longitude];
    };
    User.prototype.getAge = function (birthdate) {
        var today = new Date();
        var age = today.getFullYear() - new Date(birthdate).getFullYear();
        var month = today.getMonth() - new Date(birthdate).getMonth();
        if (month < 0 || (month === 0 && today.getDate() < new Date(birthdate).getDate())) {
            age--;
        }
        return age;
    };
    User.prototype.validateLogIn = function (email, password) {
        var email_expression = /[^@\s]+@[^@\s]+\.[^@\s]+/;
        var phone_expression = /[0-9]{9}/;
        var errors = [];
        if (email === "" || password === "") {
            errors.push({ text: 'debes completar los campos.' });
        }
        else {
            if (!email_expression.test(email) && !phone_expression.test(email)) {
                errors.push({ text: 'correo electrónico o número de teléfono no válido.' });
            }
        }
        return errors;
    };
    User.prototype.sendMail = function () {
        var transporter = nodemailer_1.default.createTransport({
            service: 'gmail',
            auth: {
                user: 'contacta.no.reply@gmail.com',
                pass: 'contactasw2ulima'
            }
        });
        var mailOptions = {
            from: 'contacta.no.reply@gmail.com',
            to: this.getEmail(),
            subject: 'Contacta',
            text: 'Hola ' + this.getFirstname() + ' ' + this.getLastname() + ' te damos la bienvenida a Contacta.'
        };
        transporter.sendMail(mailOptions, function (error, info) {
            if (error) {
                console.log(error);
            }
            else {
                console.log('Email sent: ' + info.response);
            }
        });
    };
    User.prototype.logOut = function () {
        console.log('log out');
    };
    return User;
}());
exports.User = User;
