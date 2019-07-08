import express from 'express'
import method_override from 'method-override'
import session from 'express-session'
import passport from 'passport'
import flash from 'connect-flash'
import connect from './connection'
import {controller} from './controller'
const db : string = 'mongodb+srv://caleb:Misael15@cluster0-aqv0w.mongodb.net/test?retryWrites=true'
connect({db})
let port = process.env.PORT || 3000
const app : express.Application = express()
app.set('view engine', 'pug')
app.set('views', './views')
app.use(express.urlencoded({extended: false}))
app.use(express.static('./public'))
app.use(express.json())
app.use(method_override('_method'))
app.use(session({
    secret: 'secret',
    resave: false,
    saveUninitialized: false
}))
app.use(passport.initialize())
app.use(passport.session())
app.use(flash())
app.get('/', controller.getindex)
app.get('/signup', controller.getsignup)
app.post('/signup', controller.postsignup)
app.get('/login', controller.getlogin)
app.post('/login', controller.postlogin)
app.get('/logout', controller.getlogout)
app.get('/main', controller.getmain)
app.get('/searchservice', controller.getsearchservice)
app.post('/searchservice', controller.postsearchservice)
app.get('/searchservice/requestquotation/:id', controller.getrequestquotation)
app.post('/searchservice/requestquotation/:id', controller.postrequestquotation)
app.get('/checkquotations', controller.getcheckquotations)
app.get('/quoteservice/:id', controller.getquoteservice)
app.put('/quoteservice/:id', controller.putquoteservice)
app.put('/changestatus', controller.putchangestatus)
app.get('/locateclient/:id', controller.getlocateclient)
app.get('/checkhistory', controller.getcheckhistory)
app.get('/rateservice/:id', controller.getrateservice)
app.put('/rateservice/:id', controller.putrateservice)
app.get('/updateaccount', controller.getupdateaccount)
app.put('/updateaccount', controller.putupdateaccount)
app.put('/updateaccountlocation', controller.putupdateaccountlocation)
app.get('/deleteaccount', controller.getdeleteaccount)
app.delete('/deleteaccount', controller.deletedeleteaccount)
app.listen(port, () => {
    console.log(`App running in port ${port}`)
})