import { container } from "tsyringe";
import { ProductService } from "../services/productServices";
import { Request, Response } from "express";

const productService = container.resolve(ProductService);

export class ProductController {
    // Obtener todos los productos
    static async getAllProducts(_: Request, res: Response): Promise<Response> {
        try {
            const products = await productService.getAllProducts();
            return res.status(200).json(products);
        } catch (error) {
            console.error('Error fetching products:', error);
            return res.status(500).json({ message: 'Internal Server Error' });
        }
    }

    // Obtener un producto por ID
    static async getProductById(req: Request, res: Response): Promise<Response> {
        try {
            const id: number = parseInt(req.params.id, 10);
            const product = await productService.findProductById(id);
            if (product) {
                return res.status(200).json({
                    message: "Product found",
                    product
                });
            } else {
                return res.status(404).json({ message: "Product not found" });
            }
        } catch (error) {
            console.error('Error fetching product by ID:', error);
            return res.status(500).json({ message: 'Internal Server Error' });
        }
    }

    // Registrar un nuevo producto
    static async newProductRegister(req: Request, res: Response): Promise<Response> {
        try {
            const productCreated = await productService.createProduct(req.body);
            return res.status(201).json(productCreated);
        } catch (error) {
            console.error('Error registering new product:', error);
            return res.status(400).json({ message: 'Bad Request', error });
        }
    }

    // Actualizar un producto existente
    static async productUpdated(req: Request, res: Response): Promise<Response> {
        try {
            const id: number = parseInt(req.params.id, 10);
            const productUpdates = req.body;
            const updatedProduct = await productService.updateProduct(productUpdates, id);
            if (updatedProduct) {
                return res.status(200).json({
                    message: "Product updated",
                    updatedProduct
                });
            } else {
                return res.status(404).json({ message: "Product not found" });
            }
        } catch (error) {
            console.error('Error updating product:', error);
            return res.status(500).json({ message: 'Internal Server Error' });
        }
    }

    // Actualizar el stock de un producto
    static async updateProductStock(req: Request, res: Response): Promise<Response> {
        try {
            const id: number = parseInt(req.params.id, 10);
            const { stock } = req.body;
            const updatedProduct = await productService.updateProductStock(id, stock);
            if (updatedProduct) {
                return res.status(200).json({
                    message: "Product stock updated",
                    updatedProduct
                });
            } else {
                return res.status(404).json({ message: "Product not found" });
            }
        } catch (error) {
            console.error('Error updating product stock:', error);
            return res.status(500).json({ message: 'Internal Server Error' });
        }
    }

    // Eliminar un producto
    static async productDelete(req: Request, res: Response): Promise<Response> {
        try {
            const id: number = parseInt(req.params.id, 10);
            const deleted = await productService.deleteProductById(id);
            if (deleted) {
                return res.status(200).json({
                    message: 'Product successfully deleted',
                    deleted
                });
            } else {
                return res.status(404).json({ message: "Product not found" });
            }
        } catch (error) {
            console.error('Error deleting product:', error);
            return res.status(500).json({ message: 'Internal Server Error' });
        }
    }

    // Obtener todos los productos por ID de orden
    static async getProductsByOrderId(req: Request, res: Response): Promise<Response> {
        try {
            const orderId: number = parseInt(req.params.orderId, 10);
            const products = await productService.getAllProductsByOrderId(orderId);
            return res.status(200).json(products);
        } catch (error) {
            console.error('Error fetching products by order ID:', error);
            return res.status(500).json({ message: 'Internal Server Error' });
        }
    }
}
