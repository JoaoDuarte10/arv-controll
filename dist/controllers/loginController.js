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
exports.LoginController = void 0;
class LoginController {
    constructor(loginUseCase) {
        this.loginUseCase = loginUseCase;
    }
    findLogin(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            let { user, password } = req.body;
            user = user.replace(" ", "");
            if (!user || !password) {
                return res.status(200).json({
                    type: "inputs_invalids",
                    message: "Invalid date"
                });
            }
            try {
                const userLogin = yield this.loginUseCase.findLogin({ user, password });
                if (!userLogin) {
                    return res.status(200).json({
                        type: 'unauthorized',
                        message: 'Invalid user or password'
                    });
                }
                if (user === userLogin.user && password === userLogin.password) {
                    return res.status(200).json({
                        type: 'success',
                        user: userLogin.user,
                        user_id: userLogin._id
                    });
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
exports.LoginController = LoginController;
