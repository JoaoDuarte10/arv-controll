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
exports.ClientRepositoryMongo = void 0;
const clientsModel_1 = require("../../models/clientsModel");
class ClientRepositoryMongo {
    newClient({ id_user, name, email, phone }) {
        return __awaiter(this, void 0, void 0, function* () {
            const client = new clientsModel_1.Client({
                id_user: id_user,
                name: name,
                email: email,
                phone: phone
            });
            yield client.save();
        });
    }
    updateClient({ id_user, id, name, email, phone }) {
        return __awaiter(this, void 0, void 0, function* () {
            const findClient = yield clientsModel_1.Client.findOne({ id_user: id_user, _id: id });
            const updateClient = yield findClient.updateOne({
                id_user: id_user,
                name: name,
                email: email,
                phone: phone
            });
            return updateClient;
        });
    }
    findAllClients(id_user) {
        return __awaiter(this, void 0, void 0, function* () {
            const findAll = yield clientsModel_1.Client.find({ id_user: id_user }).sort({ name: 1 });
            return findAll;
        });
    }
    findClient(id_user, id) {
        return __awaiter(this, void 0, void 0, function* () {
            const findClient = yield clientsModel_1.Client.findOne({ id_user: id_user, _id: id });
            return findClient;
        });
    }
    findByEmail(id_user, email) {
        return __awaiter(this, void 0, void 0, function* () {
            const findByEmail = yield clientsModel_1.Client.findOne({ id_user: id_user, email: email });
            return findByEmail;
        });
    }
    deleteClient(id_user, id) {
        return __awaiter(this, void 0, void 0, function* () {
            const findClient = yield clientsModel_1.Client.findOne({ id_user: id_user, _id: id });
            yield findClient.delete();
        });
    }
}
exports.ClientRepositoryMongo = ClientRepositoryMongo;
