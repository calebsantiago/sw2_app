"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var user_1 = require("./user");
var connection_1 = require("../connection");
var client_1 = require("../schema/client");
var mongoose_1 = __importDefault(require("mongoose"));
var Client = /** @class */ (function (_super) {
    __extends(Client, _super);
    function Client(firstname, lastname, gender, birthdate, phonenumber, email, password, confirm_password, image, account, address, latitude, longitude) {
        return _super.call(this, firstname, lastname, gender, birthdate, phonenumber, email, password, confirm_password, image, account, address, latitude, longitude) || this;
    }
    Client.prototype.validateSignUp = function () {
        var date_expression = /[0-9]{4}-[0-9]{2}-[0-9]{2}/;
        var phone_expression = /[0-9]{9}/;
        var email_expression = /[^@\s]+@[^@\s]+\.[^@\s]+/;
        var url_expression = /^(?:http(s)?:\/\/)?[\w.-]+(?:\.[\w\.-]+)+[\w\-\._~:/?#[\]@!\$&'\(\)\*\+,;=.]+/;
        var errors = [];
        if (this.getFirstname() === "" || this.getLastname() === "" || this.getGender() === "" || this.getBirthdate() === "" || this.getPhonenumber() === 0 || this.getEmail() === "" || this.getPassword() === "" || this.getConfirm_password() === "" || this.getAccount() === "" || this.getAddress() === "" || this.getCoordinate()[0] === 0 || this.getCoordinate()[1] === 0) {
            errors.push({ text: 'you must complete fields.' });
        }
        else {
            if (!date_expression.test(this.getBirthdate())) {
                errors.push({ text: 'birthdate is not valid.' });
            }
            if (this.getAge(this.getBirthdate()) < 18) {
                errors.push({ text: 'you are under 18 years old.' });
            }
            if (!phone_expression.test(this.getPhonenumber().toString())) {
                errors.push({ text: 'phonenumber is not valid.' });
            }
            if (!email_expression.test(this.getEmail())) {
                errors.push({ text: 'email is not valid.' });
            }
            if (this.getPassword() != this.getConfirm_password()) {
                errors.push({ text: 'passwords do not match.' });
            }
            if (!isFinite(this.getCoordinate()[0])) {
                errors.push({ text: 'latitude is not valid.' });
            }
            if (!isFinite(this.getCoordinate()[1])) {
                errors.push({ text: 'longitude is not valid.' });
            }
            if (this.getImage() != "") {
                if (!url_expression.test(this.getImage())) {
                    errors.push({ text: 'image is not valid.' });
                }
            }
        }
        return errors;
    };
    Client.prototype.createAccount = function () {
        connection_1.connectDB();
        var model = new client_1.client_model({
            _id: new mongoose_1.default.Types.ObjectId(),
            account: {
                email: this.getEmail(),
                password: this.getPassword(),
                image: this.getImage()
            },
            name: {
                firstname: this.getFirstname(),
                lastname: this.getLastname()
            },
            gender: this.getGender(),
            birthdate: this.getBirthdate(),
            phonenumber: this.getPhonenumber(),
            address: this.getAddress(),
            coordinate: {
                latitude: this.getCoordinate()[0],
                longitude: this.getCoordinate()[1]
            }
        });
        console.log(model);
        model.account.password = model.encryptPassword(this.getPassword());
        model.save(function (error) {
            if (error) {
                console.log(error);
            }
        });
    };
    Client.prototype.logIn = function (email) {
        connection_1.connectDB();
        var email_expression = /[^@\s]+@[^@\s]+\.[^@\s]+/;
        var doc;
        if (email_expression.test(email)) {
            doc = client_1.client_model.findOne({ 'account.email': email }, function (error) {
                if (error) {
                    console.log(error);
                }
            });
        }
        else {
            doc = client_1.client_model.findOne({ phonenumber: email }, function (error) {
                if (error) {
                    console.log(error);
                }
            });
        }
        return doc;
    };
    Client.prototype.updateAccount = function (id) {
        connection_1.connectDB();
        client_1.client_model.updateOne({ _id: id }, {
            account: {
                email: this.getEmail(),
                password: this.getPassword(),
                image: this.getImage()
            },
            name: {
                firstname: this.getFirstname(),
                lastname: this.getLastname()
            },
            gender: this.getGender(),
            birthdate: this.getBirthdate(),
            phonenumber: this.getPhonenumber(),
            address: this.getAddress(),
            coordinate: {
                latitude: this.getCoordinate()[0],
                longitude: this.getCoordinate()[1]
            }
        }, function (error) {
            if (error) {
                console.log(error);
            }
        });
    };
    Client.prototype.deleteAccount = function (id) {
        connection_1.connectDB();
        client_1.client_model.deleteOne({ _id: id }, function (error) {
            if (error) {
                console.log(error);
            }
        });
    };
    Client.prototype.searchService = function () {
        console.log('search service');
    };
    Client.prototype.requestQuotation = function () {
        console.log('request quotation');
    };
    Client.prototype.responseQuotation = function () {
        console.log('response quotation');
    };
    Client.prototype.cancelService = function () {
        console.log('cancel service');
    };
    Client.prototype.rateService = function () {
        console.log('rate service');
    };
    Client.prototype.reportService = function () {
        console.log('report service');
    };
    Client.prototype.checkHistory = function () {
        console.log('check history');
    };
    return Client;
}(user_1.User));
exports.Client = Client;
