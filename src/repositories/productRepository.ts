import { Product } from "../models/productTable";
import { Order } from "../models/orderTable";
import { injectable } from "tsyringe";

@injectable()
export class ProductRepository {
    // Obtener todos los productos
    async findAll(): Promise<Product[]> {
        try {
            return await Product.findAll();
        } catch (error) {
            console.error('Error fetching all products:', error);
            throw new Error('Error fetching all products');
        }
    }

    // Encontrar un producto por ID
    async findById(id: number): Promise<Product | null> {
        try {
            return await Product.findByPk(id);
        } catch (error) {
            console.error('Error finding product by ID:', error);
            throw new Error('Error finding product by ID');
        }
    }

    // Crear un nuevo producto
    async createNewProduct(product: Partial<Product>): Promise<Product> {
        try {
            return await Product.create(product as any);
        } catch (error) {
            console.error('Error creating new product:', error);
            throw new Error('Error creating new product');
        }
    }

    // Actualizar un producto por ID
    async updateProductById(productUpdated: Partial<Product>, id: number): Promise<number> {
        try {
            const [affectedCount] = await Product.update(productUpdated, {
                where: { id }
            });
            return affectedCount;
        } catch (error) {
            console.error('Error updating product by ID:', error);
            throw new Error('Error updating product by ID');
        }
    }

    // Actualizar el stock de un producto por ID
    async updateProductStockById(id: number, stock: number): Promise<number> {
        try {
            const [affectedCount] = await Product.update({ stock }, {
                where: { id }
            });
            return affectedCount; // Retorna el número de filas afectadas
        } catch (error) {
            console.error('Error updating product stock by ID:', error);
            throw new Error('Error updating product stock by ID');
        }
    }

    // Eliminar un producto por ID
    async deleteProductById(id: number): Promise<void> {
        try {
            await Product.destroy({
                where: { id }
            });
        } catch (error) {
            console.error('Error deleting product by ID:', error);
            throw new Error('Error deleting product by ID');
        }
    }

    // Obtener todos los productos por ID de orden
    async findAllByOrderId(orderId: number): Promise<Product[]> {
        try {
            return await Product.findAll({
                include: [{
                    model: Order,
                    where: { id: orderId }
                }]
            });
        } catch (error) {
            console.error('Error fetching products by order ID:', error);
            throw new Error('Error fetching products by order ID');
        }
    }
}
