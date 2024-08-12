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
exports.OrderController = void 0;
const tsyringe_1 = require("tsyringe");
const orderServices_1 = require("../services/orderServices");
const orderService = tsyringe_1.container.resolve(orderServices_1.OrderService);
class OrderController {
    // Obtener todas las órdenes
    static getAllOrders(_, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const orders = yield orderService.getAllOrders();
                return res.status(200).json(orders);
            }
            catch (error) {
                console.error('Error fetching orders:', error);
                return res.status(500).json({ message: 'Internal Server Error' });
            }
        });
    }
    // Obtener una orden por ID
    static getOrderById(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const id = parseInt(req.params.id, 10);
                const order = yield orderService.findOrderById(id);
                if (order) {
                    return res.status(200).json({
                        message: "Order found",
                        order
                    });
                }
                else {
                    return res.status(404).json({ message: "Order not found" });
                }
            }
            catch (error) {
                console.error('Error fetching order by ID:', error);
                return res.status(500).json({ message: 'Internal Server Error' });
            }
        });
    }
    // Registrar una nueva orden
    static registerNewOrder(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const orderCreated = yield orderService.createOrder(req.body);
                return res.status(201).json(orderCreated);
            }
            catch (error) {
                console.error('Error registering new order:', error);
                return res.status(400).json({ message: 'Bad Request', error });
            }
        });
    }
    // Actualizar una orden existente
    static updateOrder(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const id = parseInt(req.params.id, 10);
                const orderUpdates = req.body;
                const updatedOrder = yield orderService.updateOrder(orderUpdates, id);
                if (updatedOrder) {
                    return res.status(200).json({
                        message: "Order updated",
                        updatedOrder
                    });
                }
                else {
                    return res.status(404).json({ message: "Order not found" });
                }
            }
            catch (error) {
                console.error('Error updating order:', error);
                return res.status(500).json({ message: 'Internal Server Error' });
            }
        });
    }
    // Eliminar una orden
    static deleteOrder(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const id = parseInt(req.params.id, 10);
                const deleted = yield orderService.deleteOrderById(id);
                if (deleted) {
                    return res.status(200).json({
                        message: 'Order successfully deleted',
                        deleted
                    });
                }
                else {
                    return res.status(404).json({ message: "Order not found" });
                }
            }
            catch (error) {
                console.error('Error deleting order:', error);
                return res.status(500).json({ message: 'Internal Server Error' });
            }
        });
    }
    // Obtener todos las ordenes por ID de user
    static getOrdersByUserId(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const userId = parseInt(req.params.userId, 10);
                const orders = yield orderService.getAllOrdersByUserId(userId);
                return res.status(200).json(orders);
            }
            catch (error) {
                console.error('Error fetching orders by user ID:', error);
                return res.status(500).json({ message: 'Internal Server Error' });
            }
        });
    }
}
exports.OrderController = OrderController;
