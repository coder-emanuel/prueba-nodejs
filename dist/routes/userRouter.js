"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.userRouter = void 0;
const express_1 = require("express");
const userController_1 = require("../controllers/userController");
exports.userRouter = (0, express_1.Router)();
// Obtener todos los usuarios
exports.userRouter.get('/', userController_1.UserController.getAllUsers);
// Obtener un usuario por ID
exports.userRouter.get('/:id', userController_1.UserController.getUserById);
// Registrar un nuevo usuario
exports.userRouter.post('/', userController_1.UserController.newUserRegister);
// Actualizar un usuario existente
exports.userRouter.put('/:id', userController_1.UserController.userUpdated);
// Eliminar un usuario
exports.userRouter.delete('/:id', userController_1.UserController.userDelete);
