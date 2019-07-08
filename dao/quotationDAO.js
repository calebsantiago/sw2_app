"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose_1 = __importDefault(require("mongoose"));
var Schema = mongoose_1.default.Schema;
var ObjectId = mongoose_1.default.Schema.Types.ObjectId;
var QuotationSchema = new Schema({
    _id: ObjectId,
    _id_client: ObjectId,
    _id_provider: ObjectId,
    service: { type: String, required: true },
    date: { type: String, required: true },
    description: { type: String, required: true },
    cost: { type: Number, required: true },
    status: { type: String, required: true },
    rate: { type: Number, required: true },
    comment: { type: String, required: true },
    image: { type: String, required: false }
});
exports.QuotationDAO = mongoose_1.default.model('quotations', QuotationSchema);
