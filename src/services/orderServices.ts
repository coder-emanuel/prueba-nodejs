import { OrderRepository } from "../repositories/orderRepository";
import { inject, injectable } from "tsyringe";
import { Order } from "../models/orderTable";

@injectable()
export class OrderService {
    constructor(@inject(OrderRepository) private orderRepository: OrderRepository) { }

    //Crear una nueva orden
    async createOrder(order: Partial<Order>) {
        return await this.orderRepository.createNewOrder(order)
    }

    //Obtener todas las ordenes
    async getAllOrders() {
        return await this.orderRepository.finAll();
    }

    //Encontrar una orden por ID
    async findOrderById(id: number) {
        try {
            return await this.orderRepository.findById(id);
        } catch (error) {
            console.log(error);
        }
    }

    //Actualizar una orden por ID
    async updateOrder(order: Partial<Order>, id: number): Promise<Order | null> {
        try {
            // Actualiza la orden usando el repositorio
            const affectedCount: number = await this.orderRepository.updateOrderById(order, id);

            if (affectedCount === 0) {
                console.log('No se encontró la orden o no se realizaron cambios.');
                return null;
            }

            // Buscar la orden actualizada para obtener los datos actualizados
            const updatedOrder = await this.orderRepository.findById(id);
            if (updatedOrder) {
                console.log('Datos actualizados:', updatedOrder.get({ plain: true }));
            }
            return updatedOrder;
        } catch (error) {
            console.error('Error al actualizar la orden:', error);
            return null;
        }
    }

    // Eliminar una orden por ID
    async deleteOrderById(id: number): Promise<Order | string> {
        const order = await this.orderRepository.findById(id);
        if (order) {
            await this.orderRepository.deleteOrderById(id);
            return order;
        } else {
            return "Orden no encontrada, no se puede eliminar";
        }
    }

    // Obtener todas las órdenes por ID de usuario
    async getAllOrdersByUserId(userId: number): Promise<Order[] | null> {
        try {
            // Busca todas las órdenes asociadas al ID de usuario
            return await this.orderRepository.findAllByUserId(userId);
        } catch (error) {
            console.error('Error al obtener las órdenes por ID de usuario:', error);
            return null;
        }
    }
}
