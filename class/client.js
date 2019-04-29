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
var Client = /** @class */ (function (_super) {
    __extends(Client, _super);
    function Client(username, password, account, name, lastname, gender, birthdate, phonenumber, email, address, latitude, longitude) {
        return _super.call(this, username, password, account, name, lastname, gender, birthdate, phonenumber, email, address, latitude, longitude) || this;
    }
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
