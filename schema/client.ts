import mongoose from 'mongoose';
import bcryptjs from 'bcryptjs';
let schema = mongoose.Schema;
let client_schema = new schema ({
    _id : mongoose.Schema.Types.ObjectId,
    account : {
        email : {type: String, required: true},
        password : {type: String, required: true},
        image : String
    },
    name : {
        firstname : {type: String, required: true},
        lastname : {type: String, required: true}
    },
    gender : {type: String, required: true},
    birthdate : {type: String, required: true},
    phonenumber : {type: Number, required: true},
    address :  {type: String, required: true},
    coordinate : {
        latitude : {type: Number, required: true},
        longitude : {type: Number, required: true}
    }
});
client_schema.methods.encryptPassword = async (password : string) => {
    let salt = await bcryptjs.genSalt(10);
    let hash = bcryptjs.hash(password, salt);
    return hash;
}
client_schema.methods.matchPassword = async function (password : string) {
    return await bcryptjs.compare(password, this.account.password);
}
export let client_model : mongoose.Model<any> = mongoose.model('clients', client_schema);