import mongoose from 'mongoose'
let Schema = mongoose.Schema
let ObjectId = mongoose.Schema.Types.ObjectId
export interface Provider extends mongoose.Document {
    _id : String,
    account : {
        email : String,
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
    address : String,
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
}
const ProviderSchema = new Schema ({
    _id : ObjectId,
    account : {
        email : {type : String, required : true},
        password : {type : String, required : true},
        image : {type : String, required : false}
    },
    name : {
        firstname : {type : String, required : true},
        lastname : {type : String, required : true}
    },
    gender : {type : String, required : true},
    birthdate : {type : String, required : true},
    idcard : {type : Number, required : true},
    phonenumber : {type : Number, required : true},
    address :  {type : String, required : true},
    coordinate : {
        latitude : {type : Number, required : true},
        longitude : {type : Number, required : true}
    },
    video : {type: String, required: true},
    description : {type : String, required : true},
    certificate : {type : String, required : false},
    service : {
        title : {type : String, required : true}
    }
})
export const ProviderDAO : mongoose.Model<Provider> = mongoose.model('providers', ProviderSchema)