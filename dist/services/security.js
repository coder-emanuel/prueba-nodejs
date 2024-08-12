"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Security = void 0;
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const dotenv_1 = __importDefault(require("dotenv"));
const tsyringe_1 = require("tsyringe");
const userRepository_1 = require("../repositories/userRepository");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
dotenv_1.default.config();
let Security = class Security {
    constructor(userRepository) {
        this.userRepository = userRepository;
    }
    // Método para encriptar contraseñas
    encryptPassword(password) {
        return __awaiter(this, void 0, void 0, function* () {
            const salt = yield bcryptjs_1.default.genSalt(10); // Genera un salt aleatorio
            return yield bcryptjs_1.default.hash(password, salt); // Encripta la contraseña con el salt generado
        });
    }
    // Método para generar un token JWT
    generateToken(data) {
        return __awaiter(this, void 0, void 0, function* () {
            const secretKey = process.env.SECRET_KEY_ADMIN || "generica"; // Clave secreta desde el entorno o una clave genérica
            const token = jsonwebtoken_1.default.sign(data, secretKey, {
                expiresIn: 60 * 60 * 2, // Expira en 2 horas
            });
            return token;
        });
    }
    // Método para autorizar a un usuario comparando email y contraseña
    authorize(email, password) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                // Busca el usuario por email
                const user = yield this.userRepository.findByEmail(email);
                // Verifica si el usuario existe
                if (!user) {
                    return false;
                }
                // Compara la contraseña proporcionada con el hash almacenado
                const isMatch = yield bcryptjs_1.default.compare(password, user.password);
                return isMatch;
            }
            catch (error) {
                console.error('Error during authorization:', error);
                return false;
            }
        });
    }
};
exports.Security = Security;
exports.Security = Security = __decorate([
    (0, tsyringe_1.injectable)(),
    __param(0, (0, tsyringe_1.inject)(userRepository_1.UserRepository)),
    __metadata("design:paramtypes", [userRepository_1.UserRepository])
], Security);
