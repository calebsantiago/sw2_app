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
var quotationDAO_1 = require("../dao/quotationDAO");
var quotationAdapter_1 = __importDefault(require("../adapter/quotationAdapter"));
var QuotationMock = /** @class */ (function (_super) {
    __extends(QuotationMock, _super);
    function QuotationMock() {
        return _super.call(this) || this;
    }
    QuotationMock.getInstance = function () {
        if (QuotationMock.INSTANCE == undefined) {
            QuotationMock.INSTANCE = new QuotationMock();
        }
        return QuotationMock.INSTANCE;
    };
    QuotationMock.prototype.insert = function (id_client, id_provider, service, date, description, image) {
        new quotationDAO_1.QuotationDAO({
            _id: new mongoose_1.default.Types.ObjectId(),
            _id_client: id_client,
            _id_provider: id_provider,
            service: service,
            date: date,
            description: description,
            cost: 0,
            status: 'pendiente',
            rate: 0,
            comment: 'sin comentario',
            image: image
        }).save(function (error) {
            if (error) {
                console.log(error);
            }
        });
    };
    QuotationMock.prototype.findcheckbyclient = function (id) {
        return quotationDAO_1.QuotationDAO.aggregate([
            {
                $lookup: {
                    from: 'providers',
                    localField: '_id_provider',
                    foreignField: '_id',
                    as: 'fromProviders'
                }
            },
            {
                $match: {
                    _id_client: mongoose_1.default.Types.ObjectId(id),
                    status: {
                        $in: ['pendiente', 'aceptado']
                    }
                }
            },
            {
                $replaceRoot: {
                    newRoot: {
                        $mergeObjects: [
                            {
                                $arrayElemAt: ['$fromProviders', 0]
                            },
                            '$$ROOT'
                        ]
                    }
                }
            },
            {
                $project: {
                    account: 0,
                    gender: 0,
                    birthdate: 0,
                    idcard: 0,
                    phonenumber: 0,
                    address: 0,
                    coordinate: 0,
                    video: 0,
                    certificate: 0,
                    __v: 0,
                    fromProviders: 0
                }
            }
        ], function (error) {
            if (error) {
                console.log(error);
            }
        });
    };
    QuotationMock.prototype.findcheckbyprovider = function (id) {
        return quotationDAO_1.QuotationDAO.aggregate([
            {
                $lookup: {
                    from: 'clients',
                    localField: '_id_client',
                    foreignField: '_id',
                    as: 'fromClients'
                }
            },
            {
                $match: {
                    _id_provider: mongoose_1.default.Types.ObjectId(id),
                    status: {
                        $in: ['pendiente', 'aceptado']
                    }
                }
            },
            {
                $replaceRoot: {
                    newRoot: {
                        $mergeObjects: [
                            {
                                $arrayElemAt: ['$fromClients', 0]
                            },
                            '$$ROOT'
                        ]
                    }
                }
            },
            {
                $project: {
                    account: 0,
                    gender: 0,
                    birthdate: 0,
                    idcard: 0,
                    phonenumber: 0,
                    address: 0,
                    coordinate: 0,
                    video: 0,
                    certificate: 0,
                    __v: 0,
                    fromProviders: 0
                }
            }
        ], function (error) {
            if (error) {
                console.log(error);
            }
        });
    };
    QuotationMock.prototype.findbyid = function (id) {
        return quotationDAO_1.QuotationDAO.findOne({ _id: mongoose_1.default.Types.ObjectId(id) }, function (error) {
            if (error) {
                console.log(error);
            }
        });
    };
    QuotationMock.prototype.findhistorybyclient = function (id) {
        return quotationDAO_1.QuotationDAO.aggregate([
            {
                $lookup: {
                    from: 'providers',
                    localField: '_id_provider',
                    foreignField: '_id',
                    as: 'fromProviders'
                }
            },
            {
                $match: {
                    _id_client: mongoose_1.default.Types.ObjectId(id),
                    status: {
                        $in: ['cancelado', 'rechazado', 'finalizado', 'reportado']
                    }
                }
            },
            {
                $replaceRoot: {
                    newRoot: {
                        $mergeObjects: [
                            {
                                $arrayElemAt: ['$fromProviders', 0]
                            },
                            '$$ROOT'
                        ]
                    }
                }
            },
            {
                $project: {
                    account: 0,
                    gender: 0,
                    birthdate: 0,
                    idcard: 0,
                    phonenumber: 0,
                    address: 0,
                    coordinate: 0,
                    video: 0,
                    certificate: 0,
                    __v: 0,
                    fromProviders: 0
                }
            }
        ], function (error) {
            if (error) {
                console.log(error);
            }
        });
    };
    QuotationMock.prototype.findhistorybyprovider = function (id) {
        return quotationDAO_1.QuotationDAO.aggregate([
            {
                $lookup: {
                    from: 'clients',
                    localField: '_id_client',
                    foreignField: '_id',
                    as: 'fromClients'
                }
            },
            {
                $match: {
                    _id_provider: mongoose_1.default.Types.ObjectId(id),
                    status: {
                        $in: ['cancelado', 'rechazado', 'finalizado', 'reportado']
                    }
                }
            },
            {
                $replaceRoot: {
                    newRoot: {
                        $mergeObjects: [
                            {
                                $arrayElemAt: ['$fromClients', 0]
                            },
                            '$$ROOT'
                        ]
                    }
                }
            },
            {
                $project: {
                    account: 0,
                    gender: 0,
                    birthdate: 0,
                    idcard: 0,
                    phonenumber: 0,
                    address: 0,
                    coordinate: 0,
                    video: 0,
                    certificate: 0,
                    __v: 0,
                    fromProviders: 0
                }
            }
        ], function (error) {
            if (error) {
                console.log(error);
            }
        });
    };
    QuotationMock.prototype.updatecost = function (id, cost) {
        quotationDAO_1.QuotationDAO.updateOne({ _id: mongoose_1.default.Types.ObjectId(id) }, { cost: cost }, function (error) {
            if (error) {
                console.log(error);
            }
        });
    };
    QuotationMock.prototype.updatestatus = function (id, status) {
        quotationDAO_1.QuotationDAO.updateOne({ _id: mongoose_1.default.Types.ObjectId(id) }, { status: status }, function (error) {
            if (error) {
                console.log(error);
            }
        });
    };
    QuotationMock.prototype.updateratecomment = function (id, rate, comment) {
        quotationDAO_1.QuotationDAO.updateOne({ _id: mongoose_1.default.Types.ObjectId(id) }, { rate: rate, comment: comment }, function (error) {
            if (error) {
                console.log(error);
            }
        });
    };
    QuotationMock.prototype.updatemanybyclient = function (id) {
        quotationDAO_1.QuotationDAO.updateMany({ _id_client: mongoose_1.default.Types.ObjectId(id), status: { $in: ['pendiente', 'aceptado'] } }, { status: 'cancelado' }, function (error) {
            if (error) {
                console.log(error);
            }
        });
    };
    QuotationMock.prototype.updatemanybyprovider = function (id) {
        quotationDAO_1.QuotationDAO.updateMany({ _id_provider: mongoose_1.default.Types.ObjectId(id), status: { $in: ['pendiente', 'aceptado'] } }, { status: 'rechazado' }, function (error) {
            if (error) {
                console.log(error);
            }
        });
    };
    return QuotationMock;
}(quotationAdapter_1.default));
exports.default = QuotationMock;
