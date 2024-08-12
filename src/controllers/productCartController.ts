import { container } from "tsyringe";
import { ProductCartService } from "../services/productCartService";
import { Request, Response } from "express";

const productCartService = container.resolve(ProductCartService);

export class ProductCartController {
    // Obtener todos los carritos
    static async getAllCarts(_: Request, res: Response): Promise<Response> {
        try {
            const carts = await productCartService.getAllCarts();
            return res.status(200).json(carts);
        } catch (error) {
            console.error('Error fetching carts:', error);
            return res.status(500).json({ message: 'Internal Server Error' });
        }
    }

    // Obtener un carrito por ID
    static async getCartById(req: Request, res: Response): Promise<Response> {
        try {
            const id: number = parseInt(req.params.id, 10);
            const cart = await productCartService.findCartById(id);
            if (cart) {
                return res.status(200).json({
                    message: "Cart found",
                    cart
                });
            } else {
                return res.status(404).json({ message: "Cart not found" });
            }
        } catch (error) {
            console.error('Error fetching cart by ID:', error);
            return res.status(500).json({ message: 'Internal Server Error' });
        }
    }

    // Registrar un nuevo carrito
    static async newCartRegister(req: Request, res: Response): Promise<Response> {
        try {
            const cartCreated = await productCartService.createCart(req.body);
            return res.status(201).json(cartCreated);
        } catch (error) {
            console.error('Error registering new cart:', error);
            return res.status(400).json({ message: 'Bad Request', error });
        }
    }

    // Actualizar un carrito existente
    static async cartUpdated(req: Request, res: Response): Promise<Response> {
        try {
            const id: number = parseInt(req.params.id, 10);
            const cartUpdates = req.body;
            const updatedCart = await productCartService.updateCart(cartUpdates, id);
            if (updatedCart) {
                return res.status(200).json({
                    message: "Cart updated",
                    updatedCart
                });
            } else {
                return res.status(404).json({ message: "Cart not found" });
            }
        } catch (error) {
            console.error('Error updating cart:', error);
            return res.status(500).json({ message: 'Internal Server Error' });
        }
    }

    // Eliminar un carrito
    static async cartDelete(req: Request, res: Response): Promise<Response> {
        try {
            const id: number = parseInt(req.params.id, 10);
            const deleted = await productCartService.deleteByIdService(id);
            if (deleted) {
                return res.status(200).json({
                    message: 'Cart successfully deleted',
                    deleted
                });
            } else {
                return res.status(404).json({ message: "Cart not found" });
            }
        } catch (error) {
            console.error('Error deleting cart:', error);
            return res.status(500).json({ message: 'Internal Server Error' });
        }
    }
}
