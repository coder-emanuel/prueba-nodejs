import { container } from "tsyringe";
import { OrderService } from "../services/orderServices";
import { Request, Response } from "express";

const orderService = container.resolve(OrderService);

export class OrderController {
    // Obtener todas las órdenes
    static async getAllOrders(_: Request, res: Response): Promise<Response> {
        try {
            const orders = await orderService.getAllOrders();
            return res.status(200).json(orders);
        } catch (error) {
            console.error('Error fetching orders:', error);
            return res.status(500).json({ message: 'Internal Server Error' });
        }
    }

    // Obtener una orden por ID
    static async getOrderById(req: Request, res: Response): Promise<Response> {
        try {
            const id: number = parseInt(req.params.id, 10);
            const order = await orderService.findOrderById(id);
            if (order) {
                return res.status(200).json({
                    message: "Order found",
                    order
                });
            } else {
                return res.status(404).json({ message: "Order not found" });
            }
        } catch (error) {
            console.error('Error fetching order by ID:', error);
            return res.status(500).json({ message: 'Internal Server Error' });
        }
    }

    // Registrar una nueva orden
    static async registerNewOrder(req: Request, res: Response): Promise<Response> {
        try {
            const orderCreated = await orderService.createOrder(req.body);
            return res.status(201).json(orderCreated);
        } catch (error) {
            console.error('Error registering new order:', error);
            return res.status(400).json({ message: 'Bad Request', error });
        }
    }

    // Actualizar una orden existente
    static async updateOrder(req: Request, res: Response): Promise<Response> {
        try {
            const id: number = parseInt(req.params.id, 10);
            const orderUpdates = req.body;
            const updatedOrder = await orderService.updateOrder(orderUpdates, id);
            if (updatedOrder) {
                return res.status(200).json({
                    message: "Order updated",
                    updatedOrder
                });
            } else {
                return res.status(404).json({ message: "Order not found" });
            }
        } catch (error) {
            console.error('Error updating order:', error);
            return res.status(500).json({ message: 'Internal Server Error' });
        }
    }

    // Eliminar una orden
    static async deleteOrder(req: Request, res: Response): Promise<Response> {
        try {
            const id: number = parseInt(req.params.id, 10);
            const deleted = await orderService.deleteOrderById(id);
            if (deleted) {
                return res.status(200).json({
                    message: 'Order successfully deleted',
                    deleted
                });
            } else {
                return res.status(404).json({ message: "Order not found" });
            }
        } catch (error) {
            console.error('Error deleting order:', error);
            return res.status(500).json({ message: 'Internal Server Error' });
        }
    }

    // Obtener todos las ordenes por ID de user
    static async getOrdersByUserId(req: Request, res: Response): Promise<Response> {
        try {
            const userId: number = parseInt(req.params.userId, 10);
            const orders = await orderService.getAllOrdersByUserId(userId);
            return res.status(200).json(orders);
        } catch (error) {
            console.error('Error fetching orders by user ID:', error);
            return res.status(500).json({ message: 'Internal Server Error' });
        }
    }
}
