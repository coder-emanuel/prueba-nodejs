import { ProductCartRepository } from "../repositories/productCartRepository";
import { inject, injectable } from "tsyringe";
import { ProductCart } from "../models/productCartTable";

@injectable()
export class ProductCartService {
    constructor(@inject(ProductCartRepository) private productCartRepository: ProductCartRepository) {}

    async getAllCarts() {
        return await this.productCartRepository.findAll();
    }

    async findCartById(id: number) {
        try {
            return await this.productCartRepository.findById(id);
        } catch (error) {
            console.log(error);
            return null;
        }
    }

    async createCart(cart: Partial<ProductCart>) {
        return await this.productCartRepository.createNewCart(cart);
    }

    async updateCart(cart: Partial<ProductCart>, id: number): Promise<ProductCart | null> {
        try {
            const affectedCount: any = await this.productCartRepository.updateCartById(cart, id);

            if (affectedCount === 0) {
                console.log('No se encontró el carrito o no se realizaron cambios.');
                return null;
            }

            // Buscar el carrito actualizado para obtener los datos actualizados
            const updatedCart = await this.productCartRepository.findById(id);
            if (updatedCart) {
                console.log('Datos actualizados:', updatedCart.get({ plain: true }));
            }
            return updatedCart;
        } catch (error) {
            console.log(error);
            return null;
        }
    }

    async deleteByIdService(id: number) {
        const wanted = await this.findCartById(id);
        if (wanted) {
            await this.productCartRepository.deleteCartById(id);
            return wanted;
        } else {
            return "Carrito no encontrado, no se puede eliminar";
        }
    }
}
