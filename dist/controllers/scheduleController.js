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
exports.ScheduleController = void 0;
class ScheduleController {
    constructor(scheduleUseCase) {
        this.scheduleUseCase = scheduleUseCase;
    }
    findAllSchedules(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id_user } = req.body;
            try {
                const schedules = yield this.scheduleUseCase.findAllSchedules(id_user);
                return res.status(200).json(schedules.sort((a, b) => parseFloat(a.time) - parseFloat(b.time)));
            }
            catch (error) {
                return res.status(200).json({
                    type: 'error',
                    message: error.message
                });
            }
        });
    }
    findScheduleByDate(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id_user, date } = req.body;
            try {
                const schedules = yield this.scheduleUseCase.findScheduleByDate(id_user, date);
                return res.status(200).json(schedules.sort((a, b) => parseFloat(a.time) - parseFloat(b.time)));
            }
            catch (error) {
                return res.status(200).json({
                    type: 'error',
                    message: error.message
                });
            }
        });
    }
    saveSchedule(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id_user, client, procedure, date, time, price, contact } = req.body;
            if (contact.replace("_", "").toString().length < 16 && contact.replace("_", "").toString().length > 1) {
                return res.status(200).json({
                    type: 'error',
                    message: 'invalids_inputs'
                });
            }
            if (!client || !procedure || !date || !time || !price) {
                return res.status(200).json({
                    type: 'error',
                    message: 'invalids_inputs'
                });
            }
            try {
                yield this.scheduleUseCase.saveSchedule({
                    id_user: id_user,
                    client: client,
                    procedure: procedure,
                    date: date,
                    time: time,
                    price: price,
                    phone: contact
                });
                return res.status(200).json({
                    type: 'success',
                    message: 'Horário cadastrado com sucesso!'
                });
            }
            catch (error) {
                return res.status(200).json({
                    type: 'error',
                    message: error.message
                });
            }
        });
    }
    updateSchedule(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id_user, id, client, procedure, date, time, price, contact } = req.body;
            if (contact.replace("_", "").toString().length < 16 && contact.replace("_", "").toString().length > 1) {
                return res.status(200).json({
                    type: 'error',
                    message: 'invalids_inputs'
                });
            }
            if (!client || !procedure || !date || !time || !price) {
                return res.status(200).json({
                    type: 'error',
                    message: 'invalids_inputs'
                });
            }
            try {
                yield this.scheduleUseCase.updateSchedule({
                    id_user: id_user,
                    id: id,
                    client: client,
                    procedure: procedure,
                    date: date,
                    time: time,
                    price: price,
                    phone: contact
                });
                return res.status(200).json({
                    type: 'success',
                    message: 'Horário atualizado com sucesso!'
                });
            }
            catch (error) {
                return res.status(200).json({
                    type: 'error',
                    message: error.message
                });
            }
        });
    }
    deleteSchedule(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id_user, id } = req.query;
            try {
                yield this.scheduleUseCase.deleteSchedule(id_user.toString(), id.toString());
                return res.status(200).json({
                    type: 'success',
                    message: 'Horário atualizado com sucesso!'
                });
            }
            catch (error) {
                return res.status(200).json({
                    type: 'error',
                    message: error.message
                });
            }
        });
    }
}
exports.ScheduleController = ScheduleController;
