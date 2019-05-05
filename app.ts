import express from 'express';
import bodyParser from 'body-parser';
import method_override from 'method-override';
import {connectDB} from './connection';
import {user_model} from './schema/user';
import {client_model} from './schema/client';
import {provider_model} from './schema/provider';
import {Client} from './class/client';
import {Provider} from './class/provider';
import mongoose from 'mongoose';
import session from 'express-session';
import passport from 'passport';
import flash from 'connect-flash';
let main = () => {
    let app : express.Application = express();
    app.set('view engine', 'pug');
    app.set('views', './views');
    app.use(express.urlencoded({extended: false}));
    app.use(express.static('./public'));
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({extended : true}));
    app.use(method_override('_method'));
    app.use(session({
        secret: 'secret',
        resave: true,
        saveUninitialized: true
    }));
    app.use(passport.initialize());
    app.use(passport.session());
    app.use(flash());

    app.get('/', (request, response) => {
        response.render('index');
    });
    app.get('/create', (request, response) => {
        response.render('create');
    });
    app.post('/create', async (request, response) => {
        let {firstname, lastname, gender, birthdate, idcard, phonenumber, email, password, confirm_password, image, account, address, latitude, longitude, video, description, certificate, service} = request.body;    
        let date_expression : RegExp = /[0-9]{4}-[0-9]{2}-[0-9]{2}/;
        let phone_expression : RegExp = /[0-9]{9}/;
        let email_expression : RegExp = /[^@\s]+@[^@\s]+\.[^@\s]+/;
        let url_expression : RegExp = /^(?:http(s)?:\/\/)?[\w.-]+(?:\.[\w\.-]+)+[\w\-\._~:/?#[\]@!\$&'\(\)\*\+,;=.]+/;
        let id_expression : RegExp = /[0-9]{8}/;
        let errors : any[] = [];
        function getAge(birthdate : string) : number {
            let today : Date =  new Date();
            let age : number = today.getFullYear() - new Date(birthdate).getFullYear();
            let month : number = today.getMonth() - new Date(birthdate).getMonth();
            if (month < 0 || (month === 0 && today.getDate() < new Date(birthdate).getDate())) {
                age--;
            }
            return age;
        }
        if (firstname === "" || lastname === "" || gender === "" || birthdate === "" || phonenumber === "" || email === "" || password === "" || confirm_password === "" || account === "" || address === "" || latitude === "" || longitude === "") {
            errors.push({text : 'you must complete fields.'});
        }
        else {
            if (!date_expression.test(birthdate)) {
                errors.push({text : 'birthdate is not valid.'});
            }
            if (getAge(birthdate) < 18) {
                errors.push({text : 'you are under 18 years.'});
            }
            if (!phone_expression.test(phonenumber)) {
                errors.push({text : 'phonenumber is not valid.'});
            }
            if (!email_expression.test(email)) {
                errors.push({text : 'email is not valid.'});
            }
            if (password != confirm_password) {
                errors.push({text : 'passwords do not match.'});
            }
            if (!isFinite(Number(latitude))) {
                errors.push({text : 'latitude is not valid.'});
            }
            if (!isFinite(Number(longitude))) {
                errors.push({text : 'longitude is not valid.'});
            }
            if (image != "") {
                if (!url_expression.test(image)) {
                    errors.push({text : 'image is not valid.'});
                }
            }
            if (account === "provider") {
                if (idcard === "" || video === "" || description === "" || service === "") {
                    errors.push({text : 'you must complete fields.'});
                }
                else {
                    if (!id_expression.test(idcard)) {
                        errors.push({text : 'idcard is not valid.'});
                    }
                    if (!url_expression.test(video)) {
                        errors.push({text : 'video is not valid.'});
                    }
                    if (certificate != "") {
                        if (!url_expression.test(certificate)) {
                            errors.push({text : 'certificate is not valid.'});
                        }
                    }
                }
            }
        }
        if (errors.length > 0) {
            response.render('create', {errors, firstname, lastname, gender, birthdate, idcard, phonenumber, email, password, confirm_password, image, account, video, description, certificate, service});
        }
        else {
            if (account === 'client') {
                let user : Client = new Client(firstname, lastname, gender, birthdate, Number(phonenumber), email, password, image, address, Number(latitude), Number(longitude));
                connectDB();
                let doc1 = await client_model.findOne({'phonenumber' : user.getPhonenumber()}, (error, document) => {
                    if (error){
                        console.log(error);
                    }
                });
                let doc2 = await client_model.findOne({'account.email' : user.getEmail()}, (error, document) => {
                    if (error){
                        console.log(error);
                    }
                });
                let doc3 = await provider_model.findOne({'phonenumber' : user.getPhonenumber()}, (error, document) => {
                    if (error){
                        console.log(error);
                    }
                });
                let doc4 = await provider_model.findOne({'account.email' : user.getEmail()}, (error, document) => {
                    if (error){
                        console.log(error);
                    }
                });
                if (doc1 || doc3) {
                    request.flash('info', 'phonenumber is already in use.');
                    response.render('create', {error_message: request.flash('info'), firstname, lastname, gender, birthdate, phonenumber, email, password, confirm_password, image, account});
                }
                else if (doc2 || doc4) {
                    request.flash('info', 'email is already in use.');
                    response.render('create', {error_message: request.flash('info'), firstname, lastname, gender, birthdate, phonenumber, email, password, confirm_password, image, account});
                }
                else {
                    let model = new client_model({
                        _id: new mongoose.Types.ObjectId(),
                        account : {
                            email : user.getEmail(),
                            password : user.getPassword(),
                            image : user.getImage()
                        },
                        name : {
                            firstname : user.getFirstname(),
                            lastname : user.getLastname()
                        },
                        gender : user.getGender(),
                        birthdate : user.getBirthdate(),
                        phonenumber : user.getPhonenumber(),
                        address :  user.getAddres(),
                        coordinate : {
                            latitude : user.getCoordinate()[0],
                            longitude : user.getCoordinate()[1]
                        }
                    });
                    console.log(model);
                    model.account.password = await model.encryptPassword(password);
                    await model.save((error : any) => {
                        if (error) {
                            console.log(error);
                        }
                    });
                    request.flash('info', 'you are registered.');
                    response.render('signin', {success_message: request.flash('info')});
                    user.sendMail();
                }
            }
            else {
                let user : Provider = new Provider(firstname, lastname, gender, birthdate, phonenumber, email, password, image, address, latitude, longitude, idcard, video, description, certificate, service);
                connectDB();
                let doc1 = await client_model.findOne({'phonenumber' : user.getPhonenumber()}, (error, document) => {
                    if (error){
                        console.log(error);
                    }
                });
                let doc2 = await client_model.findOne({'account.email' : user.getEmail()}, (error, document) => {
                    if (error){
                        console.log(error);
                    }
                });
                let doc3 = await provider_model.findOne({'phonenumber' : user.getPhonenumber()}, (error, document) => {
                    if (error){
                        console.log(error);
                    }
                });
                let doc4 = await provider_model.findOne({'account.email' : user.getEmail()}, (error, document) => {
                    if (error){
                        console.log(error);
                    }
                });
                if (doc1 || doc3) {
                    request.flash('info', 'phonenumber is already in use.');
                    response.render('create', {error_message: request.flash('info'), firstname, lastname, gender, birthdate, idcard, phonenumber, email, password, confirm_password, image, account, video, description, certificate, service});
                }
                else if (doc2 || doc4) {
                    request.flash('info', 'email is already in use.');
                    response.render('create', {error_message: request.flash('info'), firstname, lastname, gender, birthdate, idcard, phonenumber, email, password, confirm_password, image, account, video, description, certificate, service});
                }
                else {
                    let model = new provider_model({
                        _id: new mongoose.Types.ObjectId(),
                        account : {
                            email : user.getEmail(),
                            password : user.getPassword(),
                            image : user.getImage()
                        },
                        name : {
                            firstname : user.getFirstname(),
                            lastname : user.getLastname()
                        },
                        gender : user.getGender(),
                        birthdate : user.getBirthdate(),
                        idcard : user.getIdcard(),
                        phonenumber : user.getPhonenumber(),
                        address :  user.getAddres(),
                        coordinate : {
                            latitude : user.getCoordinate()[0],
                            longitude : user.getCoordinate()[1]
                        },
                        video : user.getVideo(),
                        description : user.getDescription(),
                        certificate : user.getCertificate(),
                        service : {
                            title : user.getService()[0]
                        }
                    });
                    console.log(model);
                    model.account.password = await model.encryptPassword(password);
                    await model.save((error : any) => {
                        if (error) {
                            console.log(error);
                        }
                    });
                    request.flash('info', 'you are registered.');
                    response.render('signin', {success_message: request.flash('info')});
                    user.sendMail();
                }
            }
        }
    });
    app.get('/signin', (request, response) => {
        response.render('signin');
    });
    app.post('/signin', async (request, response) => {
        let {email, password, account} = request.body;
        let email_expression : RegExp = /[^@\s]+@[^@\s]+\.[^@\s]+/;
        let phone_expression : RegExp = /[0-9]{9}/;
        let errors : any[] = [];
        if (email === "" || password === "" || account === "") {
            errors.push({text : 'you must complete fields.'});
        }
        else {
            if (!email_expression.test(email) && !phone_expression.test(email)) {
                errors.push({text : 'email or phonenumber is not valid.'});
            }
        }
        if (errors.length > 0) {
            response.render('signin', {errors, email, password, account});
        }
        else {
            if (account === 'client') {
                connectDB();
                let doc;
                if (email_expression.test(email)) {
                    doc = await client_model.findOne({'account.email' : email}, (error) => {
                        if(error) {
                            console.log(error);
                        }
                    });
                }
                else {
                    doc = await client_model.findOne({phonenumber : email}, (error) => {
                        if(error) {
                            console.log(error);
                        }
                    });
                }
                if (!doc) {
                    request.flash('info', 'email or phonenumber does not exist.');
                    response.render('signin', {error_message: request.flash('info'), email, password, account});
                } 
                else {
                    let match = await doc.matchPassword(password);
                    if (match) {
                        request.flash('info', 'welcome ' + email+'.');
                        response.render('principal', {success_message: request.flash('info'), email, password, account});
                    } 
                    else {
                        request.flash('info', 'passwords do not match.');
                        response.render('signin', {error_message: request.flash('info'), email, password, account});
                    }
                }
            }
            else {
                connectDB();
                let doc;
                if (email_expression.test(email)) {
                    doc = await provider_model.findOne({'account.email' : email}, (error) => {
                        if(error) {
                            console.log(error);
                        }
                    });
                }
                else {
                    doc = await provider_model.findOne({phonenumber : email}, (error) => {
                        if(error) {
                            console.log(error);
                        }
                    });
                }
                if (!doc) {
                    request.flash('info', 'email or phonenumber does not exist.');
                    response.render('signin', {error_message: request.flash('info'), email, password, account});
                } 
                else {
                    let match = await doc.matchPassword(password);
                    if (match) {
                        request.flash('info', 'welcome ' + email+'.');
                        response.render('principal', {success_message: request.flash('info'), email, password, account});
                    } 
                    else {
                        request.flash('info', 'passwords do not match.');
                        response.render('signin', {error_message: request.flash('info'), email, password, account});
                    }
                }
            }
        }  
    });
    app.get('/logout', (request, response) => {
        request.logout();
        request.flash('info', 'bye.');
        response.render('index', {success_message: request.flash('info')});
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