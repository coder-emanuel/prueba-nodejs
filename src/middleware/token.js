"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.tokenValidation = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config;
const tokenValidation = (req, res, next) => {
    const token = req.header('authorization');
    if (!token)
        return res.status(500).json('access denied');
    jsonwebtoken_1.default.verify(token, `${process.env.SECRET_KEY_ADMIN}`);
    next();
};
exports.tokenValidation = tokenValidation;
