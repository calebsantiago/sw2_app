import express from 'express';
import bodyParser from 'body-parser';
import method_override from 'method-override';
import {connectDB} from './connection';
import {user_model} from './schema/user';
import {client_model} from './schema/client';
import {Client} from './class/client';
import {Provider} from './class/provider';

let main = () => {
    let app : express.Application = express();
    app.set('view engine', 'pug');
    app.set('views', './views');
    app.use(express.static('./public'));
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({extended : true}));
    app.use(method_override('_method'));
    app.get('/', (request, response) => {
        response.render('index');
    });
    app.get('/create', (request, response) => {
        response.render('create');
    });
    app.post('/create', (request, response) => {
        let username : string = request.body.username;
        let password : string = request.body.password;
        let image : string = request.body.image;
        let account : string = request.body.account;
        let firstname : string = request.body.firstname;
        let lastname : string = request.body.lastname;
        let gender : string = request.body.gender;
        let idcard : number = request.body.idcard;
        let birthdate : string = request.body.birthdate;
        let phonenumber : number = request.body.phonenumber;
        let email : string = request.body.email;
        let address : string = request.body.address;
        let latitude : number = request.body.latitude;
        let longitude : number = request.body.longitude;
        let video : string = request.body.video;
        let description : string = request.body.description;
        let certificate : string = request.body.certificate;
        let service : string = request.body.service;
        if (account === 'client') {
            let user : Client = new Client(username, password, image, account, firstname, lastname, gender, birthdate, phonenumber, email, address, latitude, longitude);
            user.createAccount();
            user.sendMail();
        }
        else {
            let user : Provider = new Provider(username, password, image, account, firstname, lastname, gender, birthdate, phonenumber, email, address, latitude, longitude, idcard, video, description, certificate, service);
            user.createAccount();
            user.sendMail();
        }
        response.redirect('/');
    });
    app.get('/show', (request, response) => {
        connectDB();
        user_model.find((error, document) => {
            if(error){
                console.log(error);
            }
            console.log(document);
            response.render('show', {users : document});
        });
    });
    app.get('/update', (request, response) => {
        connectDB();
        client_model.find((error, document) => {
            if(error){
                console.log(error);
            }
            response.render('update', {users : document});
        });
    });
    app.get('/update/edit/:id', (request, response) => {
        connectDB();
        let user_id = request.params.id;
        client_model.findOne({_id : user_id}, (error, document) => {
            if(error){
                console.log(error);
            }
            console.log(document);
            response.render('edit', {user : document});
        });
    });
    app.put('/update/edit/:id', (request, response) => {
        let user_id : string = request.params.id;
        let username : string = request.body.username;
        let image : string = request.body.image;
        let password : string = request.body.password;
        let account : string = request.body.account;
        let firstname : string = request.body.firstname;
        let lastname : string = request.body.lastname;
        let gender : string = request.body.gender;
        let birthdate : string = request.body.birthdate;
        let phonenumber : number = request.body.phonenumber;
        let email : string = request.body.email;
        let address : string = request.body.address;
        let latitude : number = request.body.latitude;
        let longitude : number = request.body.longitude;
        let user : Client = new Client(username, password, image, account, firstname, lastname, gender, birthdate, phonenumber, email, address, latitude, longitude);
        user.updateAccount(user_id);
        response.redirect('/');
    });
    app.get('/delete', (request, response) => {
        connectDB();
        client_model.find((error, document) => {
            if(error){
                console.log(error);
            }
            response.render('delete', {users : document});
        });
    });
    app.get('/delete/drop/:id', (request, response) => {
        connectDB();
        let user_id = request.params.id;
        client_model.findOne({_id : user_id}, (error, document) => {
            if(error){
                console.log(error);
            }
            console.log(document);
            response.render('drop', {user : document});
        });
    });
    app.delete('/delete/drop/:id', (request, response) => {
        let user_id = request.params.id;
        let user : Client = new Client("", "", "", "", "", "", "", "", 0, "", "", 0, 0);
        user.deleteAccount(user_id);
        response.redirect('/');
    });
    module.exports = app;
};
main();