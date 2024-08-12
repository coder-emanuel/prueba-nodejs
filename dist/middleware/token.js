"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.tokenValidation = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const tokenValidation = (req, res, next) => {
    try {
        const token = req.header('authorization');
        if (!token) {
            return res.status(401).json({ message: 'Access denied. No token provided.' });
        }
        // Extract token from "Bearer token" format
        const tokenWithoutBearer = token.startsWith('Bearer') ? token.slice(7) : token;
        jsonwebtoken_1.default.verify(tokenWithoutBearer, process.env.JWT_SECRET);
        next();
    }
    catch (err) {
        return res.status(401).json({ message: 'Invalid token.' });
    }
};
exports.tokenValidation = tokenValidation;
