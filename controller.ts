import ClientMock from "./mock/clientMock"
import ProviderMock from "./mock/providerMock"
import QuotationMock from "./mock/quotationMock"
import {sendMail, jsonlength} from "./functions"
export let controller = {
    'getindex' : function(request, response) {
        response.render('index')
    },
    'getsignup' : function(request, response) {
        response.render('signup')
    },
    'postsignup' : async function(request, response) {
        let {firstname, lastname, gender, birthdate, idcard, phonenumber, email, password, confirm_password, image, account, address, latitude, longitude, video, description, certificate, service} = request.body    
        let query1 = await ClientMock.getInstance().findbyphonenumber(phonenumber)
        let query2 = await ClientMock.getInstance().findbyemail(email)
        let query3 = await ProviderMock.getInstance().findbyphonenumber(phonenumber)
        let query4 = await ProviderMock.getInstance().findbyemail(email)
        if (query1 || query3) {
            request.flash('info', 'número de teléfono ya existe.')
            response.render('signup', {error_message: request.flash('info'), firstname, lastname, gender, birthdate, idcard, phonenumber, email, password, confirm_password, image, account, video, description, certificate, service})
        }
        else if (query2 || query4) {
            request.flash('info', 'correo electrónico ya existe.')
            response.render('signup', {error_message: request.flash('info'), firstname, lastname, gender, birthdate, idcard, phonenumber, email, password, confirm_password, image, account, video, description, certificate, service})
        }
        else {
            if (account === 'client') {
                ClientMock.getInstance().insert(email, password, image, firstname, lastname, gender, birthdate, phonenumber, address, latitude, longitude)
            }
            else {
                ProviderMock.getInstance().insert(email, password, image, firstname, lastname, gender, birthdate, phonenumber, address, latitude, longitude, idcard, video, description, certificate, service)
            }
            request.flash('info', 'estas registrado.')
            response.render('login', {success_message : request.flash('info')})
            sendMail(email, firstname, lastname)
        }
    },
    'getlogin' : function(request, response) {
        response.render('login')
    }, 
    'postlogin' : async function(request, response) {
        let {email, password} = request.body
        let account = 'client'
        let email_expression : RegExp = /[^@\s]+@[^@\s]+\.[^@\s]+/
        let query
        if (email_expression.test(email)) {
            query = await ClientMock.getInstance().findbyemail(email)
            if (!query) {
                query = await ProviderMock.getInstance().findbyemail(email)
                account = 'provider'
            }
        }
        else {
            query = await ClientMock.getInstance().findbyphonenumber(email)
            if (!query) {
                query = await ProviderMock.getInstance().findbyphonenumber(email)
                account = 'provider'
            }
        }
        if (!query) {
            request.flash('info', 'correo electrónico o número de teléfono no existe.')
            response.render('login', {error_message : request.flash('info'), email, password})
        } 
        else {
            if (password === query.account.password) {
                if (request.session != undefined) {
                    request.session.user_id = query._id
                    request.session.account = account
                    response.render('main', {user : query, account : account})
                }
            } 
            else {
                request.flash('info', 'contraseña incorrecta.')
                response.render('login', {error_message : request.flash('info'), email, password})
            }
        }
    },
    'getlogout' : function(request, response) {
        if (request.session != undefined) {
            request.logout()
            request.session.destroy((error ) => {
                if (error) {
                    console.log(error)
                }
            })
            response.redirect('/')
        }
        else {
            response.render('login')
        }
    },
    'getmain' : async function(request, response) {
        if (request.session != undefined) {
            let id = request.session.user_id
            let account = request.session.account
            let query
            if (account == 'client') {
                query = await ClientMock.getInstance().findbyid(id)
            }
            else {
                query = await ProviderMock.getInstance().findbyid(id)
            }
            response.render('main', {user : query, account : account})
        }
        else {
            response.render('login')
        }
    },
    'getsearchservice' : async function(request, response) {
        if (request.session != undefined) {
            let id = request.session.user_id
            let query = await ClientMock.getInstance().findbyid(id)
            let providers = await ProviderMock.getInstance().findall()
            response.render('searchservice', {user : query, providers : providers})
        }
        else {
            response.render('login')
        }
    },
    'postsearchservice' : async function(request, response) {
        if (request.session != undefined) {
            let {services} = request.body
            let id = request.session.user_id
            let query = await ClientMock.getInstance().findbyid(id)
            let document = await ProviderMock.getInstance().findbyservicesaveragerate(services)
            let providers = await ProviderMock.getInstance().findall()
            if (!document.length) {
                request.flash('info', 'servicio no existe.')
                response.render('searchservice', {error_message : request.flash('info'), user : query, providers : providers, services})
            }
            else {
                response.render('searchservice', {user : query, users : document, providers : providers, services})
            }
        }
        else {
            response.render('login')
        }
    },
    'getrequestquotation' : async function(request, response) {
        if (request.session != undefined) {
            let id = request.params.id
            let user = await ProviderMock.getInstance().findbyid(id)
            response.render('requestquotation', {user : user})
        }
        else {
            response.render('login')
        }
    },
    'postrequestquotation' : function(request, response) {
        if (request.session != undefined) {
            let {provider, service, date, description, image} = request.body
            let id = request.session.user_id
            QuotationMock.getInstance().insert(id, provider, service, date, description, image)
            response.redirect('/searchservice')
        }
        else {
            response.render('login')
        }
    },
    'getcheckquotations' : async function(request, response) {
        if (request.session != undefined) {
            let id = request.session.user_id
            let account = request.session.account
            let quotations
            if (account == 'client') {
                quotations = await QuotationMock.getInstance().findcheckbyclient(id)
            }
            else {
                quotations = await QuotationMock.getInstance().findcheckbyprovider(id)
            }
            if (!quotations.length) {
                request.flash('info', 'no tienes cotizaciones pendientes.')
                response.render('checkquotations', {error_message : request.flash('info'), account : account})
            }
            else {
                response.render('checkquotations', {account : account, quotations : quotations})
            }
        }
        else {
            response.render('login')
        }
    },
    'getquoteservice' : async function(request, response) {
        if (request.session != undefined) {
            let id = request.params.id
            let quotation = await QuotationMock.getInstance().findbyid(id)
            response.render('quoteservice', {quotation : quotation})
        }
        else {
            response.render('login')
        }
    },
    'putquoteservice' : function(request, response) {
        if (request.session != undefined) {
            let {cost} = request.body
            let id = request.params.id
            QuotationMock.getInstance().updatecost(id, cost)
            response.redirect('/checkquotations')
        }
        else {
            response.render('login')
        }
    },
    'putchangestatus' : function(request, response) {
        if (request.session != undefined) {
            let {id, status} = request.body
            QuotationMock.getInstance().updatestatus(id, status)
            if (status == 'reportado') {
                response.redirect('/checkhistory')
            }
            else {
                response.redirect('/checkquotations')
            }
        }
        else {
            response.render('login')
        }
    },
    'getlocateclient' : async function(request, response) {
        if (request.session != undefined) {
            let id = request.params.id
            let quotation = await QuotationMock.getInstance().findbyid(id)
            if (quotation != null) {
                let id_client = quotation._id_client.toString()
                let id_provider = quotation._id_provider.toString()
                let client = await ClientMock.getInstance().findbyid(id_client)
                let provider = await ProviderMock.getInstance().findbyid(id_provider)
                response.render('locateclient', {client : client, provider : provider, quotation : quotation})
            }
        }
        else {
            response.render('login')
        }
    },
    'getcheckhistory' : async function(request, response) {
        if (request.session != undefined) {
            let id = request.session.user_id
            let account = request.session.account
            let quotations
            if (account == 'client') {
                quotations = await QuotationMock.getInstance().findhistorybyclient(id)
            }
            else {
                quotations = await QuotationMock.getInstance().findhistorybyprovider(id)
            }
            if (!quotations.length) {
                request.flash('info', 'no tienes historial.')
                response.render('checkhistory', {error_message : request.flash('info'), account : account})
            }
            else {
                response.render('checkhistory', {account : account, quotations : quotations})
            }
        }
        else {
            response.render('login')
        }
    },
    'getrateservice' : async function(request, response) {
        if (request.session != undefined) {
            let id = request.params.id
            let quotation = await QuotationMock.getInstance().findbyid(id)
            if (quotation != null) {
                let id_provider = quotation._id_provider.toString()
                let provider = await ProviderMock.getInstance().findbyid(id_provider)
                response.render('rateservice', {user : provider, quotation : quotation})
            }
        }
        else {
            response.render('login')
        }
    },
    'putrateservice' : function(request, response) {
        if (request.session != undefined) {
            let {rate, comment} = request.body
            let id = request.params.id
            QuotationMock.getInstance().updateratecomment(id, rate, comment)
            response.redirect('/checkhistory')
        }
        else {
            response.render('login')
        }
    },
    'getupdateaccount' : async function(request, response) {
        if (request.session != undefined) {
            let id = request.session.user_id
            let account = request.session.account
            let query
            if (account == 'client') {
                query = await ClientMock.getInstance().findbyid(id)
            }
            else {
                query = await ProviderMock.getInstance().findbyid(id)
            }
            response.render('updateaccount', {account : account, user : query})
        }
        else {
            response.render('login')
        }
    },
    'putupdateaccount' : async function(request, response) {
        if (request.session != undefined) {
            let {firstname, lastname, phonenumber, email, password, image, idcard, video, description, certificate, service} = request.body
            let id = request.session.user_id
            let account = request.session.account
            let query1 = await ClientMock.getInstance().findbyphonenumber(phonenumber)
            let query2 = await ClientMock.getInstance().findbyemail(email)
            let query3 = await ProviderMock.getInstance().findbyphonenumber(phonenumber)
            let query4 = await ProviderMock.getInstance().findbyemail(email)
            let user
            let document
            if (account == 'client') {
                user = await ClientMock.getInstance().findbyid(id)
                if (user != null) {
                    if (user.name.firstname == firstname && user.name.lastname == lastname && user.account.email == email && user.account.password == password && user.account.image == image && user.phonenumber == phonenumber) {
                        request.flash('info', 'sin cambios.')
                        response.render('updateaccount', {success_message : request.flash('info'), user : user, account})
                    }
                    else if (jsonlength(query1) - 6 > 0 || jsonlength(query2) - 6 > 0  || jsonlength(query3) > 0 || jsonlength(query4) > 0) {
                        request.flash('info', 'número de teléfono o correo electrónico ya existen.')
                        response.render('updateaccount', {error_message : request.flash('info'), user : user, account})
                    }
                    else {
                        ClientMock.getInstance().updateprofile(id, firstname, lastname, email, password, image, phonenumber)
                        document = await ClientMock.getInstance().findbyid(id)
                        request.flash('info', 'los datos se actualizaron correctamente.')
                        response.render('main', {success_message : request.flash('info'), user : document, account})
                    }
                }
            }
            else {
                user = await ProviderMock.getInstance().findbyid(id)
                if (user != null) {
                    if (user.name.firstname == firstname && user.name.lastname == lastname && user.account.email == email && user.account.password == password && user.account.image == image && user.phonenumber == phonenumber && user.idcard == idcard && user.video == video && user.description == description && user.certificate == certificate && user.service.title == service) {
                        request.flash('info', 'sin cambios.')
                        response.render('updateaccount', {success_message : request.flash('info'), user : user, account})
                    }
                    else if (jsonlength(query1) > 0 || jsonlength(query2) > 0  || jsonlength(query3) - 6 > 0 || jsonlength(query4) - 6 > 0) {
                        request.flash('info', 'número de teléfono o correo electrónico ya existen.')
                        response.render('updateaccount', {error_message : request.flash('info'), user : user, account})
                    }
                    else {
                        ProviderMock.getInstance().updateprofile(id, firstname, lastname, email, password, image, phonenumber, idcard, video, description, certificate, service)
                        document = await ProviderMock.getInstance().findbyid(id)
                        request.flash('info', 'los datos se actualizaron correctamente.')
                        response.render('main', {success_message : request.flash('info'), user : document, account})
                    }
                }
            }
        }
        else {
            response.render('login')
        }
    },
    'putupdateaccountlocation' : async function(request, response) {
        if (request.session != undefined) {
            let {address, latitude, longitude} = request.body
            let id = request.session.user_id
            let account = request.session.account
            let document
            if (account == 'client') {
                ClientMock.getInstance().updatelocation(id, address, latitude, longitude)
                document = await ClientMock.getInstance().findbyid(id)
            }
            else {
                ProviderMock.getInstance().updatelocation(id, address, latitude, longitude)
                document = await ProviderMock.getInstance().findbyid(id)
            }
            request.flash('info', 'los datos se actualizaron correctamente.')
            response.render('main', {success_message : request.flash('info'), user : document, account})
        }
        else {
            response.render('login')
        }
    },
    'getdeleteaccount' : function(request, response) {
        if (request.session != undefined) {
            let account = request.session.account
            response.render('deleteaccount', {account : account})
        }
        else {
            response.render('login')
        }
    },
    'deletedeleteaccount' : async function(request, response) {
        if (request.session != undefined) {
            let {password} = request.body
            let id = request.session.user_id
            let account = request.session.account
            let query
            if (account == 'client') {
                query = await ClientMock.getInstance().findbyid(id)
                if (query != null) {
                    if (password === query.account.password) {
                        QuotationMock.getInstance().updatemanybyclient(id)
                        ClientMock.getInstance().delete(id)
                        response.redirect('/')
                    }
                    else {
                        request.flash('info', 'contraseña incorrecta.')
                        response.render('deleteaccount', {error_message : request.flash('info'), password})
                    }
                }
            }
            else {
                query = await ProviderMock.getInstance().findbyid(id)
                if (query != null) {
                    if (password === query.account.password) {
                        QuotationMock.getInstance().updatemanybyprovider(id)
                        ProviderMock.getInstance().delete(id)
                        response.redirect('/')
                    }
                    else {
                        request.flash('info', 'contraseña incorrecta.')
                        response.render('deleteaccount', {error_message: request.flash('info'), password})
                    }
                }
            }
        }
        else {
            response.render('login')
        }
    }
}