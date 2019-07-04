import express from 'express';
import bodyParser from 'body-parser';
import method_override from 'method-override';
import session from 'express-session';
import passport from 'passport';
import flash from 'connect-flash';
//import {connectDB} from './connection';
import connect from './connection'
import {Client} from './class/client';
import {client_model} from './schema/client';
import {Provider} from './class/provider';
import {provider_model} from './schema/provider';
import {quotation_model} from './schema/quotation';
import mongoose, {DocumentQuery} from 'mongoose';
function jsonlength(object : any) : number {
    if (object) {
        return Object.keys(object).length
    }
    else {
        return 0
    }
}
const db : string = 'mongodb+srv://caleb:Misael15@cluster0-aqv0w.mongodb.net/test?retryWrites=true'
connect({db})
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
            /*let errors : any[] = user.validateSignUp();
            if (errors.length > 0) {
                response.render('signup', {errors, firstname, lastname, gender, birthdate, phonenumber, email, password, confirm_password, image, account});
            }
            else {*/
                //connectDB();
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
                    //connectDB();
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
                    //model.account.password = await model.encryptPassword(password);
                    await model.save((error : any) => {
                        if (error) {
                            console.log(error);
                        }
                    });
                    request.flash('info', 'estas registrado.');
                    response.render('login', {success_message: request.flash('info')});
                    user.sendMail();
                }
            //}
        }
        else {
            let user : Provider = new Provider(firstname, lastname, gender, birthdate, Number(phonenumber), email, password, confirm_password, image, account, address, Number(latitude), Number(longitude), Number(idcard), video, description, certificate, service);
            /*let errors : DocumentQuery<any, any, {}>[] = user.validateSignUp();
            if (errors.length > 0) {
                response.render('signup', {errors, firstname, lastname, gender, birthdate, idcard, phonenumber, email, password, confirm_password, image, account, video, description, certificate, service});
            }
            else {*/
                //connectDB();
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
                    //connectDB();
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
                    //model.account.password = await model.encryptPassword(password);
                    await model.save((error : any) => {
                        if (error) {
                            console.log(error);
                        }
                    });
                    request.flash('info', 'estas registrado.');
                    response.render('login', {success_message: request.flash('info')});
                    user.sendMail();
                }
            //}
        }
    });
    app.get('/login', (request, response) => {
        response.render('login');
    });
    app.post('/login', async (request, response) => {
        let {email, password} = request.body;
        let account : string = ""     
        //connectDB();
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
                    //request.flash('info', email + '.');
                    response.render('main', {/*success_message: request.flash('info'),*/ user : doc, account: request.session.account}); 
                }
            } 
            else {
                request.flash('info', 'contraseña incorrecta.');
                response.render('login', {error_message: request.flash('info'), email, password});
            }
        }
    });
    app.get('/logout', (request, response) => {
        request.logout();
        if(request.session != undefined) {
            request.session.destroy((error) => {
                if(error) {
                    console.log(error);
                }
            });
        }
        response.redirect('/');
    });
    app.get('/main', (request, response) => {
        if(request.session != undefined) {
            let id = mongoose.Types.ObjectId(request.session.user_id);
            let account = request.session.account;
            //connectDB();
            if(account == 'client') {
                client_model.findOne({_id : id}, (error, document) => {
                    if(error) {
                        console.log(error);
                    }
                    response.render('main', {user : document, account : account});
                });
            }
            else {
                provider_model.findOne({_id : id}, (error, document) => {
                    if(error) {
                        console.log(error);
                    }
                    response.render('main', {user : document, account : account});
                });
            }
        }
    });
    app.get('/searchservice', (request, response) => {
        //connectDB();
        provider_model.find(async (error, document) => {
            if(error) {
                console.log(error);
            }
            if(request.session != undefined) {
                let id = mongoose.Types.ObjectId(request.session.user_id);
                //connectDB();
                let doc = await client_model.findOne({_id : id}, (error) => {
                    if(error) {
                        console.log(error);
                    }
                });
                response.render('searchservice', {user : doc, providers : document});
            }
        });
    });
    app.post('/searchservice', (request, response) => {
        let {services} = request.body;
            //connectDB();
            provider_model.find({'service.title' : services}, async (error, document) => {
                if(error) {
                    console.log(error);
                }
                if(request.session != undefined) {
                    let id = mongoose.Types.ObjectId(request.session.user_id);
                    //connectDB();
                    let doc = await client_model.findOne({_id : id}, (error) => {
                        if(error) {
                            console.log(error);
                        }
                    });
                    //connectDB();
                    let pro = await provider_model.find(async (error) => {
                        if(error) {
                            console.log(error);
                        }
                    });
                    if(!document.length) {
                        request.flash('info', 'servicio no existe.');
                        response.render('searchservice', {error_message: request.flash('info'), user : doc, providers : pro, services});
                    }
                    else {
                        response.render('searchservice', {user : doc, providers : pro, users : document, services});
                    }
                }
            });
    });
    app.get('/searchservice/requestquotation/:id', (request, response) => {
        let id = mongoose.Types.ObjectId(request.params.id);
        //connectDB();
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
                //connectDB();
                let model = new quotation_model({
                    _id: new mongoose.Types.ObjectId(),
                    _id_client : request.session.user_id,
                    _id_provider : provider,
                    service : service,
                    date : date,
                    description : description,
                    cost : 0,
                    status : "pendiente",
                    rate : 0, 
                    comment : "sin comentario",
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
            let account = request.session.account;
            //connectDB();
            if(account == "client") {
                quotation_model.aggregate([{
                    $lookup : {
                       from : "providers",
                       localField : "_id_provider",
                       foreignField : "_id",
                       as : "fromProviders"
                    }
                    },
                    { 
                        $match : { _id_client : id, $or:[ { status : "pendiente" }, { status : "aceptado" } ] } 
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
                        request.flash('info', 'no tienes cotizaciones pendientes.');
                        response.render('checkquotations', {error_message : request.flash('info'), account : account});
                    }
                    else {
                        response.render('checkquotations', {account : account, quotations : document});
                    }
                });
            }
            else {
                quotation_model.aggregate([{
                    $lookup : {
                       from : "clients",
                       localField : "_id_client",
                       foreignField : "_id",
                       as : "fromClients"
                    }
                    },
                    { 
                        $match : { _id_provider : id, $or:[ { status : "pendiente" }, { status : "aceptado" } ] } 
                    },
                    {
                        $replaceRoot : { newRoot : { $mergeObjects : [ { $arrayElemAt : [ "$fromClients", 0 ] }, "$$ROOT" ] } }
                    },
                    { 
                        $project : { account : 0, gender : 0, birthdate : 0, phonenumber : 0, address : 0, coordinate : 0, __v : 0, fromClients : 0 } 
                    }], (error : any, document : any) => {
                    if(error) {
                        console.log(error);
                    }
                    if(!document.length) {
                        request.flash('info', 'no tienes cotizaciones pendientes.');
                        response.render('checkquotations', {error_message : request.flash('info'), account : account});
                    }
                    else {
                        response.render('checkquotations', {account : account, quotations : document});
                    }
                });
            }
        }
    });
    app.get('/quoteservice/:id', (request, response) => {
        let id = mongoose.Types.ObjectId(request.params.id);
        //connectDB();
        quotation_model.findOne({_id : id}, (error, document) => {
            if(error) {
                console.log(error);
            }
            response.render('quoteservice', {quotation : document});
        });
    });
    app.put('/quoteservice/:id', (request, response) => {
        let id = mongoose.Types.ObjectId(request.params.id);
        let {cost} = request.body;
        //connectDB();
        quotation_model.updateOne({_id : id}, {cost : cost}, (error) => {
            if(error) {
                console.log(error);
            }
            response.redirect('/checkquotations');
        });
    });
    app.put('/changestatus', (request, response) => {
        let {id, status} = request.body;
        //connectDB();
        quotation_model.updateOne({_id : id}, {status : status}, (error) => {
            if(error) {
                console.log(error);
            }
            if(status == 'reportado') {
                response.redirect('/checkhistory');
            }
            else {
                response.redirect('/checkquotations');
            }
        });
    });
    app.get('/locateclient/:id', (request, response) => {
        let id_quotation = mongoose.Types.ObjectId(request.params.id);
        //connectDB();
        quotation_model.findOne({_id : id_quotation}, async (error, document) => {
            if(error) {
                console.log(error);
            }
            let id_client = document._id_client;
            let id_provider = document._id_provider;
            let doc_client = await client_model.findOne({_id : id_client}, (error) => {
                if(error) {
                    console.log(error);
                }
            });
            let doc_provider = await provider_model.findOne({_id : id_provider}, (error) => {
                if(error) {
                    console.log(error);
                }
            });
            response.render('locateclient', {client : doc_client, provider : doc_provider, quotation : document});
        });
    });
    app.get('/checkhistory', (request, response) => {
        if(request.session != undefined) {
            let id = mongoose.Types.ObjectId(request.session.user_id);
            let account = request.session.account;
            //connectDB();
            if(account == "client") {
                quotation_model.aggregate([{
                    $lookup : {
                       from : "providers",
                       localField : "_id_provider",
                       foreignField : "_id",
                       as : "fromProviders"
                    }
                    },
                    { 
                        $match : { _id_client : id, $or:[ { status : "cancelado" }, { status : "rechazado" }, { status : "finalizado" }, { status : "reportado" } ] } 
                    },
                    {
                        $replaceRoot : { newRoot : { $mergeObjects : [ { $arrayElemAt : [ "$fromProviders", 0 ] }, "$$ROOT" ] } }
                    },
                    { 
                        $project : { account : 0, gender : 0, birthdate : 0, idcard : 0, phonenumber : 0, address : 0, coordinate : 0, video : 0, certificate : 0, __v : 0, fromProviders : 0 } 
                    }], (error : any, document : any) => {
                    if (error) {
                        console.log(error);
                    }
                    if (!document.length) {
                        request.flash('info', 'no tienes historial.');
                        response.render('checkhistory', {error_message : request.flash('info'), account : account});
                    }
                    else {
                        response.render('checkhistory', {account : account, quotations : document});
                    }
                });
            }
            else {
                quotation_model.aggregate([{
                    $lookup : {
                       from : "clients",
                       localField : "_id_client",
                       foreignField : "_id",
                       as : "fromClients"
                    }
                    },
                    { 
                        $match : { _id_provider : id, $or:[ { status : "cancelado" }, { status : "rechazado" }, { status : "finalizado" }, { status : "reportado" } ] } 
                    },
                    {
                        $replaceRoot : { newRoot : { $mergeObjects : [ { $arrayElemAt : [ "$fromClients", 0 ] }, "$$ROOT" ] } }
                    },
                    { 
                        $project : { account : 0, gender : 0, birthdate : 0, phonenumber : 0, address : 0, coordinate : 0, __v : 0, fromClients : 0 } 
                    }], (error : any, document : any) => {
                    if(error) {
                        console.log(error);
                    }
                    if(!document.length) {
                        request.flash('info', 'no tienes historial.');
                        response.render('checkhistory', {error_message : request.flash('info'), account : account});
                    }
                    else {
                        response.render('checkhistory', {account : account, quotations : document});
                    }
                });
            }
        }
    });
    app.get('/rateservice/:id', (request, response) => {
        let id_quotation = mongoose.Types.ObjectId(request.params.id);
        //connectDB();
        quotation_model.findOne({_id : id_quotation}, async (error, document) => {
            if(error) {
                console.log(error);
            }
            let id_provider = document._id_provider;
            let doc_provider = await provider_model.findOne({_id : id_provider}, (error) => {
                if(error) {
                    console.log(error);
                }
            });
            response.render('rateservice', {user : doc_provider, quotation : document});
        });
    });
    app.put('/rateservice/:id', (request, response) => {
        let id = mongoose.Types.ObjectId(request.params.id);
        let {rate, comment} = request.body;
        //connectDB();
        quotation_model.updateOne({_id : id}, {rate : rate, comment : comment}, (error) => {
            if(error) {
                console.log(error);
            }
            response.redirect('/checkhistory');
        });
    });
    app.get('/updateaccount', (request, response) => {
        if(request.session != undefined) {
            let id = mongoose.Types.ObjectId(request.session.user_id);
            let account = request.session.account;
            //connectDB();
            if(account == 'client') {
                client_model.findOne({_id : id}, (error, document) => {
                    if(error) {
                        console.log(error);
                    }
                    response.render('updateaccount', {account: account, user :document});
                });
            }
            else {
                provider_model.findOne({_id : id}, (error, document) => {
                    if(error) {
                        console.log(error);
                    }
                    response.render('updateaccount', {account: account, user :document});
                });
            }
        }
    });
    app.put('/updateaccount', async (request, response) => {
        if(request.session != undefined) {
            let id = mongoose.Types.ObjectId(request.session.user_id);
            let account = request.session.account;
            let {firstname, lastname, phonenumber, email, password, image} = request.body;
            let doc;
            let doc1;
            let doc2;
            let doc3;
            let doc4;
            let document;
            //connectDB();
            if(account == 'client') {
                doc = await client_model.findOne({_id : id}, (error) => {
                    if(error) {
                        console.log(error);
                    }
                });
                doc1 = await client_model.findOne({'phonenumber' : phonenumber}, (error) => {
                    if (error){
                        console.log(error);
                    }
                });
                doc2 = await client_model.findOne({'account.email' : email}, (error) => {
                    if (error){
                        console.log(error);
                    }
                });
                doc3 = await provider_model.findOne({'phonenumber' : phonenumber}, (error) => {
                    if (error){
                        console.log(error);
                    }
                });
                doc4 = await provider_model.findOne({'account.email' : email}, (error) => {
                    if (error){
                        console.log(error);
                    }
                });
                let docs : DocumentQuery<any, any, {}>[] = [doc1, doc2, doc3, doc4];
                if (doc.name.firstname == firstname && doc.name.lastname == lastname && doc.account.email == email && doc.account.password == password && doc.account.image == image && doc.phonenumber == phonenumber) {
                    request.flash('info', 'sin cambios.');
                    response.render('updateaccount', {success_message: request.flash('info'), user : doc, account});
                }
                else if (jsonlength(docs[0]) - 6 > 0 || jsonlength(docs[1]) - 6 > 0  || jsonlength(docs[2]) > 0 || jsonlength(docs[3]) > 0) {
                    request.flash('info', 'número de teléfono o correo electrónico ya existen.');
                    response.render('updateaccount', {error_message: request.flash('info'), user : doc, account});
                }
                else {
                    client_model.updateOne({_id : id}, {name : {firstname : firstname, lastname : lastname}, account : {email : email, password : password, image : image}, phonenumber : phonenumber}, async (error) => {
                        if(error) {
                            console.log(error);
                        }
                        document = await client_model.findOne({_id : id}, (error) => {
                            if(error) {
                                console.log(error);
                            }
                        });
                        request.flash('info', 'los datos se actualizaron correctamente.');
                        response.render('main', {success_message: request.flash('info'), user : document, account});
                    });
                }
            }
            else {
                let {idcard, video, description, certificate, service} = request.body;
                doc = await provider_model.findOne({_id : id}, (error) => {
                    if(error) {
                        console.log(error);
                    }
                });
                doc1 = await client_model.findOne({'phonenumber' : phonenumber}, (error) => {
                    if (error){
                        console.log(error);
                    }
                });
                doc2 = await client_model.findOne({'account.email' : email}, (error) => {
                    if (error){
                        console.log(error);
                    }
                });
                doc3 = await provider_model.findOne({'phonenumber' : phonenumber}, (error) => {
                    if (error){
                        console.log(error);
                    }
                });
                doc4 = await provider_model.findOne({'account.email' : email}, (error) => {
                    if (error){
                        console.log(error);
                    }
                });
                let docs : DocumentQuery<any, any, {}>[] = [doc1, doc2, doc3, doc4];
                if (doc.name.firstname == firstname && doc.name.lastname == lastname && doc.account.email == email && doc.account.password == password && doc.account.image == image && doc.phonenumber == phonenumber && doc.idcard == idcard && doc.video == video && doc.description == description && doc.certificate == certificate && doc.service.title == service) {
                    request.flash('info', 'sin cambios.');
                    response.render('updateaccount', {success_message: request.flash('info'), user : doc, account});
                }
                else if (jsonlength(docs[0]) > 0 || jsonlength(docs[1]) > 0  || jsonlength(docs[2]) - 6 > 0 || jsonlength(docs[3]) - 6 > 0) {
                    request.flash('info', 'número de teléfono o correo electrónico ya existen.');
                    response.render('updateaccount', {error_message: request.flash('info'), user : doc, account});
                }
                else {
                    provider_model.updateOne({_id : id}, {name : {firstname : firstname, lastname : lastname}, account : {email : email, password : password, image : image}, phonenumber : phonenumber, idcard : idcard, video : video, description : description, certificate : certificate, service : {title : service}}, async (error) => {
                        if(error) {
                            console.log(error);
                        }
                        document = await provider_model.findOne({_id : id}, (error) => {
                            if(error) {
                                console.log(error);
                            }
                        });
                        request.flash('info', 'los datos se actualizaron correctamente.');
                        response.render('main', {success_message: request.flash('info'), user : document, account});
                    });
                }
            }
        }
    });
    app.put('/updateaccountlocation', (request, response) => {
        if(request.session != undefined) {
            let id = mongoose.Types.ObjectId(request.session.user_id);
            let account = request.session.account;
            let {address, latitude, longitude} = request.body;
            let document;
            //connectDB();
            if (account == 'client') {
                client_model.updateOne({_id : id}, {address : address, coordinate : {latitude : latitude, longitude : longitude}}, async (error) => {
                    if(error) {
                        console.log(error);
                    }
                    document = await client_model.findOne({_id : id}, (error) => {
                        if(error) {
                            console.log(error);
                        }
                    });
                    request.flash('info', 'los datos se actualizaron correctamente.');
                    response.render('main', {success_message: request.flash('info'), user : document, account});
                });
            }
            else {
                provider_model.updateOne({_id : id}, {address : address, coordinate : {latitude : latitude, longitude : longitude}}, async (error) => {
                    if(error) {
                        console.log(error);
                    }
                    document = await provider_model.findOne({_id : id}, (error) => {
                        if(error) {
                            console.log(error);
                        }
                    });
                    request.flash('info', 'los datos se actualizaron correctamente.');
                    response.render('main', {success_message: request.flash('info'), user : document, account});
                });
            }
        }
    });
    app.get('/deleteaccount', (request, response) => {
        if(request.session != undefined) {
            response.render('deleteaccount', {account: request.session.account});
        }
    });
    app.delete('/deleteaccount', async (request, response) => {
        if(request.session != undefined) {
            let id = mongoose.Types.ObjectId(request.session.user_id);
            let account = request.session.account;
            let {password} = request.body;
            let doc;
            //connectDB();
            if(account == 'client') {
                doc = await client_model.findOne({_id : id}, async (error) => {
                    if(error) {
                        console.log(error);
                    }
                });
                let match = await doc.matchPassword(password);
                if (match) {
                    quotation_model.updateMany({_id_client : id, status : {$in:['pendiente', 'aceptado']}}, {status : 'cancelado'}, (error) => {
                        if(error) {
                            console.log(error);
                        }
                        client_model.deleteOne({_id : id}, (error) => {
                            if(error) {
                                console.log(error);
                            }
                            response.redirect("/");
                        });
                    });
                }
                else {
                    request.flash('info', 'contraseña incorrecta.');
                    response.render('deleteaccount', {error_message: request.flash('info'), password});
                }
            }
            else {
                doc = await provider_model.findOne({_id : id}, async (error) => {
                    if(error) {
                        console.log(error);
                    }
                });
                let match = await doc.matchPassword(password);
                if (match) {
                    quotation_model.updateMany({_id_provider : id, status : {$in:['pendiente', 'aceptado']}}, {status : 'rechazado'}, (error) => {
                        if(error) {
                            console.log(error);
                        }
                        provider_model.deleteOne({_id : id}, (error) => {
                            if(error) {
                                console.log(error);
                            }
                            response.redirect("/");
                        });
                    });
                } 
                else {
                    request.flash('info', 'contraseña incorrecta.');
                    response.render('deleteaccount', {error_message: request.flash('info'), password});
                }
            }
        }
    });
    module.exports = app;
};
main();