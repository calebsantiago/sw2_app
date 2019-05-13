import mongoose from 'mongoose';
let schema = mongoose.Schema;
let quotation_schema = new schema ({
    _id : mongoose.Schema.Types.ObjectId,
    _id_client : mongoose.Schema.Types.ObjectId,
    _id_provider : mongoose.Schema.Types.ObjectId,
    date : {type: String, required: true},
    description : {type: String, required: true},
    cost : Number,
    image : String
});
export let quotation_model : mongoose.Model<any> = mongoose.model('quotations', quotation_schema);