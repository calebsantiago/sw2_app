"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var User = /** @class */ (function () {
    function User(username, password, account, name, lastname, gender, birthdate, phonenumber, email, address, latitude, longitude) {
        this.username = username;
        this.password = password;
        this.account = account;
        this.name = name;
        this.lastname = lastname;
        this.gender = gender;
        this.birthdate = birthdate;
        this.phonenumber = phonenumber;
        this.email = email;
        this.address = address;
        this.coordinate = [latitude, longitude];
    }
    User.prototype.getUsername = function () {
        return this.username;
    };
    User.prototype.setUserName = function (username) {
        this.username = username;
    };
    User.prototype.getPassword = function () {
        return this.password;
    };
    User.prototype.setPassword = function (password) {
        this.password = password;
    };
    User.prototype.getAccount = function () {
        return this.account;
    };
    User.prototype.setAccount = function (account) {
        this.account = account;
    };
    User.prototype.getName = function () {
        return this.name;
    };
    User.prototype.setName = function (name) {
        this.name = name;
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
    User.prototype.createAccount = function () {
        console.log('create account');
    };
    User.prototype.updateAccount = function () {
        console.log('update account');
    };
    User.prototype.deleteAccount = function () {
        console.log('delete account');
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
