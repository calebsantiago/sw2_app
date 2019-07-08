"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var method_override_1 = __importDefault(require("method-override"));
var express_session_1 = __importDefault(require("express-session"));
var passport_1 = __importDefault(require("passport"));
var connect_flash_1 = __importDefault(require("connect-flash"));
var connection_1 = __importDefault(require("./connection"));
var controller_1 = require("./controller");
var db = 'mongodb+srv://caleb:Misael15@cluster0-aqv0w.mongodb.net/test?retryWrites=true';
connection_1.default({ db: db });
var port = process.env.PORT || 3000;
var app = express_1.default();
app.set('view engine', 'pug');
app.set('views', './views');
app.use(express_1.default.urlencoded({ extended: false }));
app.use(express_1.default.static('./public'));
app.use(express_1.default.json());
app.use(method_override_1.default('_method'));
app.use(express_session_1.default({
    secret: 'secret',
    resave: false,
    saveUninitialized: false
}));
app.use(passport_1.default.initialize());
app.use(passport_1.default.session());
app.use(connect_flash_1.default());
app.get('/', controller_1.controller.getindex);
app.get('/signup', controller_1.controller.getsignup);
app.post('/signup', controller_1.controller.postsignup);
app.get('/login', controller_1.controller.getlogin);
app.post('/login', controller_1.controller.postlogin);
app.get('/logout', controller_1.controller.getlogout);
app.get('/main', controller_1.controller.getmain);
app.get('/searchservice', controller_1.controller.getsearchservice);
app.post('/searchservice', controller_1.controller.postsearchservice);
app.get('/searchservice/requestquotation/:id', controller_1.controller.getrequestquotation);
app.post('/searchservice/requestquotation/:id', controller_1.controller.postrequestquotation);
app.get('/checkquotations', controller_1.controller.getcheckquotations);
app.get('/quoteservice/:id', controller_1.controller.getquoteservice);
app.put('/quoteservice/:id', controller_1.controller.putquoteservice);
app.put('/changestatus', controller_1.controller.putchangestatus);
app.get('/locateclient/:id', controller_1.controller.getlocateclient);
app.get('/checkhistory', controller_1.controller.getcheckhistory);
app.get('/rateservice/:id', controller_1.controller.getrateservice);
app.put('/rateservice/:id', controller_1.controller.putrateservice);
app.get('/updateaccount', controller_1.controller.getupdateaccount);
app.put('/updateaccount', controller_1.controller.putupdateaccount);
app.put('/updateaccountlocation', controller_1.controller.putupdateaccountlocation);
app.get('/deleteaccount', controller_1.controller.getdeleteaccount);
app.delete('/deleteaccount', controller_1.controller.deletedeleteaccount);
app.listen(port, function () {
    console.log("App running in port " + port);
});
