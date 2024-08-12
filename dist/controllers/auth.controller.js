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
exports.AuthController = void 0;
const tsyringe_1 = require("tsyringe");
const security_1 = require("../services/security");
const userServices_1 = require("../services/userServices");
const handleError_1 = require("../utils/handleError");
const SecurityServiceForUse = tsyringe_1.container.resolve(security_1.Security);
class AuthController {
    static registerUser(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { email, password, roleId } = req.body;
                // Verificar que todos los campos requeridos estén presentes
                if (!email || !password || !roleId) {
                    console.warn('Registration attempt with missing data');
                    return res.status(400).json({ status: 400, message: 'Email, password, and roleId are required.' });
                }
                const userService = tsyringe_1.container.resolve(userServices_1.UserService);
                const createdUser = yield userService.createUser({ email, password, roleId });
                console.info(`User registered: ${email}`);
                res.status(201).json({ status: 201, message: createdUser });
            }
            catch (error) {
                // Asegúrate de que 'error' es un objeto Error
                const errorMessage = error instanceof Error ? error.message : 'Unknown error';
                console.error(`Error in AuthController.registerUser: ${errorMessage}`);
                (0, handleError_1.handleError)(res, req, error);
            }
        });
    }
    static loginUser(req, resp) {
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
exports.AuthController = AuthController;
