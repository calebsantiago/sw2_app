import mongoose from 'mongoose'
import {Quotation, QuotationDAO} from '../dao/QuotationDAO'
import QuotationAdapter from '../adapter/QuotationAdapter'
export class QuotationMock extends QuotationAdapter {
    static INSTANCE : QuotationMock | undefined
    private constructor() {
        super()
    }
    static getInstance() : QuotationMock {
        if (QuotationMock.INSTANCE == undefined) {
            QuotationMock.INSTANCE = new QuotationMock()
        }
        return QuotationMock.INSTANCE
    }
    insert(id_client : string, id_provider : string, service : string, date : string, description : string, image : string) : void {
        new QuotationDAO({
            _id: new mongoose.Types.ObjectId(),
            _id_client : id_client,
            _id_provider : id_provider,
            service : service,
            date : date,
            description : description,
            cost : 0,
            status : 'pendiente',
            rate : 0, 
            comment : 'sin comentario',
            image : image
        }).save((error : any) => {
            if (error) {
                console.log(error)
            }
        })
    }
    findcheckbyclient(id : string) : Promise<any[]> {
        return QuotationDAO.aggregate([
            {
                $lookup : {
                    from : 'providers',
                    localField : '_id_provider',
                    foreignField : '_id',
                    as : 'fromProviders'
                }
            },
            {
                $match : {
                    _id_client : mongoose.Types.ObjectId(id),
                    status : {
                        $in:['pendiente', 'aceptado']
                    }
                }
            },
            {
                $replaceRoot : {
                    newRoot : {
                        $mergeObjects : [
                            {
                                $arrayElemAt : ['$fromProviders', 0]
                            },
                            '$$ROOT' 
                        ]
                    }
                }
            },
            {
                $project : {
                    account : 0,
                    gender : 0,
                    birthdate : 0,
                    idcard : 0,
                    phonenumber : 0,
                    address : 0,
                    coordinate : 0,
                    video : 0,
                    certificate : 0,
                    __v : 0,
                    fromProviders : 0
                } 
            }], (error : any) => {
                if (error) {
                    console.log(error)
                }
        })
    }
    findcheckbyprovider(id : string) : Promise<any[]> {
        return QuotationDAO.aggregate([
            {
                $lookup : {
                    from : 'clients',
                    localField : '_id_client',
                    foreignField : '_id',
                    as : 'fromClients'
                }
            },
            {
                $match : {
                    _id_provider : mongoose.Types.ObjectId(id),
                    status : {
                        $in:['pendiente', 'aceptado']
                    }
                }
            },
            {
                $replaceRoot : {
                    newRoot : {
                        $mergeObjects : [
                            {
                                $arrayElemAt : ['$fromClients', 0]
                            },
                            '$$ROOT' 
                        ]
                    }
                }
            },
            {
                $project : {
                    account : 0,
                    gender : 0,
                    birthdate : 0,
                    idcard : 0,
                    phonenumber : 0,
                    address : 0,
                    coordinate : 0,
                    video : 0,
                    certificate : 0,
                    __v : 0,
                    fromProviders : 0
                } 
            }], (error : any) => {
                if (error) {
                    console.log(error)
                }
        })
    }
    findbyid(id : string) : mongoose.DocumentQuery<Quotation | null, Quotation, {}> {
        return QuotationDAO.findOne({_id : mongoose.Types.ObjectId(id)}, (error : any) => {
            if (error) {
                console.log(error)
            }
        })
    }
    findhistorybyclient(id : string) : Promise<any[]> {
        return QuotationDAO.aggregate([
            {
                $lookup : {
                    from : 'providers',
                    localField : '_id_provider',
                    foreignField : '_id',
                    as : 'fromProviders'
                }
            },
            {
                $match : {
                    _id_client : mongoose.Types.ObjectId(id),
                    status : {
                        $in:['cancelado', 'rechazado', 'finalizado', 'reportado']
                    }
                }
            },
            {
                $replaceRoot : {
                    newRoot : {
                        $mergeObjects : [
                            {
                                $arrayElemAt : ['$fromProviders', 0]
                            },
                            '$$ROOT' 
                        ]
                    }
                }
            },
            {
                $project : {
                    account : 0,
                    gender : 0,
                    birthdate : 0,
                    idcard : 0,
                    phonenumber : 0,
                    address : 0,
                    coordinate : 0,
                    video : 0,
                    certificate : 0,
                    __v : 0,
                    fromProviders : 0
                } 
            }], (error : any) => {
                if (error) {
                    console.log(error)
                }
        })
    }
    findhistorybyprovider(id : string) : Promise<any[]> {
        return QuotationDAO.aggregate([
            {
                $lookup : {
                    from : 'clients',
                    localField : '_id_client',
                    foreignField : '_id',
                    as : 'fromClients'
                }
            },
            {
                $match : {
                    _id_provider : mongoose.Types.ObjectId(id),
                    status : {
                        $in:['cancelado', 'rechazado', 'finalizado', 'reportado']
                    }
                }
            },
            {
                $replaceRoot : {
                    newRoot : {
                        $mergeObjects : [
                            {
                                $arrayElemAt : ['$fromClients', 0]
                            },
                            '$$ROOT' 
                        ]
                    }
                }
            },
            {
                $project : {
                    account : 0,
                    gender : 0,
                    birthdate : 0,
                    idcard : 0,
                    phonenumber : 0,
                    address : 0,
                    coordinate : 0,
                    video : 0,
                    certificate : 0,
                    __v : 0,
                    fromProviders : 0
                } 
            }], (error : any) => {
                if (error) {
                    console.log(error)
                }
        })
    }
    updatecost(id : string, cost : number) : void {
        QuotationDAO.updateOne({_id : mongoose.Types.ObjectId(id)}, {cost : cost}, (error : any) => {
            if (error) {
                console.log(error)
            }
        })
    }
    updatestatus(id : string, status : string) : void {
        QuotationDAO.updateOne({_id : mongoose.Types.ObjectId(id)}, {status : status}, (error : any) => {
            if (error) {
                console.log(error)
            }
        })
    }
    updateratecomment(id : string, rate : number, comment : string) : void {
        QuotationDAO.updateOne({_id : mongoose.Types.ObjectId(id)}, {rate : rate, comment : comment}, (error : any) => {
            if (error) {
                console.log(error)
            }
        })
    }
    updatemanybyclient(id : string) : void {
        QuotationDAO.updateMany({_id_client : mongoose.Types.ObjectId(id), status : {$in:['pendiente', 'aceptado']}}, {status : 'cancelado'}, (error : any) => {
            if (error) {
                console.log(error)
            }
        })
    }
    updatemanybyprovider(id : string) : void {
        QuotationDAO.updateMany({_id_provider : mongoose.Types.ObjectId(id), status : {$in:['pendiente', 'aceptado']}}, {status : 'rechazado'}, (error : any) => {
            if (error) {
                console.log(error)
            }
        })
    }
}