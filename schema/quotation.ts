import mongoose from 'mongoose';
let schema = mongoose.Schema;
let quotation_schema = new schema ({
    _id : mongoose.Schema.Types.ObjectId,
    _id_client : mongoose.Schema.Types.ObjectId,
    _id_provider : mongoose.Schema.Types.ObjectId,
    service : {type: String, required: true},
    date : {type: String, required: true},
    description : {type: String, required: true},
    cost : {type: Number, required: true},
    status : {type: String, required: true},
    image : String
});
export let quotation_model : mongoose.Model<any> = mongoose.model('quotations', quotation_schema);