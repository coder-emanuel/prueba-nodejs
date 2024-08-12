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
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductCartService = void 0;
const productCartRepository_1 = require("../repositories/productCartRepository");
const tsyringe_1 = require("tsyringe");
let ProductCartService = class ProductCartService {
    constructor(productCartRepository) {
        this.productCartRepository = productCartRepository;
    }
    getAllCarts() {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.productCartRepository.findAll();
        });
    }
    findCartById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return yield this.productCartRepository.findById(id);
            }
            catch (error) {
                console.log(error);
                return null;
            }
        });
    }
    createCart(cart) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.productCartRepository.createNewCart(cart);
        });
    }
    updateCart(cart, id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const affectedCount = yield this.productCartRepository.updateCartById(cart, id);
                if (affectedCount === 0) {
                    console.log('No se encontró el carrito o no se realizaron cambios.');
                    return null;
                }
                // Buscar el carrito actualizado para obtener los datos actualizados
                const updatedCart = yield this.productCartRepository.findById(id);
                if (updatedCart) {
                    console.log('Datos actualizados:', updatedCart.get({ plain: true }));
                }
                return updatedCart;
            }
            catch (error) {
                console.log(error);
                return null;
            }
        });
    }
    deleteByIdService(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const wanted = yield this.findCartById(id);
            if (wanted) {
                yield this.productCartRepository.deleteCartById(id);
                return wanted;
            }
            else {
                return "Carrito no encontrado, no se puede eliminar";
            }
        });
    }
};
exports.ProductCartService = ProductCartService;
exports.ProductCartService = ProductCartService = __decorate([
    (0, tsyringe_1.injectable)(),
    __param(0, (0, tsyringe_1.inject)(productCartRepository_1.ProductCartRepository)),
    __metadata("design:paramtypes", [productCartRepository_1.ProductCartRepository])
], ProductCartService);
