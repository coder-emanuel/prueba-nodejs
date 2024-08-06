"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const userServices_1 = require("../services/userServices");
const tsyringe_1 = require("tsyringe");
const userRepository_1 = require("../repositories/userRepository");
tsyringe_1.container.registerSingleton(userRepository_1.UserRepository);
tsyringe_1.container.registerSingleton(userServices_1.UserService);
