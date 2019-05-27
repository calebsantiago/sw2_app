import express from 'express';
import bodyParser from 'body-parser';
import method_override from 'method-override';
import session from 'express-session';
import passport from 'passport';
import flash from 'connect-flash';
import {connectDB} from './connection';
import {Client} from './class/client';
import {client_model} from './schema/client';
import {Provider} from './class/provider';
import {provider_model} from './schema/provider';
import {quotation_model} from './schema/quotation';
import mongoose, {DocumentQuery} from 'mongoose';
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
        resave: false,
        saveUninitialized: false
    }));
    app.use(passport.initialize());
    app.use(passport.session());
    app.use(flash());
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
    app.get('/', (request, response) => {
        response.render('index');
    });
    app.get('/signup', (request, response) => {
        response.render('signup');
    });
    app.post('/signup', async (request, response) => {
        let {firstname, lastname, gender, birthdate, idcard, phonenumber, email, password, confirm_password, image, account, address, latitude, longitude, video, description, certificate, service} = request.body;    
        if (account === 'client') {
            let user : Client = new Client(firstname, lastname, gender, birthdate, Number(phonenumber), email, password, confirm_password, image, account, address, Number(latitude), Number(longitude));   
            let errors : any[] = user.validateSignUp();
            if (errors.length > 0) {
                response.render('signup', {errors, firstname, lastname, gender, birthdate, phonenumber, email, password, confirm_password, image, account});
            }
            else {
                connectDB();
                let doc1 = await client_model.findOne({'phonenumber' : user.getPhonenumber()}, (error) => {
                    if (error){
                        console.log(error);
                    }
                });
                let doc2 = await client_model.findOne({'account.email' : user.getEmail()}, (error) => {
                    if (error){
                        console.log(error);
                    }
                });
                let doc3 = await provider_model.findOne({'phonenumber' : user.getPhonenumber()}, (error) => {
                    if (error){
                        console.log(error);
                    }
                });
                let doc4 = await provider_model.findOne({'account.email' : user.getEmail()}, (error) => {
                    if (error){
                        console.log(error);
                    }
                });
                let docs : DocumentQuery<any, any, {}>[] = [doc1, doc2, doc3, doc4];
                if (docs[0] || docs[2]) {
                    request.flash('info', 'número de teléfono ya existe.');
                    response.render('signup', {error_message: request.flash('info'), firstname, lastname, gender, birthdate, phonenumber, email, password, confirm_password, image, account});
                }
                else if (docs[1] || docs[3]) {
                    request.flash('info', 'correo electrónico ya existe.');
                    response.render('signup', {error_message: request.flash('info'), firstname, lastname, gender, birthdate, phonenumber, email, password, confirm_password, image, account});
                }
                else {
                    connectDB();
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
                        address :  user.getAddress(),
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
                    request.flash('info', 'estas registrado.');
                    response.render('login', {success_message: request.flash('info')});
                    user.sendMail();
                }
            }
        }
        else {
            let user : Provider = new Provider(firstname, lastname, gender, birthdate, Number(phonenumber), email, password, confirm_password, image, account, address, Number(latitude), Number(longitude), Number(idcard), video, description, certificate, service);
            let errors : DocumentQuery<any, any, {}>[] = user.validateSignUp();
            if (errors.length > 0) {
                response.render('signup', {errors, firstname, lastname, gender, birthdate, idcard, phonenumber, email, password, confirm_password, image, account, video, description, certificate, service});
            }
            else {
                connectDB();
                let doc1 = await client_model.findOne({'phonenumber' : user.getPhonenumber()}, (error) => {
                    if (error){
                        console.log(error);
                    }
                });
                let doc2 = await client_model.findOne({'account.email' : user.getEmail()}, (error) => {
                    if (error){
                        console.log(error);
                    }
                });
                let doc3 = await provider_model.findOne({'phonenumber' : user.getPhonenumber()}, (error) => {
                    if (error){
                        console.log(error);
                    }
                });
                let doc4 = await provider_model.findOne({'account.email' : user.getEmail()}, (error) => {
                    if (error){
                        console.log(error);
                    }
                });
                let docs : DocumentQuery<any, any, {}>[] = [doc1, doc2, doc3, doc4];
                if (docs[0] || docs[2]) {
                    request.flash('info', 'número de teléfono ya existe.');
                    response.render('signup', {error_message: request.flash('info'), firstname, lastname, gender, birthdate, idcard, phonenumber, email, password, confirm_password, image, account, video, description, certificate, service});
                }
                else if (docs[1] || docs[3]) {
                    request.flash('info', 'correo electrónico ya existe.');
                    response.render('signup', {error_message: request.flash('info'), firstname, lastname, gender, birthdate, idcard, phonenumber, email, password, confirm_password, image, account, video, description, certificate, service});
                }
                else {
                    connectDB();
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
                        address :  user.getAddress(),
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
                    request.flash('info', 'estas registrado.');
                    response.render('login', {success_message: request.flash('info')});
                    user.sendMail();
                }
            }
        }
    });
    app.get('/login', (request, response) => {
        response.render('login');
    });
    app.post('/login', async (request, response) => {
        let {email, password} = request.body;
        let user : Client = new Client("", "", "", "", 0, "", "", "", "", "", "", 0, 0);
        let account : string = ""     
        let errors : any[] = user.validateLogIn(email,password);
        if (errors.length > 0) {
            response.render('login', {errors, email, password});
        }
        else {
            connectDB();
            let email_expression : RegExp = /[^@\s]+@[^@\s]+\.[^@\s]+/;
            let doc;
            if (email_expression.test(email)) {
                doc = await client_model.findOne({'account.email' : email}, (error) => {
                    if(error) {
                        console.log(error);
                    }
                    account = "client";
                });
                if (!doc) {
                    doc = await provider_model.findOne({'account.email' : email}, (error) => {
                        if(error) {
                            console.log(error);
                        }
                        account = "provider";
                    });
                }
            }
            else {
                doc = await client_model.findOne({phonenumber : email}, (error) => {
                    if(error) {
                        console.log(error);
                    }
                    account = "client";
                });
                if (!doc) {
                    doc = await provider_model.findOne({phonenumber : email}, (error) => {
                        if(error) {
                            console.log(error);
                        }
                        account = "provider";
                    });
                }
            }
            if (!doc) {
                request.flash('info', 'correo electrónico o número de teléfono no existe.');
                response.render('login', {error_message: request.flash('info'), email, password});
            } 
            else {
                let match = await doc.matchPassword(password);
                if (match) {
                    if(request.session != undefined) {
                        request.session.user_id = doc._id;
                        request.session.account = account;
                        request.flash('info', 'bienvenido ' + email + '.');
                        response.render('main', {success_message: request.flash('info'), account: request.session.account});
                    }
                } 
                else {
                    request.flash('info', 'contraseña incorrecta.');
                    response.render('login', {error_message: request.flash('info'), email, password});
                }
            }
        }
    });
    app.get('/logout', (request, response) => {
        request.logout();
        request.flash('info', 'hasta luego.');
        response.render('index', {success_message: request.flash('info')});
        if(request.session != undefined) {
            request.session.destroy((error) => {
                if(error) {
                    console.log(error);
                }
            });
        }
    });
    app.get('/main', (request, response) => {
        if(request.session != undefined) {
            response.render('main', {account: request.session.account});
        }
    });
    app.get('/searchservice', (request, response) => {
        if(request.session != undefined) {
            let id = mongoose.Types.ObjectId(request.session.user_id);
            connectDB();
            client_model.findOne({_id : id}, (error, document) => {
                if(error) {
                    console.log(error);
                }
                response.render('searchservice', {user : document});
            });
        }
    });
    app.post('/searchservice', (request, response) => {
        let {service} = request.body;
            connectDB();
            provider_model.find({'service.title' : service}, async (error, document) => {
                if(error) {
                    console.log(error);
                }
                if(request.session != undefined) {
                    let id = mongoose.Types.ObjectId(request.session.user_id);
                    connectDB();
                    let doc = await client_model.findOne({_id : id}, (error) => {
                        if(error) {
                            console.log(error);
                        }
                    });
                    if(!document.length) {
                        request.flash('info', 'servicio no existe.');
                        response.render('searchservice', {error_message: request.flash('info'), user : doc, service});
                    }
                    else {
                        response.render('searchservice', {user : doc, users : document, service});
                    }
                }
            });
    });
    app.get('/searchservice/requestquotation/:id', (request, response) => {
        let id = mongoose.Types.ObjectId(request.params.id);
        connectDB();
        provider_model.findOne({_id : id}, (error, document) => {
            if(error) {
                console.log(error);
            }
            response.render('requestquotation', {user : document});
        });
    });
    app.post('/searchservice/requestquotation/:id', (request, response) => {
        let {provider, service, date, description, image} = request.body;
        if (request.session != undefined) {
            connectDB();
            let model = new quotation_model({
                _id: new mongoose.Types.ObjectId(),
                _id_client : request.session.user_id,
                _id_provider : provider,
                service : service,
                date : date,
                description : description,
                cost : 0,
                status : "pendiente",
                image : image
            });
            model.save((error : any) => {
                if (error) {
                    console.log(error);
                }
            });
            response.redirect('/searchservice');
        }
    });
    app.get('/checkquotations', (request, response) => {
        if(request.session != undefined) {
            let id = mongoose.Types.ObjectId(request.session.user_id);
            connectDB();
            quotation_model.aggregate([{
                $lookup : {
                   from : "providers",
                   localField : "_id_provider",
                   foreignField : "_id",
                   as : "fromProviders"
                }
                },
                { 
                    $match : { _id_client : id } 
                },
                {
                    $replaceRoot : { newRoot : { $mergeObjects : [ { $arrayElemAt : [ "$fromProviders", 0 ] }, "$$ROOT" ] } }
                },
                { 
                    $project : { account : 0, gender : 0, birthdate : 0, idcard : 0, phonenumber : 0, address : 0, coordinate : 0, video : 0, certificate : 0, __v : 0, fromProviders : 0 } 
                }], (error : any, document : any) => {
                if(error) {
                    console.log(error);
                }
                if(!document.length) {
                    request.flash('info', 'no tienes cotizaciones.');
                    response.render('checkquotations', {error_message: request.flash('info')});
                }
                else {
                    console.log(document);
                    response.render('checkquotations', {quotations: document});
                }
            });
        }
    });
    app.get('/checkhistory', (request, response) => {
        response.render('checkhistory');
    });
    app.get('/updateaccount', (request, response) => {
        response.render('updateaccount');
    });
    app.get('/deleteaccount', (request, response) => {
        response.render('deleteaccount');
    });
    module.exports = app;
};
main();