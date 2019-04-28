import mongoose from 'mongoose';
let Schema = mongoose.Schema;
let user_schema = new Schema ({
    name : String,
    password : String,
    email : String
});
export let user_model= mongoose.model('users', user_schema);