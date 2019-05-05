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
var connection_1 = require("./connection");
var client_1 = require("./schema/client");
var provider_1 = require("./schema/provider");
var client_2 = require("./class/client");
var provider_2 = require("./class/provider");
var mongoose_1 = __importDefault(require("mongoose"));
var express_session_1 = __importDefault(require("express-session"));
var passport_1 = __importDefault(require("passport"));
var connect_flash_1 = __importDefault(require("connect-flash"));
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
        resave: true,
        saveUninitialized: true
    }));
    app.use(passport_1.default.initialize());
    app.use(passport_1.default.session());
    app.use(connect_flash_1.default());
    app.get('/', function (request, response) {
        response.render('index');
    });
    app.get('/create', function (request, response) {
        response.render('create');
    });
    app.post('/create', function (request, response) { return __awaiter(_this, void 0, void 0, function () {
        function getAge(birthdate) {
            var today = new Date();
            var age = today.getFullYear() - new Date(birthdate).getFullYear();
            var month = today.getMonth() - new Date(birthdate).getMonth();
            if (month < 0 || (month === 0 && today.getDate() < new Date(birthdate).getDate())) {
                age--;
            }
            return age;
        }
        var _a, firstname, lastname, gender, birthdate, idcard, phonenumber, email, password, confirm_password, image, account, address, latitude, longitude, video, description, certificate, service, date_expression, phone_expression, email_expression, url_expression, id_expression, errors, user, doc1, doc2, doc3, doc4, model, _b, user, doc1, doc2, doc3, doc4, model, _c;
        return __generator(this, function (_d) {
            switch (_d.label) {
                case 0:
                    _a = request.body, firstname = _a.firstname, lastname = _a.lastname, gender = _a.gender, birthdate = _a.birthdate, idcard = _a.idcard, phonenumber = _a.phonenumber, email = _a.email, password = _a.password, confirm_password = _a.confirm_password, image = _a.image, account = _a.account, address = _a.address, latitude = _a.latitude, longitude = _a.longitude, video = _a.video, description = _a.description, certificate = _a.certificate, service = _a.service;
                    date_expression = /[0-9]{4}-[0-9]{2}-[0-9]{2}/;
                    phone_expression = /[0-9]{9}/;
                    email_expression = /[^@\s]+@[^@\s]+\.[^@\s]+/;
                    url_expression = /^(?:http(s)?:\/\/)?[\w.-]+(?:\.[\w\.-]+)+[\w\-\._~:/?#[\]@!\$&'\(\)\*\+,;=.]+/;
                    id_expression = /[0-9]{8}/;
                    errors = [];
                    if (firstname === "" || lastname === "" || gender === "" || birthdate === "" || phonenumber === "" || email === "" || password === "" || confirm_password === "" || account === "" || address === "" || latitude === "" || longitude === "") {
                        errors.push({ text: 'you must complete fields.' });
                    }
                    else {
                        if (!date_expression.test(birthdate)) {
                            errors.push({ text: 'birthdate is not valid.' });
                        }
                        if (getAge(birthdate) < 18) {
                            errors.push({ text: 'you are under 18 years.' });
                        }
                        if (!phone_expression.test(phonenumber)) {
                            errors.push({ text: 'phonenumber is not valid.' });
                        }
                        if (!email_expression.test(email)) {
                            errors.push({ text: 'email is not valid.' });
                        }
                        if (password != confirm_password) {
                            errors.push({ text: 'passwords do not match.' });
                        }
                        if (!isFinite(Number(latitude))) {
                            errors.push({ text: 'latitude is not valid.' });
                        }
                        if (!isFinite(Number(longitude))) {
                            errors.push({ text: 'longitude is not valid.' });
                        }
                        if (image != "") {
                            if (!url_expression.test(image)) {
                                errors.push({ text: 'image is not valid.' });
                            }
                        }
                        if (account === "provider") {
                            if (idcard === "" || video === "" || description === "" || service === "") {
                                errors.push({ text: 'you must complete fields.' });
                            }
                            else {
                                if (!id_expression.test(idcard)) {
                                    errors.push({ text: 'idcard is not valid.' });
                                }
                                if (!url_expression.test(video)) {
                                    errors.push({ text: 'video is not valid.' });
                                }
                                if (certificate != "") {
                                    if (!url_expression.test(certificate)) {
                                        errors.push({ text: 'certificate is not valid.' });
                                    }
                                }
                            }
                        }
                    }
                    if (!(errors.length > 0)) return [3 /*break*/, 1];
                    response.render('create', { errors: errors, firstname: firstname, lastname: lastname, gender: gender, birthdate: birthdate, idcard: idcard, phonenumber: phonenumber, email: email, password: password, confirm_password: confirm_password, image: image, account: account, video: video, description: description, certificate: certificate, service: service });
                    return [3 /*break*/, 20];
                case 1:
                    if (!(account === 'client')) return [3 /*break*/, 11];
                    user = new client_2.Client(firstname, lastname, gender, birthdate, Number(phonenumber), email, password, image, address, Number(latitude), Number(longitude));
                    connection_1.connectDB();
                    return [4 /*yield*/, client_1.client_model.findOne({ 'phonenumber': user.getPhonenumber() }, function (error, document) {
                            if (error) {
                                console.log(error);
                            }
                        })];
                case 2:
                    doc1 = _d.sent();
                    return [4 /*yield*/, client_1.client_model.findOne({ 'account.email': user.getEmail() }, function (error, document) {
                            if (error) {
                                console.log(error);
                            }
                        })];
                case 3:
                    doc2 = _d.sent();
                    return [4 /*yield*/, provider_1.provider_model.findOne({ 'phonenumber': user.getPhonenumber() }, function (error, document) {
                            if (error) {
                                console.log(error);
                            }
                        })];
                case 4:
                    doc3 = _d.sent();
                    return [4 /*yield*/, provider_1.provider_model.findOne({ 'account.email': user.getEmail() }, function (error, document) {
                            if (error) {
                                console.log(error);
                            }
                        })];
                case 5:
                    doc4 = _d.sent();
                    if (!(doc1 || doc3)) return [3 /*break*/, 6];
                    request.flash('info', 'phonenumber is already in use.');
                    response.render('create', { error_message: request.flash('info'), firstname: firstname, lastname: lastname, gender: gender, birthdate: birthdate, phonenumber: phonenumber, email: email, password: password, confirm_password: confirm_password, image: image, account: account });
                    return [3 /*break*/, 10];
                case 6:
                    if (!(doc2 || doc4)) return [3 /*break*/, 7];
                    request.flash('info', 'email is already in use.');
                    response.render('create', { error_message: request.flash('info'), firstname: firstname, lastname: lastname, gender: gender, birthdate: birthdate, phonenumber: phonenumber, email: email, password: password, confirm_password: confirm_password, image: image, account: account });
                    return [3 /*break*/, 10];
                case 7:
                    model = new client_1.client_model({
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
                        address: user.getAddres(),
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
                    request.flash('info', 'you are registered.');
                    response.render('signin', { success_message: request.flash('info') });
                    user.sendMail();
                    _d.label = 10;
                case 10: return [3 /*break*/, 20];
                case 11:
                    user = new provider_2.Provider(firstname, lastname, gender, birthdate, phonenumber, email, password, image, address, latitude, longitude, idcard, video, description, certificate, service);
                    connection_1.connectDB();
                    return [4 /*yield*/, client_1.client_model.findOne({ 'phonenumber': user.getPhonenumber() }, function (error, document) {
                            if (error) {
                                console.log(error);
                            }
                        })];
                case 12:
                    doc1 = _d.sent();
                    return [4 /*yield*/, client_1.client_model.findOne({ 'account.email': user.getEmail() }, function (error, document) {
                            if (error) {
                                console.log(error);
                            }
                        })];
                case 13:
                    doc2 = _d.sent();
                    return [4 /*yield*/, provider_1.provider_model.findOne({ 'phonenumber': user.getPhonenumber() }, function (error, document) {
                            if (error) {
                                console.log(error);
                            }
                        })];
                case 14:
                    doc3 = _d.sent();
                    return [4 /*yield*/, provider_1.provider_model.findOne({ 'account.email': user.getEmail() }, function (error, document) {
                            if (error) {
                                console.log(error);
                            }
                        })];
                case 15:
                    doc4 = _d.sent();
                    if (!(doc1 || doc3)) return [3 /*break*/, 16];
                    request.flash('info', 'phonenumber is already in use.');
                    response.render('create', { error_message: request.flash('info'), firstname: firstname, lastname: lastname, gender: gender, birthdate: birthdate, idcard: idcard, phonenumber: phonenumber, email: email, password: password, confirm_password: confirm_password, image: image, account: account, video: video, description: description, certificate: certificate, service: service });
                    return [3 /*break*/, 20];
                case 16:
                    if (!(doc2 || doc4)) return [3 /*break*/, 17];
                    request.flash('info', 'email is already in use.');
                    response.render('create', { error_message: request.flash('info'), firstname: firstname, lastname: lastname, gender: gender, birthdate: birthdate, idcard: idcard, phonenumber: phonenumber, email: email, password: password, confirm_password: confirm_password, image: image, account: account, video: video, description: description, certificate: certificate, service: service });
                    return [3 /*break*/, 20];
                case 17:
                    model = new provider_1.provider_model({
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
                        address: user.getAddres(),
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
                case 18:
                    _c.password = _d.sent();
                    return [4 /*yield*/, model.save(function (error) {
                            if (error) {
                                console.log(error);
                            }
                        })];
                case 19:
                    _d.sent();
                    request.flash('info', 'you are registered.');
                    response.render('signin', { success_message: request.flash('info') });
                    user.sendMail();
                    _d.label = 20;
                case 20: return [2 /*return*/];
            }
        });
    }); });
    app.get('/signin', function (request, response) {
        response.render('signin');
    });
    app.post('/signin', function (request, response) { return __awaiter(_this, void 0, void 0, function () {
        var _a, email, password, account, email_expression, phone_expression, errors, doc, match, doc, match;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    _a = request.body, email = _a.email, password = _a.password, account = _a.account;
                    email_expression = /[^@\s]+@[^@\s]+\.[^@\s]+/;
                    phone_expression = /[0-9]{9}/;
                    errors = [];
                    if (email === "" || password === "" || account === "") {
                        errors.push({ text: 'you must complete fields.' });
                    }
                    else {
                        if (!email_expression.test(email) && !phone_expression.test(email)) {
                            errors.push({ text: 'email or phonenumber is not valid.' });
                        }
                    }
                    if (!(errors.length > 0)) return [3 /*break*/, 1];
                    response.render('signin', { errors: errors, email: email, password: password, account: account });
                    return [3 /*break*/, 16];
                case 1:
                    if (!(account === 'client')) return [3 /*break*/, 9];
                    connection_1.connectDB();
                    doc = void 0;
                    if (!email_expression.test(email)) return [3 /*break*/, 3];
                    return [4 /*yield*/, client_1.client_model.findOne({ 'account.email': email }, function (error) {
                            if (error) {
                                console.log(error);
                            }
                        })];
                case 2:
                    doc = _b.sent();
                    return [3 /*break*/, 5];
                case 3: return [4 /*yield*/, client_1.client_model.findOne({ phonenumber: email }, function (error) {
                        if (error) {
                            console.log(error);
                        }
                    })];
                case 4:
                    doc = _b.sent();
                    _b.label = 5;
                case 5:
                    if (!!doc) return [3 /*break*/, 6];
                    request.flash('info', 'email or phonenumber does not exist.');
                    response.render('signin', { error_message: request.flash('info'), email: email, password: password, account: account });
                    return [3 /*break*/, 8];
                case 6: return [4 /*yield*/, doc.matchPassword(password)];
                case 7:
                    match = _b.sent();
                    if (match) {
                        request.flash('info', 'welcome ' + email + '.');
                        response.render('principal', { success_message: request.flash('info'), email: email, password: password, account: account });
                    }
                    else {
                        request.flash('info', 'passwords do not match.');
                        response.render('signin', { error_message: request.flash('info'), email: email, password: password, account: account });
                    }
                    _b.label = 8;
                case 8: return [3 /*break*/, 16];
                case 9:
                    connection_1.connectDB();
                    doc = void 0;
                    if (!email_expression.test(email)) return [3 /*break*/, 11];
                    return [4 /*yield*/, provider_1.provider_model.findOne({ 'account.email': email }, function (error) {
                            if (error) {
                                console.log(error);
                            }
                        })];
                case 10:
                    doc = _b.sent();
                    return [3 /*break*/, 13];
                case 11: return [4 /*yield*/, provider_1.provider_model.findOne({ phonenumber: email }, function (error) {
                        if (error) {
                            console.log(error);
                        }
                    })];
                case 12:
                    doc = _b.sent();
                    _b.label = 13;
                case 13:
                    if (!!doc) return [3 /*break*/, 14];
                    request.flash('info', 'email or phonenumber does not exist.');
                    response.render('signin', { error_message: request.flash('info'), email: email, password: password, account: account });
                    return [3 /*break*/, 16];
                case 14: return [4 /*yield*/, doc.matchPassword(password)];
                case 15:
                    match = _b.sent();
                    if (match) {
                        request.flash('info', 'welcome ' + email + '.');
                        response.render('principal', { success_message: request.flash('info'), email: email, password: password, account: account });
                    }
                    else {
                        request.flash('info', 'passwords do not match.');
                        response.render('signin', { error_message: request.flash('info'), email: email, password: password, account: account });
                    }
                    _b.label = 16;
                case 16: return [2 /*return*/];
            }
        });
    }); });
    app.get('/logout', function (request, response) {
        request.logout();
        request.flash('info', 'bye.');
        response.render('index', { success_message: request.flash('info') });
    });
    /*
        app.get('/show', (request, response) => {
            connectDB();
            user_model.find((error, document) => {
                if (error){
                    console.log(error);
                }
                console.log(document);
                response.render('show', {users : document});
            });
        });
        app.get('/update', (request, response) => {
            connectDB();
            client_model.find((error, document) => {
                if (error){
                    console.log(error);
                }
                response.render('update', {users : document});
            });
        });
        app.get('/update/edit/:id', (request, response) => {
            connectDB();
            let user_id = request.params.id;
            client_model.findOne({_id : user_id}, (error, document) => {
                if (error){
                    console.log(error);
                }
                console.log(document);
                response.render('edit', {user : document});
            });
        });
        app.put('/update/edit/:id', (request, response) => {
            let user_id : string = request.params.id;
            let firstname : string = request.body.firstname;
            let lastname : string = request.body.lastname;
            let gender : string = request.body.gender;
            let birthdate : string = request.body.birthdate;
            let phonenumber : number = request.body.phonenumber;
            let email : string = request.body.email;
            let image : string = request.body.image;
            let password : string = request.body.password;
            let account : string = request.body.account;
            let address : string = request.body.address;
            let latitude : number = request.body.latitude;
            let longitude : number = request.body.longitude;
            let user : Client = new Client(firstname, lastname, gender, birthdate, phonenumber, email, password, image, address, latitude, longitude);
            user.updateAccount(user_id);
            response.redirect('/');
        });
        app.get('/delete', (request, response) => {
            connectDB();
            client_model.find((error, document) => {
                if (error){
                    console.log(error);
                }
                response.render('delete', {users : document});
            });
        });
        /*app.get('/delete/drop/:_id', (request, response) => {
            connectDB();
            let user_id = request.params._id;
            let user : Client = new Client("", "", "", "", "", "", "", "", 0, "", "", 0, 0);
            response.render('drop', {user : user.selectAccount(user_id)});
        });*/
    /*
    app.delete('/delete/drop/:_id', (request, response) => {
        let user_id = request.params._id;
        let user : Client = new Client("", "", "", "", 0, "", "", "", "", 0, 0);
        user.deleteAccount(user_id);
        response.redirect('/');
    });*/
    module.exports = app;
};
main();
