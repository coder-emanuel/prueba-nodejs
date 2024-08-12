import { Order } from "../models/orderTable";
import { User } from "../models/userTable";
import { injectable } from "tsyringe";

@injectable()
export class OrderRepository {
    // Obtener todos los productos
    async finAll(): Promise<Order[]> {
        try {
            return await Order.findAll();
        } catch (error) {
            console.error('Error fetching all products:', error);
            throw new Error('Error fetching all products');
        }
    }

    // Encontrar una orden por ID
    async findById(id: number): Promise<Order | null> {
        try {
            return await Order.findByPk(id);
        } catch (error) {
            console.error('Error finding order by ID:', error);
            throw new Error('Error finding order by ID');
        }
    }

    // Crear un nuevo producto
    async createNewOrder(order: Partial<Order>): Promise<Order> {
        try {
            return await Order.create(order as any);
        } catch (error) {
            console.error('Error creating new order:', error);
            throw new Error('Error creating new order');
        }
    }

    // Actualizar un producto por ID
    async updateOrderById(orderUpdated: Partial<Order>, id: number): Promise<number> {
        try {
            const [affectedCount] = await Order.update(orderUpdated, {
                where: { id }
            });
            return affectedCount;
        } catch (error) {
            console.error('Error updating order by ID:', error);
            throw new Error('Error updating order by ID');
        }
    }

    // Eliminar un producto por ID
    async deleteOrderById(id: number): Promise<void> {
        try {
            await Order.destroy({
                where: { id }
            });
        } catch (error) {
            console.error('Error deleting order by ID:', error);
            throw new Error('Error deleting order by ID');
        }
    }

    // Obtener todos las ordenes por ID de usuario
    async findAllByUserId(userId: number): Promise<Order[]> {
        try {
            return await Order.findAll({
                include: [{
                    model: User,
                    where: { id: userId}
                }]
            });
        } catch (error) {
            console.error('Error fetching orders by order ID:', error);
            throw new Error('Error fetching orders by order ID');
        }
    }

}




