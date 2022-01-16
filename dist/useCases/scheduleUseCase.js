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
exports.ScheduleUseCase = void 0;
const logger_1 = require("../utils/logger");
class ScheduleUseCase {
    constructor(scheduleRepository) {
        this.scheduleRepository = scheduleRepository;
    }
    findAllSchedules(id_user) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const findAll = yield this.scheduleRepository.findAllSchedules(id_user);
                return findAll;
            }
            catch (error) {
                logger_1.logger.error(`Error in ScheduleUseCase in function findAllSchedules: ${error.message}`);
            }
        });
    }
    findScheduleByDate(id_user, date) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const find = yield this.scheduleRepository.findScheduleByDate(id_user, date);
                return find;
            }
            catch (error) {
                logger_1.logger.error(`Error in ScheduleUseCase in function findScheduleByDate: ${error.message}`);
            }
        });
    }
    saveSchedule({ id_user, client, procedure, date, time, price, phone }) {
        return __awaiter(this, void 0, void 0, function* () {
            const scheduleAlreadyExists = yield this.scheduleRepository.findScheduleByTime(id_user, time);
            try {
                if (scheduleAlreadyExists.time) {
                    throw {
                        type: 'Time already exists',
                        message: 'This time already exists'
                    };
                }
                yield this.scheduleRepository.saveSchedule({ id_user, client, procedure, date, time, price, phone });
            }
            catch (error) {
                logger_1.logger.error(`Error in ScheduleUseCase in function saveSchedule: ${error.message}`);
            }
        });
    }
    updateSchedule({ id_user, id, client, procedure, date, time, price, phone }) {
        return __awaiter(this, void 0, void 0, function* () {
            const scheduleAlreadyExists = yield this.scheduleRepository.findScheduleById(id_user, id);
            try {
                if (!scheduleAlreadyExists)
                    throw {
                        type: 'Schedule already not exists',
                        message: 'This time already not exists'
                    };
                const update = yield this.scheduleRepository.updateSchedule({ id_user, id, client, procedure, date, time, price, phone });
                return update;
            }
            catch (error) {
                logger_1.logger.error(`Error in ScheduleUseCase in function updateSchedule: ${error.message}`);
            }
        });
    }
    deleteSchedule(id_user, id) {
        return __awaiter(this, void 0, void 0, function* () {
            const scheduleAlreadyExists = yield this.scheduleRepository.findScheduleById(id_user, id);
            try {
                if (!scheduleAlreadyExists)
                    throw {
                        type: 'Schedule already not exists',
                        message: 'Schedule already not exists'
                    };
                const deleteSchedule = yield this.scheduleRepository.deleteSchedule(id_user, id);
            }
            catch (error) {
                logger_1.logger.error(`Error in ScheduleUseCase in function deleteSchedule: ${error.message}`);
            }
        });
    }
}
exports.ScheduleUseCase = ScheduleUseCase;
