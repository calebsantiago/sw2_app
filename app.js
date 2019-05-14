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
var body_parser_1 = __importDefault(require("body-parser"));
var method_override_1 = __importDefault(require("method-override"));
var express_session_1 = __importDefault(require("express-session"));
var passport_1 = __importDefault(require("passport"));
var connect_flash_1 = __importDefault(require("connect-flash"));
var connection_1 = require("./connection");
var client_1 = require("./class/client");
var client_2 = require("./schema/client");
var provider_1 = require("./class/provider");
var provider_2 = require("./schema/provider");
var quotation_1 = require("./schema/quotation");
var mongoose_1 = __importDefault(require("mongoose"));
var main = function () {
    var app = express_1.default();
    app.set('view engine', 'pug');
    app.set('views', './views');
    app.use(express_1.default.urlencoded({ extended: false }));
    app.use(express_1.default.static('./public'));
    app.use(body_parser_1.default.json());
    app.use(body_parser_1.default.urlencoded({ extended: true }));
    app.use(method_override_1.default('_method'));
    app.use(express_session_1.default({
        secret: 'secret',
        resave: false,
        saveUninitialized: false
    }));
    app.use(passport_1.default.initialize());
    app.use(passport_1.default.session());
    app.use(connect_flash_1.default());
    /*app.use((request, response, next) => {
        if(request.session != undefined) {
            if(!request.session.user_id) {
                response.render('login');
            }
            else {
                next();
            }
        }
    });*/
    app.get('/', function (request, response) {
        response.render('index');
    });
    app.get('/signup', function (request, response) {
        response.render('signup');
    });
    app.post('/signup', function (request, response) { return __awaiter(_this, void 0, void 0, function () {
        var _a, firstname, lastname, gender, birthdate, idcard, phonenumber, email, password, confirm_password, image, account, address, latitude, longitude, video, description, certificate, service, user, errors, doc1, doc2, doc3, doc4, docs, model, _b, user, errors, doc1, doc2, doc3, doc4, docs, model, _c;
        return __generator(this, function (_d) {
            switch (_d.label) {
                case 0:
                    _a = request.body, firstname = _a.firstname, lastname = _a.lastname, gender = _a.gender, birthdate = _a.birthdate, idcard = _a.idcard, phonenumber = _a.phonenumber, email = _a.email, password = _a.password, confirm_password = _a.confirm_password, image = _a.image, account = _a.account, address = _a.address, latitude = _a.latitude, longitude = _a.longitude, video = _a.video, description = _a.description, certificate = _a.certificate, service = _a.service;
                    if (!(account === 'client')) return [3 /*break*/, 11];
                    user = new client_1.Client(firstname, lastname, gender, birthdate, Number(phonenumber), email, password, confirm_password, image, account, address, Number(latitude), Number(longitude));
                    errors = user.validateSignUp();
                    if (!(errors.length > 0)) return [3 /*break*/, 1];
                    response.render('signup', { errors: errors, firstname: firstname, lastname: lastname, gender: gender, birthdate: birthdate, phonenumber: phonenumber, email: email, password: password, confirm_password: confirm_password, image: image, account: account });
                    return [3 /*break*/, 10];
                case 1:
                    connection_1.connectDB();
                    return [4 /*yield*/, client_2.client_model.findOne({ 'phonenumber': user.getPhonenumber() }, function (error) {
                            if (error) {
                                console.log(error);
                            }
                        })];
                case 2:
                    doc1 = _d.sent();
                    return [4 /*yield*/, client_2.client_model.findOne({ 'account.email': user.getEmail() }, function (error) {
                            if (error) {
                                console.log(error);
                            }
                        })];
                case 3:
                    doc2 = _d.sent();
                    return [4 /*yield*/, provider_2.provider_model.findOne({ 'phonenumber': user.getPhonenumber() }, function (error) {
                            if (error) {
                                console.log(error);
                            }
                        })];
                case 4:
                    doc3 = _d.sent();
                    return [4 /*yield*/, provider_2.provider_model.findOne({ 'account.email': user.getEmail() }, function (error) {
                            if (error) {
                                console.log(error);
                            }
                        })];
                case 5:
                    doc4 = _d.sent();
                    docs = [doc1, doc2, doc3, doc4];
                    if (!(docs[0] || docs[2])) return [3 /*break*/, 6];
                    request.flash('info', 'número de teléfono ya existe.');
                    response.render('signup', { error_message: request.flash('info'), firstname: firstname, lastname: lastname, gender: gender, birthdate: birthdate, phonenumber: phonenumber, email: email, password: password, confirm_password: confirm_password, image: image, account: account });
                    return [3 /*break*/, 10];
                case 6:
                    if (!(docs[1] || docs[3])) return [3 /*break*/, 7];
                    request.flash('info', 'correo electrónico ya existe.');
                    response.render('signup', { error_message: request.flash('info'), firstname: firstname, lastname: lastname, gender: gender, birthdate: birthdate, phonenumber: phonenumber, email: email, password: password, confirm_password: confirm_password, image: image, account: account });
                    return [3 /*break*/, 10];
                case 7:
                    connection_1.connectDB();
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
                    console.log(model);
                    _b = model.account;
                    return [4 /*yield*/, model.encryptPassword(password)];
                case 8:
                    _b.password = _d.sent();
                    return [4 /*yield*/, model.save(function (error) {
                            if (error) {
                                console.log(error);
                            }
                        })];
                case 9:
                    _d.sent();
                    request.flash('info', 'estas registrado.');
                    response.render('login', { success_message: request.flash('info') });
                    user.sendMail();
                    _d.label = 10;
                case 10: return [3 /*break*/, 21];
                case 11:
                    user = new provider_1.Provider(firstname, lastname, gender, birthdate, Number(phonenumber), email, password, confirm_password, image, account, address, Number(latitude), Number(longitude), Number(idcard), video, description, certificate, service);
                    errors = user.validateSignUp();
                    if (!(errors.length > 0)) return [3 /*break*/, 12];
                    response.render('signup', { errors: errors, firstname: firstname, lastname: lastname, gender: gender, birthdate: birthdate, idcard: idcard, phonenumber: phonenumber, email: email, password: password, confirm_password: confirm_password, image: image, account: account, video: video, description: description, certificate: certificate, service: service });
                    return [3 /*break*/, 21];
                case 12:
                    connection_1.connectDB();
                    return [4 /*yield*/, client_2.client_model.findOne({ 'phonenumber': user.getPhonenumber() }, function (error) {
                            if (error) {
                                console.log(error);
                            }
                        })];
                case 13:
                    doc1 = _d.sent();
                    return [4 /*yield*/, client_2.client_model.findOne({ 'account.email': user.getEmail() }, function (error) {
                            if (error) {
                                console.log(error);
                            }
                        })];
                case 14:
                    doc2 = _d.sent();
                    return [4 /*yield*/, provider_2.provider_model.findOne({ 'phonenumber': user.getPhonenumber() }, function (error) {
                            if (error) {
                                console.log(error);
                            }
                        })];
                case 15:
                    doc3 = _d.sent();
                    return [4 /*yield*/, provider_2.provider_model.findOne({ 'account.email': user.getEmail() }, function (error) {
                            if (error) {
                                console.log(error);
                            }
                        })];
                case 16:
                    doc4 = _d.sent();
                    docs = [doc1, doc2, doc3, doc4];
                    if (!(docs[0] || docs[2])) return [3 /*break*/, 17];
                    request.flash('info', 'número de teléfono ya existe.');
                    response.render('signup', { error_message: request.flash('info'), firstname: firstname, lastname: lastname, gender: gender, birthdate: birthdate, idcard: idcard, phonenumber: phonenumber, email: email, password: password, confirm_password: confirm_password, image: image, account: account, video: video, description: description, certificate: certificate, service: service });
                    return [3 /*break*/, 21];
                case 17:
                    if (!(docs[1] || docs[3])) return [3 /*break*/, 18];
                    request.flash('info', 'correo electrónico ya existe.');
                    response.render('signup', { error_message: request.flash('info'), firstname: firstname, lastname: lastname, gender: gender, birthdate: birthdate, idcard: idcard, phonenumber: phonenumber, email: email, password: password, confirm_password: confirm_password, image: image, account: account, video: video, description: description, certificate: certificate, service: service });
                    return [3 /*break*/, 21];
                case 18:
                    connection_1.connectDB();
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
                    console.log(model);
                    _c = model.account;
                    return [4 /*yield*/, model.encryptPassword(password)];
                case 19:
                    _c.password = _d.sent();
                    return [4 /*yield*/, model.save(function (error) {
                            if (error) {
                                console.log(error);
                            }
                        })];
                case 20:
                    _d.sent();
                    request.flash('info', 'estas registrado.');
                    response.render('login', { success_message: request.flash('info') });
                    user.sendMail();
                    _d.label = 21;
                case 21: return [2 /*return*/];
            }
        });
    }); });
    app.get('/login', function (request, response) {
        response.render('login');
    });
    app.post('/login', function (request, response) { return __awaiter(_this, void 0, void 0, function () {
        var _a, email, password, account, user, errors, email_expression, doc, match, user, errors, email_expression, doc, match;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    _a = request.body, email = _a.email, password = _a.password, account = _a.account;
                    if (!(account === 'client')) return [3 /*break*/, 9];
                    user = new client_1.Client("", "", "", "", 0, "", "", "", "", "", "", 0, 0);
                    errors = user.validateLogIn(email, password, account);
                    if (!(errors.length > 0)) return [3 /*break*/, 1];
                    response.render('login', { errors: errors, email: email, password: password, account: account });
                    return [3 /*break*/, 8];
                case 1:
                    connection_1.connectDB();
                    email_expression = /[^@\s]+@[^@\s]+\.[^@\s]+/;
                    doc = void 0;
                    if (!email_expression.test(email)) return [3 /*break*/, 3];
                    return [4 /*yield*/, client_2.client_model.findOne({ 'account.email': email }, function (error) {
                            if (error) {
                                console.log(error);
                            }
                        })];
                case 2:
                    doc = _b.sent();
                    return [3 /*break*/, 5];
                case 3: return [4 /*yield*/, client_2.client_model.findOne({ phonenumber: email }, function (error) {
                        if (error) {
                            console.log(error);
                        }
                    })];
                case 4:
                    doc = _b.sent();
                    _b.label = 5;
                case 5:
                    if (!!doc) return [3 /*break*/, 6];
                    request.flash('info', 'correo electrónico o número de teléfono no existe.');
                    response.render('login', { error_message: request.flash('info'), email: email, password: password, account: account });
                    return [3 /*break*/, 8];
                case 6: return [4 /*yield*/, doc.matchPassword(password)];
                case 7:
                    match = _b.sent();
                    if (match) {
                        if (request.session != undefined) {
                            request.session.user_id = doc._id;
                            request.flash('info', 'bienvenido ' + email + '.');
                            response.render('main', { success_message: request.flash('info'), email: email, password: password, account: account });
                        }
                    }
                    else {
                        request.flash('info', 'contraseña incorrecta.');
                        response.render('login', { error_message: request.flash('info'), email: email, password: password, account: account });
                    }
                    _b.label = 8;
                case 8: return [3 /*break*/, 17];
                case 9:
                    user = new provider_1.Provider("", "", "", "", 0, "", "", "", "", "", "", 0, 0, 0, "", "", "", "");
                    errors = user.validateLogIn(email, password, account);
                    if (!(errors.length > 0)) return [3 /*break*/, 10];
                    response.render('login', { errors: errors, email: email, password: password, account: account });
                    return [3 /*break*/, 17];
                case 10:
                    connection_1.connectDB();
                    email_expression = /[^@\s]+@[^@\s]+\.[^@\s]+/;
                    doc = void 0;
                    if (!email_expression.test(email)) return [3 /*break*/, 12];
                    return [4 /*yield*/, provider_2.provider_model.findOne({ 'account.email': email }, function (error) {
                            if (error) {
                                console.log(error);
                            }
                        })];
                case 11:
                    doc = _b.sent();
                    return [3 /*break*/, 14];
                case 12: return [4 /*yield*/, provider_2.provider_model.findOne({ phonenumber: email }, function (error) {
                        if (error) {
                            console.log(error);
                        }
                    })];
                case 13:
                    doc = _b.sent();
                    _b.label = 14;
                case 14:
                    if (!!doc) return [3 /*break*/, 15];
                    request.flash('info', 'correo electrónico o número de teléfono no existe.');
                    response.render('login', { error_message: request.flash('info'), email: email, password: password, account: account });
                    return [3 /*break*/, 17];
                case 15: return [4 /*yield*/, doc.matchPassword(password)];
                case 16:
                    match = _b.sent();
                    if (match) {
                        if (request.session != undefined) {
                            request.session.user_id = doc._id;
                            request.flash('info', 'bienvenido ' + email + '.');
                            response.render('main', { success_message: request.flash('info'), email: email, password: password, account: account });
                        }
                    }
                    else {
                        request.flash('info', 'contraseña incorrecta.');
                        response.render('login', { error_message: request.flash('info'), email: email, password: password, account: account });
                    }
                    _b.label = 17;
                case 17: return [2 /*return*/];
            }
        });
    }); });
    app.get('/logout', function (request, response) {
        request.logout();
        request.flash('info', 'hasta luego.');
        response.render('index', { success_message: request.flash('info') });
        if (request.session != undefined) {
            request.session.destroy(function (error) {
                if (error) {
                    console.log(error);
                }
            });
        }
    });
    app.get('/searchservice', function (request, response) {
        response.render('searchservice');
    });
    app.post('/searchservice', function (request, response) {
        var service = request.body.service;
        connection_1.connectDB();
        provider_2.provider_model.find({ 'service.title': service }, function (error, document) {
            if (error) {
                console.log(error);
            }
            if (!document.length) {
                request.flash('info', 'servicio no existe.');
                response.render('searchservice', { error_message: request.flash('info'), service: service });
            }
            else {
                response.render('searchservice', { users: document, service: service });
            }
        });
    });
    app.get('/searchservice/requestquotation/:id', function (request, response) {
        var id = mongoose_1.default.Types.ObjectId(request.params.id);
        connection_1.connectDB();
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
            connection_1.connectDB();
            var model = new quotation_1.quotation_model({
                _id: new mongoose_1.default.Types.ObjectId(),
                _id_client: request.session.user_id,
                _id_provider: provider,
                service: service,
                date: date,
                description: description,
                cost: 0,
                status: "pendiente",
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
            connection_1.connectDB();
            quotation_1.quotation_model.aggregate([{
                    $lookup: {
                        from: "providers",
                        localField: "_id_provider",
                        foreignField: "_id",
                        as: "fromProviders"
                    }
                },
                {
                    $match: { _id_client: id }
                },
                {
                    $replaceRoot: { newRoot: { $mergeObjects: [{ $arrayElemAt: ["$fromProviders", 0] }, "$$ROOT"] } }
                },
                {
                    $project: { account: 0, gender: 0, birthdate: 0, idcard: 0, phonenumber: 0, address: 0, coordinate: 0, video: 0, certificate: 0, __v: 0, fromProviders: 0 }
                }], function (error, document) {
                if (error) {
                    console.log(error);
                }
                if (!document.length) {
                    request.flash('info', 'no tienes cotizaciones.');
                    response.render('checkquotations', { error_message: request.flash('info') });
                }
                else {
                    console.log(document);
                    response.render('checkquotations', { quotations: document });
                }
            });
        }
    });
    module.exports = app;
};
main();
