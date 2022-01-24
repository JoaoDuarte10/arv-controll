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
exports.SalesUseCase = void 0;
const logger_1 = require("../utils/logger");
class SalesUseCase {
    constructor(salesRepository) {
        this.salesRepository = salesRepository;
    }
    saveSales({ id_user, description, client, date, price }) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield this.salesRepository.saveSales({ id_user, description, client, date, price });
            }
            catch (error) {
                logger_1.logger.error(`Error SalesUseCase function saveSales: ${error.message}`);
            }
        });
    }
    findSalesByDate(id_user, date) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const find = yield this.salesRepository.findSaleByDate(id_user, date);
                return find;
            }
            catch (error) {
                logger_1.logger.error(`Error SalesUseCase function findSalesByDate: ${error.message}`);
            }
        });
    }
    findSalesByPeriod(id_user, date1, date2) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const find = yield this.salesRepository.findSaleByPeriod(id_user, date1, date2);
                return find;
            }
            catch (error) {
                logger_1.logger.error(`Error SalesUseCase function findSalesByPeriod: ${error.message}`);
            }
        });
    }
}
exports.SalesUseCase = SalesUseCase;
