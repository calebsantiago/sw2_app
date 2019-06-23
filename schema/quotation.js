"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose_1 = __importDefault(require("mongoose"));
var schema = mongoose_1.default.Schema;
var quotation_schema = new schema({
    _id: mongoose_1.default.Schema.Types.ObjectId,
    _id_client: mongoose_1.default.Schema.Types.ObjectId,
    _id_provider: mongoose_1.default.Schema.Types.ObjectId,
    service: { type: String, required: true },
    date: { type: String, required: true },
    description: { type: String, required: true },
    cost: { type: Number, required: true },
    status: { type: String, required: true },
    rate: { type: Number, required: true },
    comment: { type: String, required: true },
    image: String
});
exports.quotation_model = mongoose_1.default.model('quotations', quotation_schema);
