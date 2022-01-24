"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Sales = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const { Schema } = mongoose_1.default;
const salesSchema = new Schema({
    id_user: String,
    description: String,
    client: String,
    date: String,
    price: String,
});
const Sales = mongoose_1.default.model('Sales', salesSchema);
exports.Sales = Sales;
