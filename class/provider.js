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
