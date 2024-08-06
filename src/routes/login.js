"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.login = void 0;
const express_1 = require("express");
const login_1 = require("../controllers/login");
exports.login = (0, express_1.Router)();
exports.login.post('/', login_1.ControllAccess.access);
