import mongoose from 'mongoose';
let Schema = mongoose.Schema;
let provider_schema = new Schema ({
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
    idcard : Number,
    phonenumber : Number,
    email : String,
    address :  String,
    coordinate : {
        latitude : Number,
        longitude : Number
    },
    video : String,
    description : String,
    certificate : String,
    service : {
        title : String
    }
});
export let provider_model= mongoose.model('providers', provider_schema);