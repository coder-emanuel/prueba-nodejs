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
exports.ControllAccess = void 0;
const tsyringe_1 = require("tsyringe");
const security_1 = require("../services/security");
const SecurityServiceForUse = tsyringe_1.container.resolve(security_1.Security);
class ControllAccess {
    static access(req, resp) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const email = req.body.email;
                const password = req.body.password;
                const canAccess = yield SecurityServiceForUse.authorize(email, password);
                if (canAccess) {
                    const token = yield SecurityServiceForUse.generateToken(email);
                    resp.header('athorization', token).status(201).json({
                        message: "welcome login successfully your token was generated is in header",
                    });
                }
                else {
                    resp.status(500).json({
                        message: "unauthorized"
                    });
                }
            }
            catch (error) {
                console.log("desde el controlador", error);
            }
        });
    }
}
exports.ControllAccess = ControllAccess;
