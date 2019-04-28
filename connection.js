"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose_1 = __importDefault(require("mongoose"));
var url = 'mongodb+srv://caleb:Misael15@cluster0-aqv0w.mongodb.net/test?retryWrites=true';
exports.connectDB = function () {
    mongoose_1.default.connect(url, { useNewUrlParser: true })
        .then(function () {
        return console.info('Successfully connected to AtlasDB');
    })
        .catch(function (error) {
        console.error('Error connecting to AtlasDB', error);
        return process.exit(1);
    });
    mongoose_1.default.connection.on('disconnected', exports.connectDB);
};
