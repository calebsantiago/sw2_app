"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose_1 = __importDefault(require("mongoose"));
var Schema = mongoose_1.default.Schema;
var ObjectId = mongoose_1.default.Schema.Types.ObjectId;
var ProviderSchema = new Schema({
    _id: ObjectId,
    account: {
        email: { type: String, required: true },
        password: { type: String, required: true },
        image: { type: String, required: false }
    },
    name: {
        firstname: { type: String, required: true },
        lastname: { type: String, required: true }
    },
    gender: { type: String, required: true },
    birthdate: { type: String, required: true },
    idcard: { type: Number, required: true },
    phonenumber: { type: Number, required: true },
    address: { type: String, required: true },
    coordinate: {
        latitude: { type: Number, required: true },
        longitude: { type: Number, required: true }
    },
    video: { type: String, required: true },
    description: { type: String, required: true },
    certificate: { type: String, required: false },
    service: {
        title: { type: String, required: true }
    }
});
exports.ProviderDAO = mongoose_1.default.model('providers', ProviderSchema);
