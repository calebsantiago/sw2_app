"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var User = /** @class */ (function () {
    function User(name, password, email) {
        this.name = name;
        this.password = password;
        this.email = email;
    }
    User.prototype.getName = function () {
        return this.name;
    };
    User.prototype.setName = function (name) {
        this.name = name;
    };
    User.prototype.getPassword = function () {
        return this.password;
    };
    User.prototype.setPassword = function (password) {
        this.password = password;
    };
    User.prototype.getEmail = function () {
        return this.email;
    };
    User.prototype.setEmail = function (email) {
        this.email = email;
    };
    return User;
}());
exports.User = User;
