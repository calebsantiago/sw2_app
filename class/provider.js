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
Object.defineProperty(exports, "__esModule", { value: true });
var user_1 = require("./user");
var Provider = /** @class */ (function (_super) {
    __extends(Provider, _super);
    function Provider(username, password, account, name, lastname, gender, birthdate, phonenumber, email, address, latitude, longitude, idcard, service, description) {
        var _this = _super.call(this, username, password, account, name, lastname, gender, birthdate, phonenumber, email, address, latitude, longitude) || this;
        _this.idcard = idcard;
        _this.service = [service];
        _this.description = description;
        return _this;
    }
    Provider.prototype.getIdcard = function () {
        return this.idcard;
    };
    Provider.prototype.setIdcard = function (idcard) {
        this.idcard = idcard;
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
    Provider.prototype.getDescription = function () {
        return this.description;
    };
    Provider.prototype.setDescription = function (description) {
        this.description = description;
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
