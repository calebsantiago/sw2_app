import express from 'express';
import bodyParser from 'body-parser';
import method_override from 'method-override';
import {connectDB} from './connection';
import {user_model} from './schema/user';
import {User} from './class/user';
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
        let name : string = request.body.name;
        let password : string = request.body.password;
        let email : string = request.body.email;
        let user : User = new User(name, password, email);
        let model = new user_model(user);
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
        let name : string = request.body.name;
        let password : string = request.body.password;
        let email : string = request.body.email;
        let user = new User(name, password, email);
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