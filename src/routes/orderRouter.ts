import { Router } from "express";
import { OrderController } from "../controllers/orderController";

export const orderRouter = Router();

// Obtener todas las órdenes
orderRouter.get('/', OrderController.getAllOrders);

// Obtener una orden por ID
orderRouter.get('/:id', OrderController.getOrderById);

// Registrar una nueva orden
orderRouter.post('/', OrderController.registerNewOrder);

// Actualizar una orden existente
orderRouter.put('/:id', OrderController.updateOrder);

// Eliminar una orden
orderRouter.delete('/:id', OrderController.deleteOrder);

// Obtener todos los productos por ID de orden
orderRouter.get('/products/:orderId', OrderController.getOrdersByUserId);
