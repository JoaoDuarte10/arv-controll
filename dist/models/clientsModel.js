"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Client = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const { Schema } = mongoose_1.default;
const clientSchema = new Schema({
    id_user: String,
    name: String,
    email: String,
    phone: String,
});
const Client = mongoose_1.default.model('Client', clientSchema);
exports.Client = Client;
