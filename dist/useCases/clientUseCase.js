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
exports.ClientUseCase = void 0;
const logger_1 = require("../utils/logger");
class ClientUseCase {
    constructor(clientRepository) {
        this.clientRepository = clientRepository;
    }
    newClient({ id_user, name, email, phone }) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const findClient = yield this.clientRepository.findByEmail(id_user, email);
                if (findClient)
                    throw {
                        type: "Client already exists",
                        message: "Client does exist"
                    };
                yield this.clientRepository.newClient({ id_user, name, email, phone });
            }
            catch (error) {
                logger_1.logger.error(`Error in ClientUseCase in function newClient: ${error.message}`);
            }
        });
    }
    updateClient({ id_user, id, name, email, phone }) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const findClient = yield this.clientRepository.findClient(id_user, id);
                if (!findClient)
                    throw {
                        type: "Client already not exists",
                        message: "Client does not exist"
                    };
                const updateClient = yield this.clientRepository.updateClient({ id_user, id, name, email, phone });
                return updateClient;
            }
            catch (error) {
                logger_1.logger.error(`Error in ClientUseCase in function updateClient: ${error.message}`);
            }
        });
    }
    findAllClients(id_user) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const allClients = yield this.clientRepository.findAllClients(id_user);
                return allClients;
            }
            catch (error) {
                logger_1.logger.error(`Error in ClientUseCase in function findAllClients: ${error.message}`);
            }
        });
    }
    findClient(id_user, id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const findClient = yield this.clientRepository.findClient(id_user, id);
                return findClient;
            }
            catch (error) {
                logger_1.logger.error(`Error in ClientUseCase in function findClient: ${error.message}`);
            }
        });
    }
    deleteClient(id_user, id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const findClient = yield this.clientRepository.findClient(id_user, id);
                if (!findClient)
                    throw {
                        type: "Client already not exists",
                        message: "Client does not exist"
                    };
                const deleteClient = yield this.clientRepository.deleteClient(id_user, id);
            }
            catch (error) {
                logger_1.logger.error(`Error in ClientUseCase in function deleteClient: ${error.message}`);
            }
        });
    }
}
exports.ClientUseCase = ClientUseCase;
