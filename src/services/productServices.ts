import { ProductRepository } from "../repositories/productRepository";
import { inject,injectable } from "tsyringe";
import { Product } from "../models/productTable";

@injectable()
export class ProductService {
    constructor(@inject(ProductRepository) private productRepository: ProductRepository) {}

    // Crear un nuevo producto
    async createProduct(product: Partial<Product>) {
        return await this.productRepository.createNewProduct(product);
    }

    // Obtener todos los productos
    async getAllProducts() {
        return await this.productRepository.findAll();
    }

      // Encontrar un producto por ID
      async findProductById(id: number) {
        try {
            return await this.productRepository.findById(id);
        } catch (error) {
            console.log(error);
        }
    }

    // Actualizar un producto por ID
    async updateProduct(product: Partial<Product>, id: number): Promise<Product | null> {
        try {
            const affectedCount: any = await this.productRepository.updateProductById(product, id);

            if (affectedCount === 0) {
                console.log('No se encontró el producto o no se realizaron cambios.');
                return null;
            }

            // Buscar el producto actualizado para obtener los datos actualizados
            const updatedProduct = await this.productRepository.findById(id);
            if (updatedProduct) {
                console.log('Datos actualizados:', updatedProduct.get({ plain: true }));
            }
            return updatedProduct;
        } catch (error) {
            console.log(error);
            return null;
        }
    }

    // Actualizar el stock de un producto por ID
    async updateProductStock(id: number, stock: number): Promise<Product | null> {
        try {
            const affectedCount: any = await this.productRepository.updateProductStockById(id, stock);

            if (affectedCount === 0) {
                console.log('No se encontró el producto o no se realizaron cambios.');
                return null;
            }

            // Buscar el producto actualizado para obtener los datos actualizados
            const updatedProduct = await this.productRepository.findById(id);
            if (updatedProduct) {
                console.log('Stock actualizado:', updatedProduct.get({ plain: true }));
            }
            return updatedProduct;
        } catch (error) {
            console.log(error);
            return null;
        }
    }

    // Eliminar un producto por ID
    async deleteProductById(id: number) {
        const product = await this.findProductById(id);
        if (product) {
            await this.productRepository.deleteProductById(id);
            return product;
        } else {
            return "Producto no encontrado, no se puede eliminar";
        }
    }

    // Obtener todos los productos por ID de orden
    async getAllProductsByOrderId(orderId: number): Promise<Product[] | null> {
        try {
            return await this.productRepository.findAllByOrderId(orderId);
        } catch (error) {
            console.log('Error al obtener productos por ID de orden:', error);
            return null
        }
    }
}