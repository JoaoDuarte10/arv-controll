"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Schedule = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const { Schema } = mongoose_1.default;
const scheduleSchema = new Schema({
    id_user: String,
    client: String,
    procedure: String,
    date: String,
    time: String,
    price: String,
    phone: String
});
const Schedule = mongoose_1.default.model('Schedule', scheduleSchema);
exports.Schedule = Schedule;
