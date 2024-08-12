import { Router } from "express";
import { ProductCartController } from "../controllers/productCartController";

export const productCartRouter = Router();

// Obtener todos los carritos
productCartRouter.get('/', ProductCartController.getAllCarts);

// Obtener un carrito por ID
productCartRouter.get('/:id', ProductCartController.getCartById);

// Registrar un nuevo carrito
productCartRouter.post('/', ProductCartController.newCartRegister);

// Actualizar un carrito existente
productCartRouter.put('/:id', ProductCartController.cartUpdated);

// Eliminar un carrito
productCartRouter.delete('/:id', ProductCartController.cartDelete);




