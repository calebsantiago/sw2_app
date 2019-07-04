"use strict";
/*import mongoose from 'mongoose';
let url : string = 'mongodb+srv://caleb:Misael15@cluster0-aqv0w.mongodb.net/test?retryWrites=true';
export const connectDB = () => {
    mongoose.connect(url, {useNewUrlParser: true})
        .then(() => {
            return console.info('Successfully connected to AtlasDB')
        })
        .catch(error => {
          console.error('Error connecting to AtlasDB', error)
          return process.exit(1);
        });
    mongoose.connection.on('disconnected', connectDB)
};*/
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose_1 = __importDefault(require("mongoose"));
exports.default = (function (_a) {
    var db = _a.db;
    var connect = function () {
        mongoose_1.default.connect(db, { useNewUrlParser: true })
            .then(function () {
            return console.info('Successfully connected to AtlasDB');
        })
            .catch(function (error) {
            console.error('Error connecting to AtlasDB', error);
            return process.exit(1);
        });
    };
    connect();
    mongoose_1.default.connection.on('disconected', connect);
});
