"use strict";
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
exports.ProductCartController = void 0;
const tsyringe_1 = require("tsyringe");
const productCartService_1 = require("../services/productCartService");
const productCartService = tsyringe_1.container.resolve(productCartService_1.ProductCartService);
class ProductCartController {
    // Obtener todos los carritos
    static getAllCarts(_, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const carts = yield productCartService.getAllCarts();
                return res.status(200).json(carts);
            }
            catch (error) {
                console.error('Error fetching carts:', error);
                return res.status(500).json({ message: 'Internal Server Error' });
            }
        });
    }
    // Obtener un carrito por ID
    static getCartById(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const id = parseInt(req.params.id, 10);
                const cart = yield productCartService.findCartById(id);
                if (cart) {
                    return res.status(200).json({
                        message: "Cart found",
                        cart
                    });
                }
                else {
                    return res.status(404).json({ message: "Cart not found" });
                }
            }
            catch (error) {
                console.error('Error fetching cart by ID:', error);
                return res.status(500).json({ message: 'Internal Server Error' });
            }
        });
    }
    // Registrar un nuevo carrito
    static newCartRegister(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const cartCreated = yield productCartService.createCart(req.body);
                return res.status(201).json(cartCreated);
            }
            catch (error) {
                console.error('Error registering new cart:', error);
                return res.status(400).json({ message: 'Bad Request', error });
            }
        });
    }
    // Actualizar un carrito existente
    static cartUpdated(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const id = parseInt(req.params.id, 10);
                const cartUpdates = req.body;
                const updatedCart = yield productCartService.updateCart(cartUpdates, id);
                if (updatedCart) {
                    return res.status(200).json({
                        message: "Cart updated",
                        updatedCart
                    });
                }
                else {
                    return res.status(404).json({ message: "Cart not found" });
                }
            }
            catch (error) {
                console.error('Error updating cart:', error);
                return res.status(500).json({ message: 'Internal Server Error' });
            }
        });
    }
    // Eliminar un carrito
    static cartDelete(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const id = parseInt(req.params.id, 10);
                const deleted = yield productCartService.deleteByIdService(id);
                if (deleted) {
                    return res.status(200).json({
                        message: 'Cart successfully deleted',
                        deleted
                    });
                }
                else {
                    return res.status(404).json({ message: "Cart not found" });
                }
            }
            catch (error) {
                console.error('Error deleting cart:', error);
                return res.status(500).json({ message: 'Internal Server Error' });
            }
        });
    }
}
exports.ProductCartController = ProductCartController;
