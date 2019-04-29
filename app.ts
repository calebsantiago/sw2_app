import express from 'express';
import bodyParser from 'body-parser';
import method_override from 'method-override';
import {connectDB} from './connection';
import {user_model} from './schema/user';
import {User} from './class/user';
import nodemailer from 'nodemailer';

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
        connectDB();
        let username : string = request.body.username;
        let password : string = request.body.password;
        let account : string = request.body.account;
        let name : string = request.body.name;
        let lastname : string = request.body.lastname;
        let gender : string = request.body.gender;
        let birthdate : string = request.body.birthdate;
        console.log(request.body.birthdate);
        console.log(birthdate);
        let phonenumber : number = request.body.phonenumber;
        let email : string = request.body.email;
        let address : string = request.body.address;
        let latitude : number = request.body.latitude;
        let longitude : number = request.body.longitude;
        let user : User = new User(username, password, account, name, lastname, gender, birthdate, phonenumber, email, address, latitude, longitude);
        let model = new user_model(user);
        let transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: 'contactaulima@gmail.com',
                pass: 'ulimasw2'
            }
        });
        let mailOptions = {
            from: 'contactaulima@gmail.com',
            to: user.email,
            subject: 'Asunto',
            text: 'Hola ' + user.username
        };
        transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
                console.log(error);
            }
            else {
                console.log('Email sent: '+ info.response);
            }
        });
        console.log(model);
        model.save((error) => {
            if(error){
                console.log(error);
            }
            response.redirect('/');
        });
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
        user_model.find((error, document) => {
            if(error){
                console.log(error);
            }
            response.render('update', {users : document});
        });
    });
    app.get('/update/edit/:id', (request, response) => {
        connectDB();
        let user_id = request.params.id;
        user_model.findOne({_id : user_id}, (error, document) => {
            if(error){
                console.log(error);
            }
            console.log(document);
            response.render('edit', {user : document});
        });
    });
    app.put('/update/edit/:id', (request, response) => {
        connectDB();
        let user_id = request.params.id;
        let username : string = request.body.username;
        let password : string = request.body.password;
        let account : string = request.body.account;
        let name : string = request.body.name;
        let lastname : string = request.body.lastname;
        let gender : string = request.body.gender;
        let birthdate : string = request.body.birthdate;
        let phonenumber : number = request.body.phonenumber;
        let email : string = request.body.email;
        let address : string = request.body.address;
        let latitude : number = request.body.latitude;
        let longitude : number = request.body.longitude;
        let user : User = new User(username, password, account, name, lastname, gender, birthdate, phonenumber, email, address, latitude, longitude);
        user_model.updateOne({_id : user_id}, user, (error) => {
            if(error){
                console.log(error);
            }
            response.redirect('/');
        });
    });
    app.get('/delete', (request, response) => {
        connectDB();
        user_model.find((error, document) => {
            if(error){
                console.log(error);
            }
            response.render('delete', {users : document});
        });
    });
    app.get('/delete/drop/:id', (request, response) => {
        connectDB();
        let user_id = request.params.id;
        user_model.findOne({_id : user_id}, (error, document) => {
            if(error){
                console.log(error);
            }
            console.log(document);
            response.render('drop', {user : document});
        });
    });
    app.delete('/delete/drop/:id', (request, response) => {
        connectDB();
        let user_id = request.params.id;
        user_model.deleteOne({_id : user_id}, (error) => {
            if(error){
                console.log(error);
            }
            response.redirect('/');
        });
    });
    module.exports = app;
};
main();