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
exports.UserController = void 0;
const tsyringe_1 = require("tsyringe");
const userServices_1 = require("../services/userServices");
const security_1 = require("../services/security");
const userService = tsyringe_1.container.resolve(userServices_1.UserService);
const securityService = tsyringe_1.container.resolve(security_1.Security);
class UserController {
    // Obtener todos los usuarios
    static getAllUsers(_, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const users = yield userService.getAllUsers();
                return res.status(200).json(users);
            }
            catch (error) {
                console.error('Error fetching users:', error);
                return res.status(500).json({ message: 'Internal Server Error' });
            }
        });
    }
    // Obtener un usuario por ID
    static getUserById(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const id = parseInt(req.params.id, 10);
                const user = yield userService.findUserById(id);
                if (user) {
                    return res.status(200).json({
                        message: "User found",
                        user
                    });
                }
                else {
                    return res.status(404).json({ message: "User not found" });
                }
            }
            catch (error) {
                console.error('Error fetching user by ID:', error);
                return res.status(500).json({ message: 'Internal Server Error' });
            }
        });
    }
    // Registrar un nuevo usuario
    static newUserRegister(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const encryptedPassword = yield securityService.encryptPassword(req.body.password);
                const userCreated = yield userService.createUser(Object.assign(Object.assign({}, req.body), { password: encryptedPassword }));
                return res.status(201).json(userCreated);
            }
            catch (error) {
                console.error('Error registering new user:', error);
                return res.status(400).json({ message: 'Bad Request', error });
            }
        });
    }
    // Actualizar un usuario existente
    static userUpdated(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const id = parseInt(req.params.id, 10);
                const userUpdates = req.body;
                const updatedUser = yield userService.updateUser(userUpdates, id);
                if (updatedUser) {
                    return res.status(200).json({
                        message: "User updated",
                        updatedUser
                    });
                }
                else {
                    return res.status(404).json({ message: "User not found" });
                }
            }
            catch (error) {
                console.error('Error updating user:', error);
                return res.status(500).json({ message: 'Internal Server Error' });
            }
        });
    }
    // Eliminar un usuario
    static userDelete(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const id = parseInt(req.params.id, 10);
                const deleted = yield userService.deleteByIdService(id);
                if (deleted) {
                    return res.status(200).json({
                        message: 'User successfully deleted',
                        deleted
                    });
                }
                else {
                    return res.status(404).json({ message: "User not found" });
                }
            }
            catch (error) {
                console.error('Error deleting user:', error);
                return res.status(500).json({ message: 'Internal Server Error' });
            }
        });
    }
}
exports.UserController = UserController;
