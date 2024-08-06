"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
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
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserRepository = void 0;
const userTable_1 = require("../models/userTable"); // Asegúrate de que este sea el modelo correcto
const tsyringe_1 = require("tsyringe");
let UserRepository = class UserRepository {
    // Obtener todos los usuarios
    findAll() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return yield userTable_1.User.findAll();
            }
            catch (error) {
                console.error('Error fetching all users:', error);
                throw new Error('Error fetching all users');
            }
        });
    }
    // Encontrar un usuario por correo electrónico
    findByEmail(email) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return yield userTable_1.User.findOne({
                    where: { email }
                });
            }
            catch (error) {
                console.error('Error finding user by email:', error);
                throw new Error('Error finding user by email');
            }
        });
    }
    // Encontrar un usuario por ID
    findById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return yield userTable_1.User.findByPk(id);
            }
            catch (error) {
                console.error('Error finding user by ID:', error);
                throw new Error('Error finding user by ID');
            }
        });
    }
    // Crear un nuevo usuario
    createNewUser(user) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return yield userTable_1.User.create(user);
            }
            catch (error) {
                console.error('Error creating new user:', error);
                throw new Error('Error creating new user');
            }
        });
    }
    // Actualizar un usuario por ID
    updateUserById(userUpdated, id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const [affectedCount] = yield userTable_1.User.update(userUpdated, {
                    where: { id }
                });
                return affectedCount; // Retorna el número de filas afectadas
            }
            catch (error) {
                console.error('Error updating user by ID:', error);
                throw new Error('Error updating user by ID');
            }
        });
    }
    // Eliminar un usuario por ID
    deleteUserById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield userTable_1.User.destroy({
                    where: { id }
                });
            }
            catch (error) {
                console.error('Error deleting user by ID:', error);
                throw new Error('Error deleting user by ID');
            }
        });
    }
};
exports.UserRepository = UserRepository;
exports.UserRepository = UserRepository = __decorate([
    (0, tsyringe_1.injectable)()
], UserRepository);
