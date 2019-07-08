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
var providerDAO_1 = require("../dao/providerDAO");
var providerAdapter_1 = __importDefault(require("../adapter/providerAdapter"));
var ProviderMock = /** @class */ (function (_super) {
    __extends(ProviderMock, _super);
    function ProviderMock() {
        return _super.call(this) || this;
    }
    ProviderMock.getInstance = function () {
        if (ProviderMock.INSTANCE == undefined) {
            ProviderMock.INSTANCE = new ProviderMock();
        }
        return ProviderMock.INSTANCE;
    };
    ProviderMock.prototype.insert = function (email, password, image, firstname, lastname, gender, birthdate, phonenumber, address, latitude, longitude, idcard, video, description, certificate, service) {
        new providerDAO_1.ProviderDAO({
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
            idcard: idcard,
            phonenumber: phonenumber,
            address: address,
            coordinate: {
                latitude: latitude,
                longitude: longitude
            },
            video: video,
            description: description,
            certificate: certificate,
            service: {
                title: service
            }
        }).save(function (error) {
            if (error) {
                console.log(error);
            }
        });
    };
    ProviderMock.prototype.findall = function () {
        return providerDAO_1.ProviderDAO.find({}, function (error) {
            if (error) {
                console.log(error);
            }
        });
    };
    ProviderMock.prototype.findbyservicesaveragerate = function (services) {
        return providerDAO_1.ProviderDAO.aggregate([
            {
                $lookup: {
                    from: 'quotations',
                    localField: '_id',
                    foreignField: '_id_provider',
                    as: 'fromQuotations'
                }
            },
            {
                $match: {
                    service: {
                        title: services
                    }
                }
            },
            {
                $project: {
                    name: 1,
                    service: 1,
                    description: 1,
                    average: {
                        $avg: '$fromQuotations.rate'
                    },
                    coordinate: 1
                }
            }
        ], function (error) {
            if (error) {
                console.log(error);
            }
        });
    };
    ProviderMock.prototype.findbyid = function (id) {
        return providerDAO_1.ProviderDAO.findOne({ _id: mongoose_1.default.Types.ObjectId(id) }, function (error) {
            if (error) {
                console.log(error);
            }
        });
    };
    ProviderMock.prototype.findbyemail = function (email) {
        return providerDAO_1.ProviderDAO.findOne({ 'account.email': email }, function (error) {
            if (error) {
                console.log(error);
            }
        });
    };
    ProviderMock.prototype.findbyphonenumber = function (phonenumber) {
        return providerDAO_1.ProviderDAO.findOne({ phonenumber: phonenumber }, function (error) {
            if (error) {
                console.log(error);
            }
        });
    };
    ProviderMock.prototype.updateprofile = function (id, firstname, lastname, email, password, image, phonenumber, idcard, video, description, certificate, service) {
        providerDAO_1.ProviderDAO.updateOne({ _id: mongoose_1.default.Types.ObjectId(id) }, { name: { firstname: firstname, lastname: lastname }, account: { email: email, password: password, image: image }, phonenumber: phonenumber, idcard: idcard, video: video, description: description, certificate: certificate, service: { title: service } }, function (error) {
            if (error) {
                console.log(error);
            }
        });
    };
    ProviderMock.prototype.updatelocation = function (id, address, latitude, longitude) {
        providerDAO_1.ProviderDAO.updateOne({ _id: mongoose_1.default.Types.ObjectId(id) }, { address: address, coordinate: { latitude: latitude, longitude: longitude } }, function (error) {
            if (error) {
                console.log(error);
            }
        });
    };
    ProviderMock.prototype.delete = function (id) {
        providerDAO_1.ProviderDAO.deleteOne({ _id: mongoose_1.default.Types.ObjectId(id) }, function (error) {
            if (error) {
                console.log(error);
            }
        });
    };
    return ProviderMock;
}(providerAdapter_1.default));
exports.default = ProviderMock;
