"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ScheduleRepositoryMongoDB = void 0;
const scheduleModels_1 = require("../../models/scheduleModels");
class ScheduleRepositoryMongoDB {
    findScheduleByTime(id_user, time) {
        return __awaiter(this, void 0, void 0, function* () {
            const find = yield scheduleModels_1.Schedule.find({ id_user: id_user, time: time });
            return find;
        });
    }
    findScheduleById(id_user, id) {
        return __awaiter(this, void 0, void 0, function* () {
            const find = yield scheduleModels_1.Schedule.findOne({ id_user: id_user, _id: id });
            return find;
        });
    }
    findAllSchedules(id_user) {
        return __awaiter(this, void 0, void 0, function* () {
            const find = yield scheduleModels_1.Schedule.find({ id_user: id_user });
            return find;
        });
    }
    findScheduleByDate(id_user, date) {
        return __awaiter(this, void 0, void 0, function* () {
            const find = yield scheduleModels_1.Schedule.find({ id_user: id_user, date: date });
            return find;
        });
    }
    saveSchedule({ id_user, client, procedure, date, time, price, phone }) {
        return __awaiter(this, void 0, void 0, function* () {
            const schedule = new scheduleModels_1.Schedule({
                id_user: id_user,
                client: client,
                procedure: procedure,
                date: date,
                time: time,
                price: price,
                phone: phone
            });
            try {
                yield schedule.save();
                return true;
            }
            catch (err) {
                return false;
            }
        });
    }
    updateSchedule({ id_user, id, client, procedure, date, time, price, phone }) {
        return __awaiter(this, void 0, void 0, function* () {
            const findSchedule = yield scheduleModels_1.Schedule.findOne({ id_user: id_user, _id: id });
            try {
                const update = yield findSchedule.updateOne({
                    client: client,
                    procedure: procedure,
                    date: date,
                    time: time,
                    price: price,
                    phone: phone
                });
                return update;
            }
            catch (err) {
                return err.message;
            }
        });
    }
    deleteSchedule(id_user, id) {
        return __awaiter(this, void 0, void 0, function* () {
            const findSchedule = yield scheduleModels_1.Schedule.findOne({ id_user: id_user, _id: id });
            try {
                yield findSchedule.deleteOne({ _id: id });
                return true;
            }
            catch (err) {
                return false;
            }
        });
    }
}
exports.ScheduleRepositoryMongoDB = ScheduleRepositoryMongoDB;
