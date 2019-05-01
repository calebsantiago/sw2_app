"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose_1 = __importDefault(require("mongoose"));
var Schema = mongoose_1.default.Schema;
var client_schema = new Schema({
    _id: mongoose_1.default.Schema.Types.ObjectId,
    account: {
        username: String,
        password: String,
        image: String
    },
    name: {
        firstname: String,
        lastname: String
    },
    gender: String,
    birthdate: String,
    phonenumber: Number,
    email: String,
    address: String,
    coordinate: {
        latitude: Number,
        longitude: Number
    }
});
exports.client_model = mongoose_1.default.model('clients', client_schema);
