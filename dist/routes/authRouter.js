"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.authRouter = void 0;
const express_1 = require("express");
const auth_controller_1 = require("../controllers/auth.controller");
exports.authRouter = (0, express_1.Router)();
exports.authRouter.post('/', auth_controller_1.AuthController.registerUser);
exports.authRouter.post('/', auth_controller_1.AuthController.loginUser);
