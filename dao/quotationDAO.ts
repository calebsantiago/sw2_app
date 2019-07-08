import mongoose from 'mongoose'
let Schema = mongoose.Schema
let ObjectId = mongoose.Schema.Types.ObjectId
export interface Quotation extends mongoose.Document {
    _id : String,
    _id_client : String,
    _id_provider : String,
    service : String,
    date : String,
    description : String,
    cost : Number,
    status : String,
    rate : Number,
    comment : String,
    image : String
}
const QuotationSchema = new Schema ({
    _id : ObjectId,
    _id_client : ObjectId,
    _id_provider : ObjectId,
    service : {type : String, required : true},
    date : {type : String, required : true},
    description : {type : String, required : true},
    cost : {type : Number, required : true},
    status : {type : String, required : true},
    rate : {type : Number, required : true},
    comment : {type : String, required : true},
    image : {type : String, required : false}
})
export const QuotationDAO : mongoose.Model<Quotation> = mongoose.model('quotations', QuotationSchema)