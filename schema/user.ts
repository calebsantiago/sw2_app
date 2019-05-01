import mongoose from 'mongoose';
let Schema = mongoose.Schema;
let user_schema = new Schema ({
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
export let user_model= mongoose.model('users', user_schema);