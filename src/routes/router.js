"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.router = void 0;
const express_1 = require("express");
const userRouter_1 = require("./userRouter");
// import { productRouter } from './productRouter';
// import { cartRouter } from './cartRouter';
// import { orderRouter } from './orderRouter';
// import { login } from './login';
exports.router = (0, express_1.Router)();
// Rutas para la gestión de usuarios
exports.router.use('/users', userRouter_1.userRouter);
// // Rutas para la gestión de productos
// router.use('/products', productRouter);
// // Rutas para la gestión de carritos de compras
// router.use('/carts', cartRouter);
// // Rutas para la gestión de órdenes
// router.use('/orders', orderRouter);
// // Rutas para autenticación y autorización
// router.use('/auth', login);
