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
var user_2 = require("./class/user");
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
        connection_1.connectDB();
        var name = request.body.name;
        var password = request.body.password;
        var email = request.body.email;
        var user = new user_2.User(name, password, email);
        var model = new user_1.user_model(user);
        console.log(model);
        model.save(function (error) {
            if (error) {
                console.log(error);
            }
            response.redirect('/');
        });
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
        user_1.user_model.find(function (error, document) {
            if (error) {
                console.log(error);
            }
            response.render('update', { users: document });
        });
    });
    app.get('/update/edit/:id', function (request, response) {
        connection_1.connectDB();
        var user_id = request.params.id;
        user_1.user_model.findOne({ _id: user_id }, function (error, document) {
            if (error) {
                console.log(error);
            }
            console.log(document);
            response.render('edit', { user: document });
        });
    });
    app.put('/update/edit/:id', function (request, response) {
        connection_1.connectDB();
        var user_id = request.params.id;
        var name = request.body.name;
        var password = request.body.password;
        var email = request.body.email;
        var user = new user_2.User(name, password, email);
        user_1.user_model.updateOne({ _id: user_id }, user, function (error) {
            if (error) {
                console.log(error);
            }
            response.redirect('/');
        });
    });
    app.get('/delete', function (request, response) {
        connection_1.connectDB();
        user_1.user_model.find(function (error, document) {
            if (error) {
                console.log(error);
            }
            response.render('delete', { users: document });
        });
    });
    app.get('/delete/drop/:id', function (request, response) {
        connection_1.connectDB();
        var user_id = request.params.id;
        user_1.user_model.findOne({ _id: user_id }, function (error, document) {
            if (error) {
                console.log(error);
            }
            console.log(document);
            response.render('drop', { user: document });
        });
    });
    app.delete('/delete/drop/:id', function (request, response) {
        connection_1.connectDB();
        var user_id = request.params.id;
        user_1.user_model.deleteOne({ _id: user_id }, function (error) {
            if (error) {
                console.log(error);
            }
            response.redirect('/');
        });
    });
    module.exports = app;
};
main();
