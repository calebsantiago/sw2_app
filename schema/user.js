"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose_1 = __importDefault(require("mongoose"));
var Schema = mongoose_1.default.Schema;
var user_schema = new Schema({
    name: String,
    password: String,
    email: String
});
exports.user_model = mongoose_1.default.model('users', user_schema);
