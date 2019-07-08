import mongoose from 'mongoose'
import connect from '../connection'
import ProviderMock from './../mock/providerMock'
import ClientMock from './../mock/clientMock'
import QuotationMock from '../mock/quotationMock'
describe('app test', () => {
    beforeAll(() => {
        const db : string = 'mongodb+srv://caleb:Misael15@cluster0-aqv0w.mongodb.net/test?retryWrites=true'
        connect({db})
    })
    afterAll((done) => {
        mongoose.disconnect(done)
    })
    it('findclientbyid', async () => {
        let response = await ClientMock.getInstance().findbyid('5d228ba5834d870dec4450be')
        let result = 'caleb'
        if (response != null) {
            expect(response.name.firstname).toEqual(result)
        }
        else {
            expect(response).toEqual(null)
        }
    })
    it('findproviderbyemail', async () => {
        let response = await ProviderMock.getInstance().findbyemail('nada@gmail.com')
        let result = 'nada@gmail.com'
        if (response != null) {
            expect(response.account.email).toEqual(result)
        }
        else {
            expect(response).toEqual(null)
        }
    })
    it('findclientbyphonenumber', async () => {
        let response = await ClientMock.getInstance().findbyphonenumber(997754390)
        let result = 997754390
        if (response != null) {
            expect(response.phonenumber).toEqual(result)
        }
        else {
            expect(response).toEqual(null)
        }
    })
    it('findproviderbyservice', async () => {
        let response = await ProviderMock.getInstance().findbyservicesaveragerate('panadería')
        let result = 'panadería'
        if (response.length > 0) {
            expect(response[0].service.title).toEqual(result)
        }
        else {
            expect(response).toEqual([])
        }
    })
    it('findquotationbyid', async () => {
        let response = await QuotationMock.getInstance().findbyid('5d155393fae8d20017d78b74')
        let result = 'panadería'
        if (response != null) {
            expect(response.service).toEqual(result)
        }
        else {
            expect(response).toEqual(null)
        }
    })
    it('findcheckbyclient', async () => {
        let response = await QuotationMock.getInstance().findcheckbyclient('5d228ba5834d870dec4450be')
        let result = 'panadería'
        if (response.length > 0) {
            expect(response[0].service).toEqual(result)
        }
        else {
            expect(response).toEqual([])
        }
    })
    it('findhistorybyprovider', async () => {
        let response = await QuotationMock.getInstance().findhistorybyprovider('5cd093b9c1b14913e87bd2e4')
        let result = 'panadería'
        if (response.length > 0) {
            expect(response[0].service).toEqual(result)
        }
        else {
            expect(response).toEqual([])
        }
    })
})