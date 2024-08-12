"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.router = void 0;
const express_1 = require("express");
const userRouter_1 = require("./userRouter");
const productRouter_1 = require("./productRouter");
const orderRouter_1 = require("./orderRouter");
const productCartRouter_1 = require("./productCartRouter");
const authRouter_1 = require("./authRouter");
exports.router = (0, express_1.Router)();
// Rutas para la gestión de usuarios
exports.router.use('/users', userRouter_1.userRouter);
// Rutas para la gestión de productos
exports.router.use('/products', productRouter_1.productRouter);
// Rutas para la gestión de órdenes
exports.router.use('/orders', orderRouter_1.orderRouter);
// Rutas para la gestión de productos carros
exports.router.use('/productCarts', productCartRouter_1.productCartRouter);
// Rutas para autenticación y autorización
exports.router.use('/auth', authRouter_1.authRouter);
