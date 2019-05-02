"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var body_parser_1 = __importDefault(require("body-parser"));
var method_override_1 = __importDefault(require("method-override"));
var connection_1 = require("./connection");
var user_1 = require("./schema/user");
var client_1 = require("./schema/client");
var client_2 = require("./class/client");
var provider_1 = require("./class/provider");
var main = function () {
    var app = express_1.default();
    app.set('view engine', 'pug');
    app.set('views', './views');
    app.use(express_1.default.static('./public'));
    app.use(body_parser_1.default.json());
    app.use(body_parser_1.default.urlencoded({ extended: true }));
    app.use(method_override_1.default('_method'));
    app.get('/', function (request, response) {
        response.render('index');
    });
    app.get('/create', function (request, response) {
        response.render('create');
    });
    app.post('/create', function (request, response) {
        var username = request.body.username;
        var password = request.body.password;
        var image = request.body.image;
        var account = request.body.account;
        var firstname = request.body.firstname;
        var lastname = request.body.lastname;
        var gender = request.body.gender;
        var idcard = request.body.idcard;
        var birthdate = request.body.birthdate;
        var phonenumber = request.body.phonenumber;
        var email = request.body.email;
        var address = request.body.address;
        var latitude = request.body.latitude;
        var longitude = request.body.longitude;
        var video = request.body.video;
        var description = request.body.description;
        var certificate = request.body.certificate;
        var service = request.body.service;
        if (account === 'client') {
            var user = new client_2.Client(username, password, image, account, firstname, lastname, gender, birthdate, phonenumber, email, address, latitude, longitude);
            /*let state : boolean = user.validateUsername();
            if (state == true) {
                console.log('username already exists');
            }
            else {*/
            user.createAccount();
            user.sendMail();
            //}
        }
        else {
            var user = new provider_1.Provider(username, password, image, account, firstname, lastname, gender, birthdate, phonenumber, email, address, latitude, longitude, idcard, video, description, certificate, service);
            user.createAccount();
            user.sendMail();
        }
        response.redirect('/');
    });
    app.get('/signin', function (request, response) {
        response.render('signin');
    });
    app.post('/signin', function (request, response) {
        var username = request.body.username;
        var password = request.body.password;
        var user = new client_2.Client(username, password, "", "", "", "", "", "", 0, "", "", 0, 0);
        user.validateAccount(username, password);
        response.redirect('/');
    });
    app.get('/show', function (request, response) {
        connection_1.connectDB();
        user_1.user_model.find(function (error, document) {
            if (error) {
                console.log(error);
            }
            console.log(document);
            response.render('show', { users: document });
        });
    });
    app.get('/update', function (request, response) {
        connection_1.connectDB();
        client_1.client_model.find(function (error, document) {
            if (error) {
                console.log(error);
            }
            response.render('update', { users: document });
        });
    });
    app.get('/update/edit/:id', function (request, response) {
        connection_1.connectDB();
        var user_id = request.params.id;
        client_1.client_model.findOne({ _id: user_id }, function (error, document) {
            if (error) {
                console.log(error);
            }
            console.log(document);
            response.render('edit', { user: document });
        });
    });
    app.put('/update/edit/:id', function (request, response) {
        var user_id = request.params.id;
        var username = request.body.username;
        var image = request.body.image;
        var password = request.body.password;
        var account = request.body.account;
        var firstname = request.body.firstname;
        var lastname = request.body.lastname;
        var gender = request.body.gender;
        var birthdate = request.body.birthdate;
        var phonenumber = request.body.phonenumber;
        var email = request.body.email;
        var address = request.body.address;
        var latitude = request.body.latitude;
        var longitude = request.body.longitude;
        var user = new client_2.Client(username, password, image, account, firstname, lastname, gender, birthdate, phonenumber, email, address, latitude, longitude);
        user.updateAccount(user_id);
        response.redirect('/');
    });
    app.get('/delete', function (request, response) {
        connection_1.connectDB();
        client_1.client_model.find(function (error, document) {
            if (error) {
                console.log(error);
            }
            response.render('delete', { users: document });
        });
    });
    /*app.get('/delete/drop/:_id', (request, response) => {
        connectDB();
        let user_id = request.params._id;
        let user : Client = new Client("", "", "", "", "", "", "", "", 0, "", "", 0, 0);
        response.render('drop', {user : user.selectAccount(user_id)});
    });*/
    app.delete('/delete/drop/:_id', function (request, response) {
        var user_id = request.params._id;
        var user = new client_2.Client("", "", "", "", "", "", "", "", 0, "", "", 0, 0);
        user.deleteAccount(user_id);
        response.redirect('/');
    });
    module.exports = app;
};
main();
