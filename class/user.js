"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var nodemailer_1 = __importDefault(require("nodemailer"));
var User = /** @class */ (function () {
    function User(firstname, lastname, gender, birthdate, phonenumber, email, password, image, address, latitude, longitude) {
        this.firstname = firstname;
        this.lastname = lastname;
        this.gender = gender;
        this.birthdate = birthdate;
        this.phonenumber = phonenumber;
        this.email = email;
        this.password = password;
        this.image = image;
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
    User.prototype.getImage = function () {
        return this.image;
    };
    User.prototype.setImage = function (image) {
        this.image = image;
    };
    User.prototype.getAddres = function () {
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
    User.prototype.sendMail = function () {
        var transporter = nodemailer_1.default.createTransport({
            service: 'gmail',
            auth: {
                user: 'contactaulima@gmail.com',
                pass: 'ulimasw2'
            }
        });
        var mailOptions = {
            from: 'contactaulima@gmail.com',
            to: this.getEmail(),
            subject: 'Asunto',
            text: 'Hola ' + this.getEmail()
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
    User.prototype.logIn = function () {
        console.log('log in');
    };
    User.prototype.logOut = function () {
        console.log('log out');
    };
    return User;
}());
exports.User = User;
