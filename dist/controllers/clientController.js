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
exports.ClientController = void 0;
class ClientController {
    constructor(clientUseCase) {
        this.clientUseCase = clientUseCase;
    }
    newClient(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id_user, name, email, phone } = req.body;
            if (!name || !phone) {
                res.status(200).json({
                    type: 'inputs_invalids',
                    message: 'Invalids parameters'
                });
            }
            try {
                yield this.clientUseCase.newClient({ id_user, name, email, phone });
                return res.status(200).json({
                    type: 'success',
                    message: 'Cliente registrado com sucesso!'
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
    updateClient(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id_user, id, name, email, phone } = req.body;
            if (!name || !phone) {
                res.status(200).json({
                    type: 'inputs_invalids',
                    message: 'Invalids parameters'
                });
            }
            try {
                yield this.clientUseCase.updateClient({ id_user, id, name, email, phone });
                return res.status(200).json({
                    type: 'success',
                    message: 'Cliente atualizado com sucesso!'
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
    findAllClients(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id_user } = req.body;
            try {
                const findAll = yield this.clientUseCase.findAllClients(id_user);
                return res.status(200).json(findAll);
            }
            catch (error) {
                return res.status(200).json({
                    type: 'error',
                    message: error.message
                });
            }
        });
    }
    findClient(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id_user, id } = req.body;
            try {
                const findClient = yield this.clientUseCase.findClient(id_user, id);
                return res.status(200).json(findClient);
            }
            catch (error) {
                return res.status(200).json({
                    type: 'error',
                    message: error.message
                });
            }
        });
    }
    deleteClient(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id_user, id } = req.body;
            try {
                yield this.clientUseCase.deleteClient(id_user, id);
                return res.status(200).json({
                    type: 'success',
                    message: 'Cliente deletado com sucesso',
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
exports.ClientController = ClientController;
