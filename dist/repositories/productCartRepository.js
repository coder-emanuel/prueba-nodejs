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
exports.ProductCartRepository = void 0;
const productCartTable_1 = require("../models/productCartTable"); // Asegúrate de que este sea el modelo correcto
const tsyringe_1 = require("tsyringe");
let ProductCartRepository = class ProductCartRepository {
    // Obtener todos los carritos
    findAll() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return yield productCartTable_1.ProductCart.findAll();
            }
            catch (error) {
                console.error('Error fetching all carts:', error);
                throw new Error('Error fetching all carts');
            }
        });
    }
    // Encontrar un carrito por ID
    findById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return yield productCartTable_1.ProductCart.findByPk(id);
            }
            catch (error) {
                console.error('Error finding cart by ID:', error);
                throw new Error('Error finding cart by ID');
            }
        });
    }
    // Crear un nuevo carrito
    createNewCart(cart) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return yield productCartTable_1.ProductCart.create(cart);
            }
            catch (error) {
                console.error('Error creating new cart:', error);
                throw new Error('Error creating new cart');
            }
        });
    }
    // Actualizar un carrito por ID
    updateCartById(cartUpdated, id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const [affectedCount] = yield productCartTable_1.ProductCart.update(cartUpdated, {
                    where: { id }
                });
                return affectedCount; // Retorna el número de filas afectadas
            }
            catch (error) {
                console.error('Error updating cart by ID:', error);
                throw new Error('Error updating cart by ID');
            }
        });
    }
    // Eliminar un carrito por ID
    deleteCartById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield productCartTable_1.ProductCart.destroy({
                    where: { id }
                });
            }
            catch (error) {
                console.error('Error deleting cart by ID:', error);
                throw new Error('Error deleting cart by ID');
            }
        });
    }
};
exports.ProductCartRepository = ProductCartRepository;
exports.ProductCartRepository = ProductCartRepository = __decorate([
    (0, tsyringe_1.injectable)()
], ProductCartRepository);
