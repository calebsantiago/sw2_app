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
Object.defineProperty(exports, "__esModule", { value: true });
var clientMock_1 = require("./mock/clientMock");
var providerMock_1 = require("./mock/providerMock");
var quotationMock_1 = require("./mock/quotationMock");
var functions_1 = require("./functions");
exports.controller = {
    'getindex': function (request, response) {
        response.render('index');
    },
    'getsignup': function (request, response) {
        response.render('signup');
    },
    'postsignup': function (request, response) {
        return __awaiter(this, void 0, void 0, function () {
            var firstname, lastname, gender, birthdate, idcard, phonenumber, email, password, confirm_password, image, account, address, latitude, longitude, video, description, certificate, service, query1, query2, query3, query4;
            var _a;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        firstname = (_a = request.body, _a.firstname), lastname = _a.lastname, gender = _a.gender, birthdate = _a.birthdate, idcard = _a.idcard, phonenumber = _a.phonenumber, email = _a.email, password = _a.password, confirm_password = _a.confirm_password, image = _a.image, account = _a.account, address = _a.address, latitude = _a.latitude, longitude = _a.longitude, video = _a.video, description = _a.description, certificate = _a.certificate, service = _a.service;
                        return [4 /*yield*/, clientMock_1.ClientMock.getInstance().findbyphonenumber(phonenumber)];
                    case 1:
                        query1 = _b.sent();
                        return [4 /*yield*/, clientMock_1.ClientMock.getInstance().findbyemail(email)];
                    case 2:
                        query2 = _b.sent();
                        return [4 /*yield*/, providerMock_1.ProviderMock.getInstance().findbyphonenumber(phonenumber)];
                    case 3:
                        query3 = _b.sent();
                        return [4 /*yield*/, providerMock_1.ProviderMock.getInstance().findbyemail(email)];
                    case 4:
                        query4 = _b.sent();
                        if (query1 || query3) {
                            request.flash('info', 'número de teléfono ya existe.');
                            response.render('signup', { error_message: request.flash('info'), firstname: firstname, lastname: lastname, gender: gender, birthdate: birthdate, idcard: idcard, phonenumber: phonenumber, email: email, password: password, confirm_password: confirm_password, image: image, account: account, video: video, description: description, certificate: certificate, service: service });
                        }
                        else if (query2 || query4) {
                            request.flash('info', 'correo electrónico ya existe.');
                            response.render('signup', { error_message: request.flash('info'), firstname: firstname, lastname: lastname, gender: gender, birthdate: birthdate, idcard: idcard, phonenumber: phonenumber, email: email, password: password, confirm_password: confirm_password, image: image, account: account, video: video, description: description, certificate: certificate, service: service });
                        }
                        else {
                            if (account === 'client') {
                                clientMock_1.ClientMock.getInstance().insert(email, password, image, firstname, lastname, gender, birthdate, phonenumber, address, latitude, longitude);
                            }
                            else {
                                providerMock_1.ProviderMock.getInstance().insert(email, password, image, firstname, lastname, gender, birthdate, phonenumber, address, latitude, longitude, idcard, video, description, certificate, service);
                            }
                            request.flash('info', 'estas registrado.');
                            response.render('login', { success_message: request.flash('info') });
                            functions_1.sendMail(email, firstname, lastname);
                        }
                        return [2 /*return*/];
                }
            });
        });
    },
    'getlogin': function (request, response) {
        response.render('login');
    },
    'postlogin': function (request, response) {
        return __awaiter(this, void 0, void 0, function () {
            var email, password, account, email_expression, query;
            var _a;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        email = (_a = request.body, _a.email), password = _a.password;
                        account = 'client';
                        email_expression = /[^@\s]+@[^@\s]+\.[^@\s]+/;
                        if (!email_expression.test(email)) return [3 /*break*/, 4];
                        return [4 /*yield*/, clientMock_1.ClientMock.getInstance().findbyemail(email)];
                    case 1:
                        query = _b.sent();
                        if (!!query) return [3 /*break*/, 3];
                        return [4 /*yield*/, providerMock_1.ProviderMock.getInstance().findbyemail(email)];
                    case 2:
                        query = _b.sent();
                        account = 'provider';
                        _b.label = 3;
                    case 3: return [3 /*break*/, 7];
                    case 4: return [4 /*yield*/, clientMock_1.ClientMock.getInstance().findbyphonenumber(email)];
                    case 5:
                        query = _b.sent();
                        if (!!query) return [3 /*break*/, 7];
                        return [4 /*yield*/, providerMock_1.ProviderMock.getInstance().findbyphonenumber(email)];
                    case 6:
                        query = _b.sent();
                        account = 'provider';
                        _b.label = 7;
                    case 7:
                        if (!query) {
                            request.flash('info', 'correo electrónico o número de teléfono no existe.');
                            response.render('login', { error_message: request.flash('info'), email: email, password: password });
                        }
                        else {
                            if (password === query.account.password) {
                                if (request.session != undefined) {
                                    request.session.user_id = query._id;
                                    request.session.account = account;
                                    response.render('main', { user: query, account: account });
                                }
                            }
                            else {
                                request.flash('info', 'contraseña incorrecta.');
                                response.render('login', { error_message: request.flash('info'), email: email, password: password });
                            }
                        }
                        return [2 /*return*/];
                }
            });
        });
    },
    'getlogout': function (request, response) {
        if (request.session != undefined) {
            request.logout();
            request.session.destroy(function (error) {
                if (error) {
                    console.log(error);
                }
            });
            response.redirect('/');
        }
        else {
            response.render('login');
        }
    },
    'getmain': function (request, response) {
        return __awaiter(this, void 0, void 0, function () {
            var id, account, query;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!(request.session != undefined)) return [3 /*break*/, 5];
                        id = request.session.user_id;
                        account = request.session.account;
                        query = void 0;
                        if (!(account == 'client')) return [3 /*break*/, 2];
                        return [4 /*yield*/, clientMock_1.ClientMock.getInstance().findbyid(id)];
                    case 1:
                        query = _a.sent();
                        return [3 /*break*/, 4];
                    case 2: return [4 /*yield*/, providerMock_1.ProviderMock.getInstance().findbyid(id)];
                    case 3:
                        query = _a.sent();
                        _a.label = 4;
                    case 4:
                        response.render('main', { user: query, account: account });
                        return [3 /*break*/, 6];
                    case 5:
                        response.render('login');
                        _a.label = 6;
                    case 6: return [2 /*return*/];
                }
            });
        });
    },
    'getsearchservice': function (request, response) {
        return __awaiter(this, void 0, void 0, function () {
            var id, query, providers;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!(request.session != undefined)) return [3 /*break*/, 3];
                        id = request.session.user_id;
                        return [4 /*yield*/, clientMock_1.ClientMock.getInstance().findbyid(id)];
                    case 1:
                        query = _a.sent();
                        return [4 /*yield*/, providerMock_1.ProviderMock.getInstance().findall()];
                    case 2:
                        providers = _a.sent();
                        response.render('searchservice', { user: query, providers: providers });
                        return [3 /*break*/, 4];
                    case 3:
                        response.render('login');
                        _a.label = 4;
                    case 4: return [2 /*return*/];
                }
            });
        });
    },
    'postsearchservice': function (request, response) {
        return __awaiter(this, void 0, void 0, function () {
            var services, id, query, document_1, providers;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!(request.session != undefined)) return [3 /*break*/, 4];
                        services = request.body.services;
                        id = request.session.user_id;
                        return [4 /*yield*/, clientMock_1.ClientMock.getInstance().findbyid(id)];
                    case 1:
                        query = _a.sent();
                        return [4 /*yield*/, providerMock_1.ProviderMock.getInstance().findbyservicesaveragerate(services)];
                    case 2:
                        document_1 = _a.sent();
                        return [4 /*yield*/, providerMock_1.ProviderMock.getInstance().findall()];
                    case 3:
                        providers = _a.sent();
                        if (!document_1.length) {
                            request.flash('info', 'servicio no existe.');
                            response.render('searchservice', { error_message: request.flash('info'), user: query, providers: providers, services: services });
                        }
                        else {
                            response.render('searchservice', { user: query, users: document_1, providers: providers, services: services });
                        }
                        return [3 /*break*/, 5];
                    case 4:
                        response.render('login');
                        _a.label = 5;
                    case 5: return [2 /*return*/];
                }
            });
        });
    },
    'getrequestquotation': function (request, response) {
        return __awaiter(this, void 0, void 0, function () {
            var id, user;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!(request.session != undefined)) return [3 /*break*/, 2];
                        id = request.params.id;
                        return [4 /*yield*/, providerMock_1.ProviderMock.getInstance().findbyid(id)];
                    case 1:
                        user = _a.sent();
                        response.render('requestquotation', { user: user });
                        return [3 /*break*/, 3];
                    case 2:
                        response.render('login');
                        _a.label = 3;
                    case 3: return [2 /*return*/];
                }
            });
        });
    },
    'postrequestquotation': function (request, response) {
        var _a;
        if (request.session != undefined) {
            var provider = (_a = request.body, _a.provider), service = _a.service, date = _a.date, description = _a.description, image = _a.image;
            var id = request.session.user_id;
            quotationMock_1.QuotationMock.getInstance().insert(id, provider, service, date, description, image);
            response.redirect('/searchservice');
        }
        else {
            response.render('login');
        }
    },
    'getcheckquotations': function (request, response) {
        return __awaiter(this, void 0, void 0, function () {
            var id, account, quotations;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!(request.session != undefined)) return [3 /*break*/, 5];
                        id = request.session.user_id;
                        account = request.session.account;
                        quotations = void 0;
                        if (!(account == 'client')) return [3 /*break*/, 2];
                        return [4 /*yield*/, quotationMock_1.QuotationMock.getInstance().findcheckbyclient(id)];
                    case 1:
                        quotations = _a.sent();
                        return [3 /*break*/, 4];
                    case 2: return [4 /*yield*/, quotationMock_1.QuotationMock.getInstance().findcheckbyprovider(id)];
                    case 3:
                        quotations = _a.sent();
                        _a.label = 4;
                    case 4:
                        if (!quotations.length) {
                            request.flash('info', 'no tienes cotizaciones pendientes.');
                            response.render('checkquotations', { error_message: request.flash('info'), account: account });
                        }
                        else {
                            response.render('checkquotations', { account: account, quotations: quotations });
                        }
                        return [3 /*break*/, 6];
                    case 5:
                        response.render('login');
                        _a.label = 6;
                    case 6: return [2 /*return*/];
                }
            });
        });
    },
    'getquoteservice': function (request, response) {
        return __awaiter(this, void 0, void 0, function () {
            var id, quotation;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!(request.session != undefined)) return [3 /*break*/, 2];
                        id = request.params.id;
                        return [4 /*yield*/, quotationMock_1.QuotationMock.getInstance().findbyid(id)];
                    case 1:
                        quotation = _a.sent();
                        response.render('quoteservice', { quotation: quotation });
                        return [3 /*break*/, 3];
                    case 2:
                        response.render('login');
                        _a.label = 3;
                    case 3: return [2 /*return*/];
                }
            });
        });
    },
    'putquoteservice': function (request, response) {
        if (request.session != undefined) {
            var cost = request.body.cost;
            var id = request.params.id;
            quotationMock_1.QuotationMock.getInstance().updatecost(id, cost);
            response.redirect('/checkquotations');
        }
        else {
            response.render('login');
        }
    },
    'putchangestatus': function (request, response) {
        var _a;
        if (request.session != undefined) {
            var id = (_a = request.body, _a.id), status_1 = _a.status;
            quotationMock_1.QuotationMock.getInstance().updatestatus(id, status_1);
            if (status_1 == 'reportado') {
                response.redirect('/checkhistory');
            }
            else {
                response.redirect('/checkquotations');
            }
        }
        else {
            response.render('login');
        }
    },
    'getlocateclient': function (request, response) {
        return __awaiter(this, void 0, void 0, function () {
            var id, quotation, id_client, id_provider, client, provider;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!(request.session != undefined)) return [3 /*break*/, 5];
                        id = request.params.id;
                        return [4 /*yield*/, quotationMock_1.QuotationMock.getInstance().findbyid(id)];
                    case 1:
                        quotation = _a.sent();
                        if (!(quotation != null)) return [3 /*break*/, 4];
                        id_client = quotation._id_client.toString();
                        id_provider = quotation._id_provider.toString();
                        return [4 /*yield*/, clientMock_1.ClientMock.getInstance().findbyid(id_client)];
                    case 2:
                        client = _a.sent();
                        return [4 /*yield*/, providerMock_1.ProviderMock.getInstance().findbyid(id_provider)];
                    case 3:
                        provider = _a.sent();
                        response.render('locateclient', { client: client, provider: provider, quotation: quotation });
                        _a.label = 4;
                    case 4: return [3 /*break*/, 6];
                    case 5:
                        response.render('login');
                        _a.label = 6;
                    case 6: return [2 /*return*/];
                }
            });
        });
    },
    'getcheckhistory': function (request, response) {
        return __awaiter(this, void 0, void 0, function () {
            var id, account, quotations;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!(request.session != undefined)) return [3 /*break*/, 5];
                        id = request.session.user_id;
                        account = request.session.account;
                        quotations = void 0;
                        if (!(account == 'client')) return [3 /*break*/, 2];
                        return [4 /*yield*/, quotationMock_1.QuotationMock.getInstance().findhistorybyclient(id)];
                    case 1:
                        quotations = _a.sent();
                        return [3 /*break*/, 4];
                    case 2: return [4 /*yield*/, quotationMock_1.QuotationMock.getInstance().findhistorybyprovider(id)];
                    case 3:
                        quotations = _a.sent();
                        _a.label = 4;
                    case 4:
                        if (!quotations.length) {
                            request.flash('info', 'no tienes historial.');
                            response.render('checkhistory', { error_message: request.flash('info'), account: account });
                        }
                        else {
                            response.render('checkhistory', { account: account, quotations: quotations });
                        }
                        return [3 /*break*/, 6];
                    case 5:
                        response.render('login');
                        _a.label = 6;
                    case 6: return [2 /*return*/];
                }
            });
        });
    },
    'getrateservice': function (request, response) {
        return __awaiter(this, void 0, void 0, function () {
            var id, quotation, id_provider, provider;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!(request.session != undefined)) return [3 /*break*/, 4];
                        id = request.params.id;
                        return [4 /*yield*/, quotationMock_1.QuotationMock.getInstance().findbyid(id)];
                    case 1:
                        quotation = _a.sent();
                        if (!(quotation != null)) return [3 /*break*/, 3];
                        id_provider = quotation._id_provider.toString();
                        return [4 /*yield*/, providerMock_1.ProviderMock.getInstance().findbyid(id_provider)];
                    case 2:
                        provider = _a.sent();
                        response.render('rateservice', { user: provider, quotation: quotation });
                        _a.label = 3;
                    case 3: return [3 /*break*/, 5];
                    case 4:
                        response.render('login');
                        _a.label = 5;
                    case 5: return [2 /*return*/];
                }
            });
        });
    },
    'putrateservice': function (request, response) {
        var _a;
        if (request.session != undefined) {
            var rate = (_a = request.body, _a.rate), comment = _a.comment;
            var id = request.params.id;
            quotationMock_1.QuotationMock.getInstance().updateratecomment(id, rate, comment);
            response.redirect('/checkhistory');
        }
        else {
            response.render('login');
        }
    },
    'getupdateaccount': function (request, response) {
        return __awaiter(this, void 0, void 0, function () {
            var id, account, query;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!(request.session != undefined)) return [3 /*break*/, 5];
                        id = request.session.user_id;
                        account = request.session.account;
                        query = void 0;
                        if (!(account == 'client')) return [3 /*break*/, 2];
                        return [4 /*yield*/, clientMock_1.ClientMock.getInstance().findbyid(id)];
                    case 1:
                        query = _a.sent();
                        return [3 /*break*/, 4];
                    case 2: return [4 /*yield*/, providerMock_1.ProviderMock.getInstance().findbyid(id)];
                    case 3:
                        query = _a.sent();
                        _a.label = 4;
                    case 4:
                        response.render('updateaccount', { account: account, user: query });
                        return [3 /*break*/, 6];
                    case 5:
                        response.render('login');
                        _a.label = 6;
                    case 6: return [2 /*return*/];
                }
            });
        });
    },
    'putupdateaccount': function (request, response) {
        return __awaiter(this, void 0, void 0, function () {
            var firstname, lastname, phonenumber, email, password, image, idcard, video, description, certificate, service, id, account, query1, query2, query3, query4, user, document_2;
            var _a;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        if (!(request.session != undefined)) return [3 /*break*/, 16];
                        firstname = (_a = request.body, _a.firstname), lastname = _a.lastname, phonenumber = _a.phonenumber, email = _a.email, password = _a.password, image = _a.image, idcard = _a.idcard, video = _a.video, description = _a.description, certificate = _a.certificate, service = _a.service;
                        id = request.session.user_id;
                        account = request.session.account;
                        return [4 /*yield*/, clientMock_1.ClientMock.getInstance().findbyphonenumber(phonenumber)];
                    case 1:
                        query1 = _b.sent();
                        return [4 /*yield*/, clientMock_1.ClientMock.getInstance().findbyemail(email)];
                    case 2:
                        query2 = _b.sent();
                        return [4 /*yield*/, providerMock_1.ProviderMock.getInstance().findbyphonenumber(phonenumber)];
                    case 3:
                        query3 = _b.sent();
                        return [4 /*yield*/, providerMock_1.ProviderMock.getInstance().findbyemail(email)];
                    case 4:
                        query4 = _b.sent();
                        user = void 0;
                        if (!(account == 'client')) return [3 /*break*/, 10];
                        return [4 /*yield*/, clientMock_1.ClientMock.getInstance().findbyid(id)];
                    case 5:
                        user = _b.sent();
                        if (!(user != null)) return [3 /*break*/, 9];
                        if (!(user.name.firstname == firstname && user.name.lastname == lastname && user.account.email == email && user.account.password == password && user.account.image == image && user.phonenumber == phonenumber)) return [3 /*break*/, 6];
                        request.flash('info', 'sin cambios.');
                        response.render('updateaccount', { success_message: request.flash('info'), user: user, account: account });
                        return [3 /*break*/, 9];
                    case 6:
                        if (!(functions_1.jsonlength(query1) - 6 > 0 || functions_1.jsonlength(query2) - 6 > 0 || functions_1.jsonlength(query3) > 0 || functions_1.jsonlength(query4) > 0)) return [3 /*break*/, 7];
                        request.flash('info', 'número de teléfono o correo electrónico ya existen.');
                        response.render('updateaccount', { error_message: request.flash('info'), user: user, account: account });
                        return [3 /*break*/, 9];
                    case 7:
                        clientMock_1.ClientMock.getInstance().updateprofile(id, firstname, lastname, email, password, image, phonenumber);
                        return [4 /*yield*/, clientMock_1.ClientMock.getInstance().findbyid(id)];
                    case 8:
                        document_2 = _b.sent();
                        request.flash('info', 'los datos se actualizaron correctamente.');
                        response.render('main', { success_message: request.flash('info'), user: document_2, account: account });
                        _b.label = 9;
                    case 9: return [3 /*break*/, 15];
                    case 10: return [4 /*yield*/, providerMock_1.ProviderMock.getInstance().findbyid(id)];
                    case 11:
                        user = _b.sent();
                        if (!(user != null)) return [3 /*break*/, 15];
                        if (!(user.name.firstname == firstname && user.name.lastname == lastname && user.account.email == email && user.account.password == password && user.account.image == image && user.phonenumber == phonenumber && user.idcard == idcard && user.video == video && user.description == description && user.certificate == certificate && user.service.title == service)) return [3 /*break*/, 12];
                        request.flash('info', 'sin cambios.');
                        response.render('updateaccount', { success_message: request.flash('info'), user: user, account: account });
                        return [3 /*break*/, 15];
                    case 12:
                        if (!(functions_1.jsonlength(query1) > 0 || functions_1.jsonlength(query2) > 0 || functions_1.jsonlength(query3) - 6 > 0 || functions_1.jsonlength(query4) - 6 > 0)) return [3 /*break*/, 13];
                        request.flash('info', 'número de teléfono o correo electrónico ya existen.');
                        response.render('updateaccount', { error_message: request.flash('info'), user: user, account: account });
                        return [3 /*break*/, 15];
                    case 13:
                        providerMock_1.ProviderMock.getInstance().updateprofile(id, firstname, lastname, email, password, image, phonenumber, idcard, video, description, certificate, service);
                        return [4 /*yield*/, providerMock_1.ProviderMock.getInstance().findbyid(id)];
                    case 14:
                        document_2 = _b.sent();
                        request.flash('info', 'los datos se actualizaron correctamente.');
                        response.render('main', { success_message: request.flash('info'), user: document_2, account: account });
                        _b.label = 15;
                    case 15: return [3 /*break*/, 17];
                    case 16:
                        response.render('login');
                        _b.label = 17;
                    case 17: return [2 /*return*/];
                }
            });
        });
    },
    'putupdateaccountlocation': function (request, response) {
        return __awaiter(this, void 0, void 0, function () {
            var address, latitude, longitude, id, account, document_3;
            var _a;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        if (!(request.session != undefined)) return [3 /*break*/, 5];
                        address = (_a = request.body, _a.address), latitude = _a.latitude, longitude = _a.longitude;
                        id = request.session.user_id;
                        account = request.session.account;
                        if (!(account == 'client')) return [3 /*break*/, 2];
                        clientMock_1.ClientMock.getInstance().updatelocation(id, address, latitude, longitude);
                        return [4 /*yield*/, clientMock_1.ClientMock.getInstance().findbyid(id)];
                    case 1:
                        document_3 = _b.sent();
                        return [3 /*break*/, 4];
                    case 2:
                        providerMock_1.ProviderMock.getInstance().updatelocation(id, address, latitude, longitude);
                        return [4 /*yield*/, providerMock_1.ProviderMock.getInstance().findbyid(id)];
                    case 3:
                        document_3 = _b.sent();
                        _b.label = 4;
                    case 4:
                        request.flash('info', 'los datos se actualizaron correctamente.');
                        response.render('main', { success_message: request.flash('info'), user: document_3, account: account });
                        return [3 /*break*/, 6];
                    case 5:
                        response.render('login');
                        _b.label = 6;
                    case 6: return [2 /*return*/];
                }
            });
        });
    },
    'getdeleteaccount': function (request, response) {
        if (request.session != undefined) {
            var account = request.session.account;
            response.render('deleteaccount', { account: account });
        }
        else {
            response.render('login');
        }
    },
    'deletedeleteaccount': function (request, response) {
        return __awaiter(this, void 0, void 0, function () {
            var password, id, account, query;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!(request.session != undefined)) return [3 /*break*/, 5];
                        password = request.body.password;
                        id = request.session.user_id;
                        account = request.session.account;
                        query = void 0;
                        if (!(account == 'client')) return [3 /*break*/, 2];
                        return [4 /*yield*/, clientMock_1.ClientMock.getInstance().findbyid(id)];
                    case 1:
                        query = _a.sent();
                        if (query != null) {
                            if (password === query.account.password) {
                                quotationMock_1.QuotationMock.getInstance().updatemanybyclient(id);
                                clientMock_1.ClientMock.getInstance().delete(id);
                                response.redirect('/');
                            }
                            else {
                                request.flash('info', 'contraseña incorrecta.');
                                response.render('deleteaccount', { error_message: request.flash('info'), password: password });
                            }
                        }
                        return [3 /*break*/, 4];
                    case 2: return [4 /*yield*/, providerMock_1.ProviderMock.getInstance().findbyid(id)];
                    case 3:
                        query = _a.sent();
                        if (query != null) {
                            if (password === query.account.password) {
                                quotationMock_1.QuotationMock.getInstance().updatemanybyprovider(id);
                                providerMock_1.ProviderMock.getInstance().delete(id);
                                response.redirect('/');
                            }
                            else {
                                request.flash('info', 'contraseña incorrecta.');
                                response.render('deleteaccount', { error_message: request.flash('info'), password: password });
                            }
                        }
                        _a.label = 4;
                    case 4: return [3 /*break*/, 6];
                    case 5:
                        response.render('login');
                        _a.label = 6;
                    case 6: return [2 /*return*/];
                }
            });
        });
    }
};
