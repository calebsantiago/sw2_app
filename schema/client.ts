import mongoose from 'mongoose';
let Schema = mongoose.Schema;
let client_schema = new Schema ({
    _id : mongoose.Schema.Types.ObjectId,
    account : {
        username : String,
        password : String,
        image : String
    },
    name : {
        firstname : String,
        lastname : String
    },
    gender : String,
    birthdate : String,
    phonenumber : Number,
    email : String,
    address :  String,
    coordinate : {
        latitude : Number,
        longitude : Number
    }
});
export let client_model= mongoose.model('clients', client_schema);