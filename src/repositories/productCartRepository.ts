import { ProductCart } from "../models/productCartTable"; // Asegúrate de que este sea el modelo correcto
import { injectable } from 'tsyringe';

@injectable()
export class ProductCartRepository {
    // Obtener todos los carritos
    async findAll(): Promise<ProductCart[]> {
        try {
            return await ProductCart.findAll();
        } catch (error) {
            console.error('Error fetching all carts:', error);
            throw new Error('Error fetching all carts');
        }
    }

    // Encontrar un carrito por ID
    async findById(id: number): Promise<ProductCart | null> {
        try {
            return await ProductCart.findByPk(id);
        } catch (error) {
            console.error('Error finding cart by ID:', error);
            throw new Error('Error finding cart by ID');
        }
    }

    // Crear un nuevo carrito
    async createNewCart(cart: Partial<ProductCart>): Promise<ProductCart> {
        try {
            return await ProductCart.create(cart as any);
        } catch (error) {
            console.error('Error creating new cart:', error);
            throw new Error('Error creating new cart');
        }
    }

    // Actualizar un carrito por ID
    async updateCartById(cartUpdated: Partial<ProductCart>, id: number): Promise<number> {
        try {
            const [affectedCount] = await ProductCart.update(cartUpdated, {
                where: { id }
            });
            return affectedCount; // Retorna el número de filas afectadas
        } catch (error) {
            console.error('Error updating cart by ID:', error);
            throw new Error('Error updating cart by ID');
        }
    }

    // Eliminar un carrito por ID
    async deleteCartById(id: number): Promise<void> {
        try {
            await ProductCart.destroy({
                where: { id }
            });
        } catch (error) {
            console.error('Error deleting cart by ID:', error);
            throw new Error('Error deleting cart by ID');
        }
    }
}
