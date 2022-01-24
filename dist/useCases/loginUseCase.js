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
exports.LoginUseCase = void 0;
const logger_1 = require("../utils/logger");
class LoginUseCase {
    constructor(loginRepository) {
        this.loginRepository = loginRepository;
    }
    findLogin({ user, password }) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const login = yield this.loginRepository.findLogin({ user, password });
                return login;
            }
            catch (error) {
                logger_1.logger.error(`Error LoginUseCase: ${error.message}`);
            }
        });
    }
}
exports.LoginUseCase = LoginUseCase;
