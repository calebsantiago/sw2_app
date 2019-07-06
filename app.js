"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var _this = this;
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var method_override_1 = __importDefault(require("method-override"));
var express_session_1 = __importDefault(require("express-session"));
var passport_1 = __importDefault(require("passport"));
var connect_flash_1 = __importDefault(require("connect-flash"));
var connection_1 = __importDefault(require("./connection"));
var client_1 = require("./class/client");
var client_2 = require("./schema/client");
var provider_1 = require("./class/provider");
var provider_2 = require("./schema/provider");
var quotation_1 = require("./schema/quotation");
var mongoose_1 = __importDefault(require("mongoose"));
function jsonlength(object) {
    if (object) {
        return Object.keys(object).length;
    }
    else {
        return 0;
    }
}
var db = 'mongodb+srv://caleb:Misael15@cluster0-aqv0w.mongodb.net/test?retryWrites=true';
connection_1.default({ db: db });
var main = function () {
    var app = express_1.default();
    app.set('view engine', 'pug');
    app.set('views', './views');
    app.use(express_1.default.urlencoded({ extended: false }));
    app.use(express_1.default.static('./public'));
    app.use(express_1.default.json());
    app.use(method_override_1.default('_method'));
    app.use(express_session_1.default({
        secret: 'secret',
        resave: false,
        saveUninitialized: false
    }));
    app.use(passport_1.default.initialize());
    app.use(passport_1.default.session());
    app.use(connect_flash_1.default());
    app.get('/', function (request, response) {
        response.render('index');
    });
    app.get('/signup', function (request, response) {
        response.render('signup');
    });
    app.post('/signup', function (request, response) { return __awaiter(_this, void 0, void 0, function () {
        var _a, firstname, lastname, gender, birthdate, idcard, phonenumber, email, password, confirm_password, image, account, address, latitude, longitude, video, description, certificate, service, user, doc1, doc2, doc3, doc4, docs, model, user, doc1, doc2, doc3, doc4, docs, model;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    _a = request.body, firstname = _a.firstname, lastname = _a.lastname, gender = _a.gender, birthdate = _a.birthdate, idcard = _a.idcard, phonenumber = _a.phonenumber, email = _a.email, password = _a.password, confirm_password = _a.confirm_password, image = _a.image, account = _a.account, address = _a.address, latitude = _a.latitude, longitude = _a.longitude, video = _a.video, description = _a.description, certificate = _a.certificate, service = _a.service;
                    if (!(account === 'client')) return [3 /*break*/, 9];
                    user = new client_1.Client(firstname, lastname, gender, birthdate, Number(phonenumber), email, password, confirm_password, image, account, address, Number(latitude), Number(longitude));
                    return [4 /*yield*/, client_2.client_model.findOne({ 'phonenumber': user.getPhonenumber() }, function (error) {
                            if (error) {
                                console.log(error);
                            }
                        })];
                case 1:
                    doc1 = _b.sent();
                    return [4 /*yield*/, client_2.client_model.findOne({ 'account.email': user.getEmail() }, function (error) {
                            if (error) {
                                console.log(error);
                            }
                        })];
                case 2:
                    doc2 = _b.sent();
                    return [4 /*yield*/, provider_2.provider_model.findOne({ 'phonenumber': user.getPhonenumber() }, function (error) {
                            if (error) {
                                console.log(error);
                            }
                        })];
                case 3:
                    doc3 = _b.sent();
                    return [4 /*yield*/, provider_2.provider_model.findOne({ 'account.email': user.getEmail() }, function (error) {
                            if (error) {
                                console.log(error);
                            }
                        })];
                case 4:
                    doc4 = _b.sent();
                    docs = [doc1, doc2, doc3, doc4];
                    if (!(docs[0] || docs[2])) return [3 /*break*/, 5];
                    request.flash('info', 'número de teléfono ya existe.');
                    response.render('signup', { error_message: request.flash('info'), firstname: firstname, lastname: lastname, gender: gender, birthdate: birthdate, phonenumber: phonenumber, email: email, password: password, confirm_password: confirm_password, image: image, account: account });
                    return [3 /*break*/, 8];
                case 5:
                    if (!(docs[1] || docs[3])) return [3 /*break*/, 6];
                    request.flash('info', 'correo electrónico ya existe.');
                    response.render('signup', { error_message: request.flash('info'), firstname: firstname, lastname: lastname, gender: gender, birthdate: birthdate, phonenumber: phonenumber, email: email, password: password, confirm_password: confirm_password, image: image, account: account });
                    return [3 /*break*/, 8];
                case 6:
                    model = new client_2.client_model({
                        _id: new mongoose_1.default.Types.ObjectId(),
                        account: {
                            email: user.getEmail(),
                            password: user.getPassword(),
                            image: user.getImage()
                        },
                        name: {
                            firstname: user.getFirstname(),
                            lastname: user.getLastname()
                        },
                        gender: user.getGender(),
                        birthdate: user.getBirthdate(),
                        phonenumber: user.getPhonenumber(),
                        address: user.getAddress(),
                        coordinate: {
                            latitude: user.getCoordinate()[0],
                            longitude: user.getCoordinate()[1]
                        }
                    });
                    return [4 /*yield*/, model.save(function (error) {
                            if (error) {
                                console.log(error);
                            }
                        })];
                case 7:
                    _b.sent();
                    request.flash('info', 'estas registrado.');
                    response.render('login', { success_message: request.flash('info') });
                    user.sendMail();
                    _b.label = 8;
                case 8: return [3 /*break*/, 17];
                case 9:
                    user = new provider_1.Provider(firstname, lastname, gender, birthdate, Number(phonenumber), email, password, confirm_password, image, account, address, Number(latitude), Number(longitude), Number(idcard), video, description, certificate, service);
                    return [4 /*yield*/, client_2.client_model.findOne({ 'phonenumber': user.getPhonenumber() }, function (error) {
                            if (error) {
                                console.log(error);
                            }
                        })];
                case 10:
                    doc1 = _b.sent();
                    return [4 /*yield*/, client_2.client_model.findOne({ 'account.email': user.getEmail() }, function (error) {
                            if (error) {
                                console.log(error);
                            }
                        })];
                case 11:
                    doc2 = _b.sent();
                    return [4 /*yield*/, provider_2.provider_model.findOne({ 'phonenumber': user.getPhonenumber() }, function (error) {
                            if (error) {
                                console.log(error);
                            }
                        })];
                case 12:
                    doc3 = _b.sent();
                    return [4 /*yield*/, provider_2.provider_model.findOne({ 'account.email': user.getEmail() }, function (error) {
                            if (error) {
                                console.log(error);
                            }
                        })];
                case 13:
                    doc4 = _b.sent();
                    docs = [doc1, doc2, doc3, doc4];
                    if (!(docs[0] || docs[2])) return [3 /*break*/, 14];
                    request.flash('info', 'número de teléfono ya existe.');
                    response.render('signup', { error_message: request.flash('info'), firstname: firstname, lastname: lastname, gender: gender, birthdate: birthdate, idcard: idcard, phonenumber: phonenumber, email: email, password: password, confirm_password: confirm_password, image: image, account: account, video: video, description: description, certificate: certificate, service: service });
                    return [3 /*break*/, 17];
                case 14:
                    if (!(docs[1] || docs[3])) return [3 /*break*/, 15];
                    request.flash('info', 'correo electrónico ya existe.');
                    response.render('signup', { error_message: request.flash('info'), firstname: firstname, lastname: lastname, gender: gender, birthdate: birthdate, idcard: idcard, phonenumber: phonenumber, email: email, password: password, confirm_password: confirm_password, image: image, account: account, video: video, description: description, certificate: certificate, service: service });
                    return [3 /*break*/, 17];
                case 15:
                    model = new provider_2.provider_model({
                        _id: new mongoose_1.default.Types.ObjectId(),
                        account: {
                            email: user.getEmail(),
                            password: user.getPassword(),
                            image: user.getImage()
                        },
                        name: {
                            firstname: user.getFirstname(),
                            lastname: user.getLastname()
                        },
                        gender: user.getGender(),
                        birthdate: user.getBirthdate(),
                        idcard: user.getIdcard(),
                        phonenumber: user.getPhonenumber(),
                        address: user.getAddress(),
                        coordinate: {
                            latitude: user.getCoordinate()[0],
                            longitude: user.getCoordinate()[1]
                        },
                        video: user.getVideo(),
                        description: user.getDescription(),
                        certificate: user.getCertificate(),
                        service: {
                            title: user.getService()[0]
                        }
                    });
                    return [4 /*yield*/, model.save(function (error) {
                            if (error) {
                                console.log(error);
                            }
                        })];
                case 16:
                    _b.sent();
                    request.flash('info', 'estas registrado.');
                    response.render('login', { success_message: request.flash('info') });
                    user.sendMail();
                    _b.label = 17;
                case 17: return [2 /*return*/];
            }
        });
    }); });
    app.get('/login', function (request, response) {
        response.render('login');
    });
    app.post('/login', function (request, response) { return __awaiter(_this, void 0, void 0, function () {
        var _a, email, password, account, email_expression, doc, match;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    _a = request.body, email = _a.email, password = _a.password;
                    account = '';
                    email_expression = /[^@\s]+@[^@\s]+\.[^@\s]+/;
                    if (!email_expression.test(email)) return [3 /*break*/, 4];
                    return [4 /*yield*/, client_2.client_model.findOne({ 'account.email': email }, function (error) {
                            if (error) {
                                console.log(error);
                            }
                            account = 'client';
                        })];
                case 1:
                    doc = _b.sent();
                    if (!!doc) return [3 /*break*/, 3];
                    return [4 /*yield*/, provider_2.provider_model.findOne({ 'account.email': email }, function (error) {
                            if (error) {
                                console.log(error);
                            }
                            account = 'provider';
                        })];
                case 2:
                    doc = _b.sent();
                    _b.label = 3;
                case 3: return [3 /*break*/, 7];
                case 4: return [4 /*yield*/, client_2.client_model.findOne({ phonenumber: email }, function (error) {
                        if (error) {
                            console.log(error);
                        }
                        account = 'client';
                    })];
                case 5:
                    doc = _b.sent();
                    if (!!doc) return [3 /*break*/, 7];
                    return [4 /*yield*/, provider_2.provider_model.findOne({ phonenumber: email }, function (error) {
                            if (error) {
                                console.log(error);
                            }
                            account = 'provider';
                        })];
                case 6:
                    doc = _b.sent();
                    _b.label = 7;
                case 7:
                    if (!!doc) return [3 /*break*/, 8];
                    request.flash('info', 'correo electrónico o número de teléfono no existe.');
                    response.render('login', { error_message: request.flash('info'), email: email, password: password });
                    return [3 /*break*/, 10];
                case 8: return [4 /*yield*/, doc.matchPassword(password)];
                case 9:
                    match = _b.sent();
                    if (match) {
                        if (request.session != undefined) {
                            request.session.user_id = doc._id;
                            request.session.account = account;
                            response.render('main', { user: doc, account: request.session.account });
                        }
                    }
                    else {
                        request.flash('info', 'contraseña incorrecta.');
                        response.render('login', { error_message: request.flash('info'), email: email, password: password });
                    }
                    _b.label = 10;
                case 10: return [2 /*return*/];
            }
        });
    }); });
    app.get('/logout', function (request, response) {
        request.logout();
        if (request.session != undefined) {
            request.session.destroy(function (error) {
                if (error) {
                    console.log(error);
                }
            });
        }
        response.redirect('/');
    });
    app.get('/main', function (request, response) {
        if (request.session != undefined) {
            var id = mongoose_1.default.Types.ObjectId(request.session.user_id);
            var account_1 = request.session.account;
            if (account_1 == 'client') {
                client_2.client_model.findOne({ _id: id }, function (error, document) {
                    if (error) {
                        console.log(error);
                    }
                    response.render('main', { user: document, account: account_1 });
                });
            }
            else {
                provider_2.provider_model.findOne({ _id: id }, function (error, document) {
                    if (error) {
                        console.log(error);
                    }
                    response.render('main', { user: document, account: account_1 });
                });
            }
        }
    });
    app.get('/searchservice', function (request, response) {
        provider_2.provider_model.find(function (error, document) { return __awaiter(_this, void 0, void 0, function () {
            var id, doc;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (error) {
                            console.log(error);
                        }
                        if (!(request.session != undefined)) return [3 /*break*/, 2];
                        id = mongoose_1.default.Types.ObjectId(request.session.user_id);
                        return [4 /*yield*/, client_2.client_model.findOne({ _id: id }, function (error) {
                                if (error) {
                                    console.log(error);
                                }
                            })];
                    case 1:
                        doc = _a.sent();
                        response.render('searchservice', { user: doc, providers: document });
                        _a.label = 2;
                    case 2: return [2 /*return*/];
                }
            });
        }); });
    });
    app.post('/searchservice', function (request, response) {
        var services = request.body.services;
        provider_2.provider_model.aggregate([
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
        ], function (error, document) { return __awaiter(_this, void 0, void 0, function () {
            var id, doc, pro;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (error) {
                            console.log(error);
                        }
                        if (!(request.session != undefined)) return [3 /*break*/, 3];
                        id = mongoose_1.default.Types.ObjectId(request.session.user_id);
                        return [4 /*yield*/, client_2.client_model.findOne({ _id: id }, function (error) {
                                if (error) {
                                    console.log(error);
                                }
                            })];
                    case 1:
                        doc = _a.sent();
                        return [4 /*yield*/, provider_2.provider_model.aggregate([
                                {
                                    $lookup: {
                                        from: 'quotations',
                                        localField: '_id',
                                        foreignField: '_id_provider',
                                        as: 'fromQuotations'
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
                            })];
                    case 2:
                        pro = _a.sent();
                        if (!document.length) {
                            request.flash('info', 'servicio no existe.');
                            response.render('searchservice', { error_message: request.flash('info'), user: doc, providers: pro, services: services });
                        }
                        else {
                            response.render('searchservice', { user: doc, providers: pro, users: document, services: services });
                        }
                        _a.label = 3;
                    case 3: return [2 /*return*/];
                }
            });
        }); });
    });
    app.get('/searchservice/requestquotation/:id', function (request, response) {
        var id = mongoose_1.default.Types.ObjectId(request.params.id);
        provider_2.provider_model.findOne({ _id: id }, function (error, document) {
            if (error) {
                console.log(error);
            }
            response.render('requestquotation', { user: document });
        });
    });
    app.post('/searchservice/requestquotation/:id', function (request, response) {
        var _a = request.body, provider = _a.provider, service = _a.service, date = _a.date, description = _a.description, image = _a.image;
        if (request.session != undefined) {
            var model = new quotation_1.quotation_model({
                _id: new mongoose_1.default.Types.ObjectId(),
                _id_client: request.session.user_id,
                _id_provider: provider,
                service: service,
                date: date,
                description: description,
                cost: 0,
                status: 'pendiente',
                rate: 0,
                comment: 'sin comentario',
                image: image
            });
            model.save(function (error) {
                if (error) {
                    console.log(error);
                }
            });
            response.redirect('/searchservice');
        }
    });
    app.get('/checkquotations', function (request, response) {
        if (request.session != undefined) {
            var id = mongoose_1.default.Types.ObjectId(request.session.user_id);
            var account_2 = request.session.account;
            if (account_2 == 'client') {
                quotation_1.quotation_model.aggregate([{
                        $lookup: {
                            from: 'providers',
                            localField: '_id_provider',
                            foreignField: '_id',
                            as: 'fromProviders'
                        }
                    },
                    {
                        $match: { _id_client: id, $or: [{ status: 'pendiente' }, { status: 'aceptado' }] }
                    },
                    {
                        $replaceRoot: { newRoot: { $mergeObjects: [{ $arrayElemAt: ['$fromProviders', 0] }, '$$ROOT'] } }
                    },
                    {
                        $project: { account: 0, gender: 0, birthdate: 0, idcard: 0, phonenumber: 0, address: 0, coordinate: 0, video: 0, certificate: 0, __v: 0, fromProviders: 0 }
                    }], function (error, document) {
                    if (error) {
                        console.log(error);
                    }
                    if (!document.length) {
                        request.flash('info', 'no tienes cotizaciones pendientes.');
                        response.render('checkquotations', { error_message: request.flash('info'), account: account_2 });
                    }
                    else {
                        response.render('checkquotations', { account: account_2, quotations: document });
                    }
                });
            }
            else {
                quotation_1.quotation_model.aggregate([{
                        $lookup: {
                            from: 'clients',
                            localField: '_id_client',
                            foreignField: '_id',
                            as: 'fromClients'
                        }
                    },
                    {
                        $match: { _id_provider: id, $or: [{ status: 'pendiente' }, { status: 'aceptado' }] }
                    },
                    {
                        $replaceRoot: { newRoot: { $mergeObjects: [{ $arrayElemAt: ['$fromClients', 0] }, '$$ROOT'] } }
                    },
                    {
                        $project: { account: 0, gender: 0, birthdate: 0, phonenumber: 0, address: 0, coordinate: 0, __v: 0, fromClients: 0 }
                    }], function (error, document) {
                    if (error) {
                        console.log(error);
                    }
                    if (!document.length) {
                        request.flash('info', 'no tienes cotizaciones pendientes.');
                        response.render('checkquotations', { error_message: request.flash('info'), account: account_2 });
                    }
                    else {
                        response.render('checkquotations', { account: account_2, quotations: document });
                    }
                });
            }
        }
    });
    app.get('/quoteservice/:id', function (request, response) {
        var id = mongoose_1.default.Types.ObjectId(request.params.id);
        quotation_1.quotation_model.findOne({ _id: id }, function (error, document) {
            if (error) {
                console.log(error);
            }
            response.render('quoteservice', { quotation: document });
        });
    });
    app.put('/quoteservice/:id', function (request, response) {
        var id = mongoose_1.default.Types.ObjectId(request.params.id);
        var cost = request.body.cost;
        quotation_1.quotation_model.updateOne({ _id: id }, { cost: cost }, function (error) {
            if (error) {
                console.log(error);
            }
            response.redirect('/checkquotations');
        });
    });
    app.put('/changestatus', function (request, response) {
        var _a = request.body, id = _a.id, status = _a.status;
        quotation_1.quotation_model.updateOne({ _id: id }, { status: status }, function (error) {
            if (error) {
                console.log(error);
            }
            if (status == 'reportado') {
                response.redirect('/checkhistory');
            }
            else {
                response.redirect('/checkquotations');
            }
        });
    });
    app.get('/locateclient/:id', function (request, response) {
        var id_quotation = mongoose_1.default.Types.ObjectId(request.params.id);
        quotation_1.quotation_model.findOne({ _id: id_quotation }, function (error, document) { return __awaiter(_this, void 0, void 0, function () {
            var id_client, id_provider, doc_client, doc_provider;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (error) {
                            console.log(error);
                        }
                        id_client = document._id_client;
                        id_provider = document._id_provider;
                        return [4 /*yield*/, client_2.client_model.findOne({ _id: id_client }, function (error) {
                                if (error) {
                                    console.log(error);
                                }
                            })];
                    case 1:
                        doc_client = _a.sent();
                        return [4 /*yield*/, provider_2.provider_model.findOne({ _id: id_provider }, function (error) {
                                if (error) {
                                    console.log(error);
                                }
                            })];
                    case 2:
                        doc_provider = _a.sent();
                        response.render('locateclient', { client: doc_client, provider: doc_provider, quotation: document });
                        return [2 /*return*/];
                }
            });
        }); });
    });
    app.get('/checkhistory', function (request, response) {
        if (request.session != undefined) {
            var id = mongoose_1.default.Types.ObjectId(request.session.user_id);
            var account_3 = request.session.account;
            if (account_3 == 'client') {
                quotation_1.quotation_model.aggregate([{
                        $lookup: {
                            from: 'providers',
                            localField: '_id_provider',
                            foreignField: '_id',
                            as: 'fromProviders'
                        }
                    },
                    {
                        $match: { _id_client: id, $or: [{ status: 'cancelado' }, { status: 'rechazado' }, { status: 'finalizado' }, { status: 'reportado' }] }
                    },
                    {
                        $replaceRoot: { newRoot: { $mergeObjects: [{ $arrayElemAt: ['$fromProviders', 0] }, '$$ROOT'] } }
                    },
                    {
                        $project: { account: 0, gender: 0, birthdate: 0, idcard: 0, phonenumber: 0, address: 0, coordinate: 0, video: 0, certificate: 0, __v: 0, fromProviders: 0 }
                    }], function (error, document) {
                    if (error) {
                        console.log(error);
                    }
                    if (!document.length) {
                        request.flash('info', 'no tienes historial.');
                        response.render('checkhistory', { error_message: request.flash('info'), account: account_3 });
                    }
                    else {
                        response.render('checkhistory', { account: account_3, quotations: document });
                    }
                });
            }
            else {
                quotation_1.quotation_model.aggregate([{
                        $lookup: {
                            from: 'clients',
                            localField: '_id_client',
                            foreignField: '_id',
                            as: 'fromClients'
                        }
                    },
                    {
                        $match: { _id_provider: id, $or: [{ status: 'cancelado' }, { status: 'rechazado' }, { status: 'finalizado' }, { status: 'reportado' }] }
                    },
                    {
                        $replaceRoot: { newRoot: { $mergeObjects: [{ $arrayElemAt: ['$fromClients', 0] }, '$$ROOT'] } }
                    },
                    {
                        $project: { account: 0, gender: 0, birthdate: 0, phonenumber: 0, address: 0, coordinate: 0, __v: 0, fromClients: 0 }
                    }], function (error, document) {
                    if (error) {
                        console.log(error);
                    }
                    if (!document.length) {
                        request.flash('info', 'no tienes historial.');
                        response.render('checkhistory', { error_message: request.flash('info'), account: account_3 });
                    }
                    else {
                        response.render('checkhistory', { account: account_3, quotations: document });
                    }
                });
            }
        }
    });
    app.get('/rateservice/:id', function (request, response) {
        var id_quotation = mongoose_1.default.Types.ObjectId(request.params.id);
        quotation_1.quotation_model.findOne({ _id: id_quotation }, function (error, document) { return __awaiter(_this, void 0, void 0, function () {
            var id_provider, doc_provider;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (error) {
                            console.log(error);
                        }
                        id_provider = document._id_provider;
                        return [4 /*yield*/, provider_2.provider_model.findOne({ _id: id_provider }, function (error) {
                                if (error) {
                                    console.log(error);
                                }
                            })];
                    case 1:
                        doc_provider = _a.sent();
                        response.render('rateservice', { user: doc_provider, quotation: document });
                        return [2 /*return*/];
                }
            });
        }); });
    });
    app.put('/rateservice/:id', function (request, response) {
        var id = mongoose_1.default.Types.ObjectId(request.params.id);
        var _a = request.body, rate = _a.rate, comment = _a.comment;
        quotation_1.quotation_model.updateOne({ _id: id }, { rate: rate, comment: comment }, function (error) {
            if (error) {
                console.log(error);
            }
            response.redirect('/checkhistory');
        });
    });
    app.get('/updateaccount', function (request, response) {
        if (request.session != undefined) {
            var id = mongoose_1.default.Types.ObjectId(request.session.user_id);
            var account_4 = request.session.account;
            if (account_4 == 'client') {
                client_2.client_model.findOne({ _id: id }, function (error, document) {
                    if (error) {
                        console.log(error);
                    }
                    response.render('updateaccount', { account: account_4, user: document });
                });
            }
            else {
                provider_2.provider_model.findOne({ _id: id }, function (error, document) {
                    if (error) {
                        console.log(error);
                    }
                    response.render('updateaccount', { account: account_4, user: document });
                });
            }
        }
    });
    app.put('/updateaccount', function (request, response) { return __awaiter(_this, void 0, void 0, function () {
        var id_1, account_5, _a, firstname, lastname, phonenumber, email, password, image, doc, doc1, doc2, doc3, doc4, document_1, docs, _b, idcard, video, description, certificate, service, docs;
        var _this = this;
        return __generator(this, function (_c) {
            switch (_c.label) {
                case 0:
                    if (!(request.session != undefined)) return [3 /*break*/, 12];
                    id_1 = mongoose_1.default.Types.ObjectId(request.session.user_id);
                    account_5 = request.session.account;
                    _a = request.body, firstname = _a.firstname, lastname = _a.lastname, phonenumber = _a.phonenumber, email = _a.email, password = _a.password, image = _a.image;
                    doc = void 0;
                    doc1 = void 0;
                    doc2 = void 0;
                    doc3 = void 0;
                    doc4 = void 0;
                    if (!(account_5 == 'client')) return [3 /*break*/, 6];
                    return [4 /*yield*/, client_2.client_model.findOne({ _id: id_1 }, function (error) {
                            if (error) {
                                console.log(error);
                            }
                        })];
                case 1:
                    doc = _c.sent();
                    return [4 /*yield*/, client_2.client_model.findOne({ 'phonenumber': phonenumber }, function (error) {
                            if (error) {
                                console.log(error);
                            }
                        })];
                case 2:
                    doc1 = _c.sent();
                    return [4 /*yield*/, client_2.client_model.findOne({ 'account.email': email }, function (error) {
                            if (error) {
                                console.log(error);
                            }
                        })];
                case 3:
                    doc2 = _c.sent();
                    return [4 /*yield*/, provider_2.provider_model.findOne({ 'phonenumber': phonenumber }, function (error) {
                            if (error) {
                                console.log(error);
                            }
                        })];
                case 4:
                    doc3 = _c.sent();
                    return [4 /*yield*/, provider_2.provider_model.findOne({ 'account.email': email }, function (error) {
                            if (error) {
                                console.log(error);
                            }
                        })];
                case 5:
                    doc4 = _c.sent();
                    docs = [doc1, doc2, doc3, doc4];
                    if (doc.name.firstname == firstname && doc.name.lastname == lastname && doc.account.email == email && doc.account.password == password && doc.account.image == image && doc.phonenumber == phonenumber) {
                        request.flash('info', 'sin cambios.');
                        response.render('updateaccount', { success_message: request.flash('info'), user: doc, account: account_5 });
                    }
                    else if (jsonlength(docs[0]) - 6 > 0 || jsonlength(docs[1]) - 6 > 0 || jsonlength(docs[2]) > 0 || jsonlength(docs[3]) > 0) {
                        request.flash('info', 'número de teléfono o correo electrónico ya existen.');
                        response.render('updateaccount', { error_message: request.flash('info'), user: doc, account: account_5 });
                    }
                    else {
                        client_2.client_model.updateOne({ _id: id_1 }, { name: { firstname: firstname, lastname: lastname }, account: { email: email, password: password, image: image }, phonenumber: phonenumber }, function (error) { return __awaiter(_this, void 0, void 0, function () {
                            return __generator(this, function (_a) {
                                switch (_a.label) {
                                    case 0:
                                        if (error) {
                                            console.log(error);
                                        }
                                        return [4 /*yield*/, client_2.client_model.findOne({ _id: id_1 }, function (error) {
                                                if (error) {
                                                    console.log(error);
                                                }
                                            })];
                                    case 1:
                                        document_1 = _a.sent();
                                        request.flash('info', 'los datos se actualizaron correctamente.');
                                        response.render('main', { success_message: request.flash('info'), user: document_1, account: account_5 });
                                        return [2 /*return*/];
                                }
                            });
                        }); });
                    }
                    return [3 /*break*/, 12];
                case 6:
                    _b = request.body, idcard = _b.idcard, video = _b.video, description = _b.description, certificate = _b.certificate, service = _b.service;
                    return [4 /*yield*/, provider_2.provider_model.findOne({ _id: id_1 }, function (error) {
                            if (error) {
                                console.log(error);
                            }
                        })];
                case 7:
                    doc = _c.sent();
                    return [4 /*yield*/, client_2.client_model.findOne({ 'phonenumber': phonenumber }, function (error) {
                            if (error) {
                                console.log(error);
                            }
                        })];
                case 8:
                    doc1 = _c.sent();
                    return [4 /*yield*/, client_2.client_model.findOne({ 'account.email': email }, function (error) {
                            if (error) {
                                console.log(error);
                            }
                        })];
                case 9:
                    doc2 = _c.sent();
                    return [4 /*yield*/, provider_2.provider_model.findOne({ 'phonenumber': phonenumber }, function (error) {
                            if (error) {
                                console.log(error);
                            }
                        })];
                case 10:
                    doc3 = _c.sent();
                    return [4 /*yield*/, provider_2.provider_model.findOne({ 'account.email': email }, function (error) {
                            if (error) {
                                console.log(error);
                            }
                        })];
                case 11:
                    doc4 = _c.sent();
                    docs = [doc1, doc2, doc3, doc4];
                    if (doc.name.firstname == firstname && doc.name.lastname == lastname && doc.account.email == email && doc.account.password == password && doc.account.image == image && doc.phonenumber == phonenumber && doc.idcard == idcard && doc.video == video && doc.description == description && doc.certificate == certificate && doc.service.title == service) {
                        request.flash('info', 'sin cambios.');
                        response.render('updateaccount', { success_message: request.flash('info'), user: doc, account: account_5 });
                    }
                    else if (jsonlength(docs[0]) > 0 || jsonlength(docs[1]) > 0 || jsonlength(docs[2]) - 6 > 0 || jsonlength(docs[3]) - 6 > 0) {
                        request.flash('info', 'número de teléfono o correo electrónico ya existen.');
                        response.render('updateaccount', { error_message: request.flash('info'), user: doc, account: account_5 });
                    }
                    else {
                        provider_2.provider_model.updateOne({ _id: id_1 }, { name: { firstname: firstname, lastname: lastname }, account: { email: email, password: password, image: image }, phonenumber: phonenumber, idcard: idcard, video: video, description: description, certificate: certificate, service: { title: service } }, function (error) { return __awaiter(_this, void 0, void 0, function () {
                            return __generator(this, function (_a) {
                                switch (_a.label) {
                                    case 0:
                                        if (error) {
                                            console.log(error);
                                        }
                                        return [4 /*yield*/, provider_2.provider_model.findOne({ _id: id_1 }, function (error) {
                                                if (error) {
                                                    console.log(error);
                                                }
                                            })];
                                    case 1:
                                        document_1 = _a.sent();
                                        request.flash('info', 'los datos se actualizaron correctamente.');
                                        response.render('main', { success_message: request.flash('info'), user: document_1, account: account_5 });
                                        return [2 /*return*/];
                                }
                            });
                        }); });
                    }
                    _c.label = 12;
                case 12: return [2 /*return*/];
            }
        });
    }); });
    app.put('/updateaccountlocation', function (request, response) {
        if (request.session != undefined) {
            var id_2 = mongoose_1.default.Types.ObjectId(request.session.user_id);
            var account_6 = request.session.account;
            var _a = request.body, address = _a.address, latitude = _a.latitude, longitude = _a.longitude;
            var document_2;
            if (account_6 == 'client') {
                client_2.client_model.updateOne({ _id: id_2 }, { address: address, coordinate: { latitude: latitude, longitude: longitude } }, function (error) { return __awaiter(_this, void 0, void 0, function () {
                    return __generator(this, function (_a) {
                        switch (_a.label) {
                            case 0:
                                if (error) {
                                    console.log(error);
                                }
                                return [4 /*yield*/, client_2.client_model.findOne({ _id: id_2 }, function (error) {
                                        if (error) {
                                            console.log(error);
                                        }
                                    })];
                            case 1:
                                document_2 = _a.sent();
                                request.flash('info', 'los datos se actualizaron correctamente.');
                                response.render('main', { success_message: request.flash('info'), user: document_2, account: account_6 });
                                return [2 /*return*/];
                        }
                    });
                }); });
            }
            else {
                provider_2.provider_model.updateOne({ _id: id_2 }, { address: address, coordinate: { latitude: latitude, longitude: longitude } }, function (error) { return __awaiter(_this, void 0, void 0, function () {
                    return __generator(this, function (_a) {
                        switch (_a.label) {
                            case 0:
                                if (error) {
                                    console.log(error);
                                }
                                return [4 /*yield*/, provider_2.provider_model.findOne({ _id: id_2 }, function (error) {
                                        if (error) {
                                            console.log(error);
                                        }
                                    })];
                            case 1:
                                document_2 = _a.sent();
                                request.flash('info', 'los datos se actualizaron correctamente.');
                                response.render('main', { success_message: request.flash('info'), user: document_2, account: account_6 });
                                return [2 /*return*/];
                        }
                    });
                }); });
            }
        }
    });
    app.get('/deleteaccount', function (request, response) {
        if (request.session != undefined) {
            response.render('deleteaccount', { account: request.session.account });
        }
    });
    app.delete('/deleteaccount', function (request, response) { return __awaiter(_this, void 0, void 0, function () {
        var id_3, account, password, doc, match, match;
        var _this = this;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    if (!(request.session != undefined)) return [3 /*break*/, 6];
                    id_3 = mongoose_1.default.Types.ObjectId(request.session.user_id);
                    account = request.session.account;
                    password = request.body.password;
                    doc = void 0;
                    if (!(account == 'client')) return [3 /*break*/, 3];
                    return [4 /*yield*/, client_2.client_model.findOne({ _id: id_3 }, function (error) { return __awaiter(_this, void 0, void 0, function () {
                            return __generator(this, function (_a) {
                                if (error) {
                                    console.log(error);
                                }
                                return [2 /*return*/];
                            });
                        }); })];
                case 1:
                    doc = _a.sent();
                    return [4 /*yield*/, doc.matchPassword(password)];
                case 2:
                    match = _a.sent();
                    if (match) {
                        quotation_1.quotation_model.updateMany({ _id_client: id_3, status: { $in: ['pendiente', 'aceptado'] } }, { status: 'cancelado' }, function (error) {
                            if (error) {
                                console.log(error);
                            }
                            client_2.client_model.deleteOne({ _id: id_3 }, function (error) {
                                if (error) {
                                    console.log(error);
                                }
                                response.redirect('/');
                            });
                        });
                    }
                    else {
                        request.flash('info', 'contraseña incorrecta.');
                        response.render('deleteaccount', { error_message: request.flash('info'), password: password });
                    }
                    return [3 /*break*/, 6];
                case 3: return [4 /*yield*/, provider_2.provider_model.findOne({ _id: id_3 }, function (error) { return __awaiter(_this, void 0, void 0, function () {
                        return __generator(this, function (_a) {
                            if (error) {
                                console.log(error);
                            }
                            return [2 /*return*/];
                        });
                    }); })];
                case 4:
                    doc = _a.sent();
                    return [4 /*yield*/, doc.matchPassword(password)];
                case 5:
                    match = _a.sent();
                    if (match) {
                        quotation_1.quotation_model.updateMany({ _id_provider: id_3, status: { $in: ['pendiente', 'aceptado'] } }, { status: 'rechazado' }, function (error) {
                            if (error) {
                                console.log(error);
                            }
                            provider_2.provider_model.deleteOne({ _id: id_3 }, function (error) {
                                if (error) {
                                    console.log(error);
                                }
                                response.redirect('/');
                            });
                        });
                    }
                    else {
                        request.flash('info', 'contraseña incorrecta.');
                        response.render('deleteaccount', { error_message: request.flash('info'), password: password });
                    }
                    _a.label = 6;
                case 6: return [2 /*return*/];
            }
        });
    }); });
    var port = process.env.PORT || 3000;
    app.listen(port, function () {
        console.log("App running in port " + port);
    });
};
main();
