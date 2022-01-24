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
exports.SalesRepositoryMongoDB = void 0;
const salesModels_1 = require("../../models/salesModels");
class SalesRepositoryMongoDB {
    saveSales({ id_user, description, client, price, date }) {
        return __awaiter(this, void 0, void 0, function* () {
            const sales = new salesModels_1.Sales({
                id_user: id_user,
                description: description,
                client: client,
                price: price,
                date: date
            });
            yield sales.save();
        });
    }
    findSaleByDate(id_user, date) {
        return __awaiter(this, void 0, void 0, function* () {
            const find = yield salesModels_1.Sales.find({ id_user: id_user, date: date }).sort({ date: 1 });
            return find;
        });
    }
    findSaleByPeriod(id_user, date1, date2) {
        return __awaiter(this, void 0, void 0, function* () {
            const find = yield salesModels_1.Sales.find({ id_user: id_user, date: { $gte: date1, $lte: date2 } }).sort({ date: 1 });
            return find;
        });
    }
}
exports.SalesRepositoryMongoDB = SalesRepositoryMongoDB;
