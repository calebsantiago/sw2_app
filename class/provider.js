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
//import {connectDB} from '../connection';
var provider_1 = require("../schema/provider");
var mongoose_1 = __importDefault(require("mongoose"));
var Provider = /** @class */ (function (_super) {
    __extends(Provider, _super);
    function Provider(firstname, lastname, gender, birthdate, phonenumber, email, password, confirm_password, image, account, address, latitude, longitude, idcard, video, description, certificate, service) {
        var _this = _super.call(this, firstname, lastname, gender, birthdate, phonenumber, email, password, confirm_password, image, account, address, latitude, longitude) || this;
        _this.idcard = idcard;
        _this.video = video;
        _this.description = description;
        _this.certificate = certificate;
        _this.service = [service];
        return _this;
    }
    Provider.prototype.getIdcard = function () {
        return this.idcard;
    };
    Provider.prototype.setIdcard = function (idcard) {
        this.idcard = idcard;
    };
    Provider.prototype.getVideo = function () {
        return this.video;
    };
    Provider.prototype.setVideo = function (video) {
        this.video = video;
    };
    Provider.prototype.getDescription = function () {
        return this.description;
    };
    Provider.prototype.setDescription = function (description) {
        this.description = description;
    };
    Provider.prototype.getCertificate = function () {
        return this.certificate;
    };
    Provider.prototype.setCertificate = function (certificate) {
        this.certificate = certificate;
    };
    Provider.prototype.getService = function () {
        return this.service;
    };
    Provider.prototype.setService = function (service, newService) {
        var index = 0;
        var state = false;
        while (index < this.service.length && state == false) {
            if (this.service[index].toLowerCase == service.toLowerCase) {
                state = true;
            }
            else {
                index++;
            }
        }
        if (state == true) {
            this.service.splice(index, 1, newService);
        }
    };
    Provider.prototype.validateSignUp = function () {
        var date_expression = /[0-9]{4}-[0-9]{2}-[0-9]{2}/;
        var phone_expression = /[0-9]{9}/;
        var email_expression = /[^@\s]+@[^@\s]+\.[^@\s]+/;
        var url_expression = /^(?:http(s)?:\/\/)?[\w.-]+(?:\.[\w\.-]+)+[\w\-\._~:/?#[\]@!\$&'\(\)\*\+,;=.]+/;
        var id_expression = /[0-9]{8}/;
        var errors = [];
        if (this.getFirstname() === "" || this.getLastname() === "" || this.getGender() === "" || this.getBirthdate() === "" || this.getPhonenumber() === 0 || this.getEmail() === "" || this.getPassword() === "" || this.getConfirm_password() === "" || this.getAccount() === "" || this.getAddress() === "" || this.getCoordinate()[0] === 0 || this.getCoordinate()[1] === 0 || this.getIdcard() === 0 || this.getVideo() === "" || this.getDescription() === "" || this.getService()[0] === "") {
            errors.push({ text: 'debes completar los campos.' });
        }
        else {
            if (!date_expression.test(this.getBirthdate())) {
                errors.push({ text: 'fecha de nacimiento no válido.' });
            }
            if (this.getAge(this.getBirthdate()) < 18) {
                errors.push({ text: 'eres menor de 18 años.' });
            }
            if (!phone_expression.test(this.getPhonenumber().toString())) {
                errors.push({ text: 'número de teléfino no válido.' });
            }
            if (!email_expression.test(this.getEmail())) {
                errors.push({ text: 'correo electrónico no válido.' });
            }
            if (this.getPassword() != this.getConfirm_password()) {
                errors.push({ text: 'contraseñas no coinciden.' });
            }
            if (!isFinite(this.getCoordinate()[0])) {
                errors.push({ text: 'latitud no válido.' });
            }
            if (!isFinite(this.getCoordinate()[1])) {
                errors.push({ text: 'longitud no válido.' });
            }
            if (this.getImage() != "") {
                if (!url_expression.test(this.getImage())) {
                    errors.push({ text: 'link imagen no válido.' });
                }
            }
            if (!id_expression.test(this.getIdcard().toString())) {
                errors.push({ text: 'dni no válido.' });
            }
            if (!url_expression.test(this.getVideo())) {
                errors.push({ text: 'link video no válido.' });
            }
            if (this.getCertificate() != "") {
                if (!url_expression.test(this.getCertificate())) {
                    errors.push({ text: 'link certificado no válido.' });
                }
            }
        }
        return errors;
    };
    Provider.prototype.createAccount = function () {
        //connectDB();
        var model = new provider_1.provider_model({
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
            idcard: this.getIdcard(),
            phonenumber: this.getPhonenumber(),
            address: this.getAddress(),
            coordinate: {
                latitude: this.getCoordinate()[0],
                longitude: this.getCoordinate()[1]
            },
            video: this.getVideo(),
            description: this.getDescription(),
            certificate: this.getCertificate(),
            service: {
                title: this.getService()[0]
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
    Provider.prototype.logIn = function (email) {
        //connectDB();
        var email_expression = /[^@\s]+@[^@\s]+\.[^@\s]+/;
        var doc;
        if (email_expression.test(email)) {
            doc = provider_1.provider_model.findOne({ 'account.email': email }, function (error) {
                if (error) {
                    console.log(error);
                }
            });
        }
        else {
            doc = provider_1.provider_model.findOne({ phonenumber: email }, function (error) {
                if (error) {
                    console.log(error);
                }
            });
        }
        return doc;
    };
    Provider.prototype.updateAccount = function (id) {
        //connectDB();
        provider_1.provider_model.updateOne({ _id: id }, {
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
            idcard: this.getIdcard(),
            phonenumber: this.getPhonenumber(),
            address: this.getAddress(),
            coordinate: {
                latitude: this.getCoordinate()[0],
                longitude: this.getCoordinate()[1]
            },
            video: this.getVideo(),
            description: this.getDescription(),
            certificate: this.getCertificate(),
            service: {
                type: this.getService()
            }
        }, function (error) {
            if (error) {
                console.log(error);
            }
        });
    };
    Provider.prototype.deleteAccount = function (id) {
        //connectDB();
        provider_1.provider_model.deleteOne({ _id: id }, function (error) {
            if (error) {
                console.log(error);
            }
        });
    };
    Provider.prototype.addService = function (service) {
        this.service.splice(service.length, 0, service);
    };
    Provider.prototype.deleteService = function (service) {
        var index = 0;
        var state = false;
        while (index < this.service.length && state == false) {
            if (this.service[index].toLowerCase == service.toLowerCase) {
                state = true;
            }
            else {
                index++;
            }
        }
        if (state == true) {
            this.service.splice(index, 1);
        }
    };
    Provider.prototype.checkQuotations = function () {
        console.log('check quotations');
    };
    Provider.prototype.quoteService = function () {
        console.log('quote service');
    };
    Provider.prototype.responseService = function () {
        console.log('response service');
    };
    Provider.prototype.changeStatus = function () {
        console.log('change status');
    };
    Provider.prototype.checkHistory = function () {
        console.log('check history');
    };
    return Provider;
}(user_1.User));
exports.Provider = Provider;
