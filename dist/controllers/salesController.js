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
exports.SalesController = void 0;
class SalesController {
    constructor(salesUseCase) {
        this.salesUseCase = salesUseCase;
    }
    saveSales(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id_user, description, client, price, date } = req.body;
            const params = [id_user, description, client, price, date].filter(item => !!item);
            if (params.length < 3) {
                res.status(200).json({
                    type: 'inputs_invalids',
                    message: 'Invalids parameters'
                });
            }
            try {
                yield this.salesUseCase.saveSales({ id_user, description, client, date, price });
                return res.status(200).json({
                    type: 'success',
                    message: 'Sale registry success!'
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
    findSalesByDate(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id_user, date } = req.body;
            if (!date) {
                res.status(200).json({
                    type: "inputs_invalids",
                    message: "Invalid date"
                });
            }
            try {
                const find = yield this.salesUseCase.findSalesByDate(id_user, date);
                return res.status(200).json(find);
            }
            catch (error) {
                return res.status(200).json({
                    type: 'error',
                    message: error.message
                });
            }
        });
    }
    findSalesByPeriod(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id_user, date1, date2 } = req.body;
            if (!date1 && !date2 || date1 === '') {
                return res.status(200).json({
                    type: "inputs_invalids",
                    message: "Invalid date"
                });
            }
            try {
                if (date1 && date2) {
                    const findDates = yield this.salesUseCase.findSalesByPeriod(id_user, date1, date2);
                    return res.status(200).json(findDates);
                }
                if (date1 && !date2) {
                    const findDate = yield this.salesUseCase.findSalesByDate(id_user, date1);
                    return res.status(200).json(findDate);
                }
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
exports.SalesController = SalesController;
