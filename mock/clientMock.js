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
var mongoose_1 = __importDefault(require("mongoose"));
var clientDAO_1 = require("../dao/clientDAO");
var clientAdapter_1 = require("../adapter/clientAdapter");
var ClientMock = /** @class */ (function (_super) {
    __extends(ClientMock, _super);
    function ClientMock() {
        return _super.call(this) || this;
    }
    ClientMock.getInstance = function () {
        if (ClientMock.INSTANCE == undefined) {
            ClientMock.INSTANCE = new ClientMock();
        }
        return ClientMock.INSTANCE;
    };
    ClientMock.prototype.insert = function (email, password, image, firstname, lastname, gender, birthdate, phonenumber, address, latitude, longitude) {
        new clientDAO_1.ClientDAO({
            _id: new mongoose_1.default.Types.ObjectId(),
            account: {
                email: email,
                password: password,
                image: image
            },
            name: {
                firstname: firstname,
                lastname: lastname
            },
            gender: gender,
            birthdate: birthdate,
            phonenumber: phonenumber,
            address: address,
            coordinate: {
                latitude: latitude,
                longitude: longitude
            }
        }).save(function (error) {
            if (error) {
                console.log(error);
            }
        });
    };
    ClientMock.prototype.findbyid = function (id) {
        return clientDAO_1.ClientDAO.findOne({ _id: mongoose_1.default.Types.ObjectId(id) }, function (error) {
            if (error) {
                console.log(error);
            }
        });
    };
    ClientMock.prototype.findbyemail = function (email) {
        return clientDAO_1.ClientDAO.findOne({ 'account.email': email }, function (error) {
            if (error) {
                console.log(error);
            }
        });
    };
    ClientMock.prototype.findbyphonenumber = function (phonenumber) {
        return clientDAO_1.ClientDAO.findOne({ phonenumber: phonenumber }, function (error) {
            if (error) {
                console.log(error);
            }
        });
    };
    ClientMock.prototype.updateprofile = function (id, firstname, lastname, email, password, image, phonenumber) {
        clientDAO_1.ClientDAO.updateOne({ _id: mongoose_1.default.Types.ObjectId(id) }, { name: { firstname: firstname, lastname: lastname }, account: { email: email, password: password, image: image }, phonenumber: phonenumber }, function (error) {
            if (error) {
                console.log(error);
            }
        });
    };
    ClientMock.prototype.updatelocation = function (id, address, latitude, longitude) {
        clientDAO_1.ClientDAO.updateOne({ _id: mongoose_1.default.Types.ObjectId(id) }, { address: address, coordinate: { latitude: latitude, longitude: longitude } }, function (error) {
            if (error) {
                console.log(error);
            }
        });
    };
    ClientMock.prototype.delete = function (id) {
        clientDAO_1.ClientDAO.deleteOne({ _id: mongoose_1.default.Types.ObjectId(id) }, function (error) {
            if (error) {
                console.log(error);
            }
        });
    };
    return ClientMock;
}(clientAdapter_1.ClientAdapter));
exports.ClientMock = ClientMock;
