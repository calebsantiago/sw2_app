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
    function Client(username, password, image, account, firstname, lastname, gender, birthdate, phonenumber, email, address, latitude, longitude) {
        return _super.call(this, username, password, image, account, firstname, lastname, gender, birthdate, phonenumber, email, address, latitude, longitude) || this;
    }
    Client.prototype.createAccount = function () {
        connection_1.connectDB();
        var model = new client_1.client_model({
            _id: new mongoose_1.default.Types.ObjectId(),
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
            phonenumber: this.getPhonenumber(),
            email: this.getEmail(),
            address: this.getAddres(),
            coordinate: {
                latitude: this.getCoordinate()[0],
                longitude: this.getCoordinate()[1]
            }
        });
        console.log(model);
        model.save(function (error) {
            if (error) {
                console.log(error);
            }
        });
    };
    Client.prototype.updateAccount = function (id) {
        connection_1.connectDB();
        client_1.client_model.updateOne({ _id: id }, {
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
            phonenumber: this.getPhonenumber(),
            email: this.getEmail(),
            address: this.getAddres(),
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
