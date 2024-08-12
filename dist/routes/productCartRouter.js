"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.productCartRouter = void 0;
const express_1 = require("express");
const productCartController_1 = require("../controllers/productCartController");
exports.productCartRouter = (0, express_1.Router)();
// Obtener todos los carritos
exports.productCartRouter.get('/', productCartController_1.ProductCartController.getAllCarts);
// Obtener un carrito por ID
exports.productCartRouter.get('/:id', productCartController_1.ProductCartController.getCartById);
// Registrar un nuevo carrito
exports.productCartRouter.post('/', productCartController_1.ProductCartController.newCartRegister);
// Actualizar un carrito existente
exports.productCartRouter.put('/:id', productCartController_1.ProductCartController.cartUpdated);
// Eliminar un carrito
exports.productCartRouter.delete('/:id', productCartController_1.ProductCartController.cartDelete);
