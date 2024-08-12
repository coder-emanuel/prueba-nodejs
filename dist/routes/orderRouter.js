"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.orderRouter = void 0;
const express_1 = require("express");
const orderController_1 = require("../controllers/orderController");
exports.orderRouter = (0, express_1.Router)();
// Obtener todas las órdenes
exports.orderRouter.get('/', orderController_1.OrderController.getAllOrders);
// Obtener una orden por ID
exports.orderRouter.get('/:id', orderController_1.OrderController.getOrderById);
// Registrar una nueva orden
exports.orderRouter.post('/', orderController_1.OrderController.registerNewOrder);
// Actualizar una orden existente
exports.orderRouter.put('/:id', orderController_1.OrderController.updateOrder);
// Eliminar una orden
exports.orderRouter.delete('/:id', orderController_1.OrderController.deleteOrder);
// Obtener todos los productos por ID de orden
exports.orderRouter.get('/products/:orderId', orderController_1.OrderController.getOrdersByUserId);
