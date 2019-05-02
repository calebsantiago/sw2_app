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
var provider_1 = require("../schema/provider");
var mongoose_1 = __importDefault(require("mongoose"));
var Provider = /** @class */ (function (_super) {
    __extends(Provider, _super);
    function Provider(username, password, image, account, firstname, lastname, gender, birthdate, phonenumber, email, address, latitude, longitude, idcard, video, description, certificate, service) {
        var _this = _super.call(this, username, password, image, account, firstname, lastname, gender, birthdate, phonenumber, email, address, latitude, longitude) || this;
        _this.idcard = idcard;
        _this.video = video;
        _this.description = description;
        _this.certificate = certificate;
        _this.service = [service];
        return _this;
    }
    Provider.prototype.createAccount = function () {
        var _this = this;
        connection_1.connectDB();
        provider_1.provider_model.findOne({ 'account.username': this.getUsername() }, function (error, document) {
            if (error) {
                console.log(error);
            }
            if (document != null) {
                console.log('username already exists');
            }
            else {
                var model = new provider_1.provider_model({
                    _id: new mongoose_1.default.Types.ObjectId(),
                    account: {
                        username: _this.getUsername(),
                        password: _this.getPassword(),
                        image: _this.getImage()
                    },
                    name: {
                        firstname: _this.getFirstname(),
                        lastname: _this.getLastname()
                    },
                    gender: _this.getGender(),
                    birthdate: _this.getBirthdate(),
                    idcard: _this.getIdcard(),
                    phonenumber: _this.getPhonenumber(),
                    email: _this.getEmail(),
                    address: _this.getAddres(),
                    coordinate: {
                        latitude: _this.getCoordinate()[0],
                        longitude: _this.getCoordinate()[1]
                    },
                    video: _this.getVideo(),
                    description: _this.getDescription(),
                    certificate: _this.getCertificate(),
                    service: {
                        title: _this.getService()[0]
                    }
                });
                console.log(model);
                model.save(function (error) {
                    if (error) {
                        console.log(error);
                    }
                });
            }
        });
    };
    Provider.prototype.selectAccount = function (id) {
        connection_1.connectDB();
        provider_1.provider_model.findOne({ _id: id }, function (error, document) {
            if (error) {
                console.log(error);
            }
            console.log(document);
            if (document != null) {
                /*this.setUserName(document.account.username);
                this.setPassword(document.account.password);
                this.setImage(document.account.image);
                this.setFirstname(document.name.firstname);
                this.setLastname(document.name.lastname);
                this.setGender(document.gender);
                this.setBirthdate(document.birthdate);
                this.setPhonenumber(document.phonenumber);
                this.setEmail(document.email);
                this.setAddress(document.address);
                this.setCoordinate(document.coordinate.latitude, document.coordinate.longitude);
                */
                return document;
            }
        });
    };
    Provider.prototype.validateAccount = function (username, password) {
    };
    Provider.prototype.updateAccount = function (id) {
        connection_1.connectDB();
        provider_1.provider_model.updateOne({ _id: id }, {
            account: {
                username: this.getUsername(),
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
            email: this.getEmail(),
            address: this.getAddres(),
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
        connection_1.connectDB();
        provider_1.provider_model.deleteOne({ _id: id }, function (error) {
            if (error) {
                console.log(error);
            }
        });
    };
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
