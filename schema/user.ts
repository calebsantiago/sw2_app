import mongoose from 'mongoose';
let Schema = mongoose.Schema;
let user_schema = new Schema ({
    username : String,
    password : String,
    account : String,
    name : String,
    lastname : String,
    gender : String,
    birthdate : String,
    phonenumber : Number,
    email : String,
    address :  String,
    coordinate : [Number, Number]
});
export let user_model= mongoose.model('users', user_schema);