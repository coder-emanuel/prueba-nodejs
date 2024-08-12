import { Router } from "express";
import { ProductController} from "../controllers/productController"

export const productRouter = Router();

// Obtener todos los productos
productRouter.get('/', ProductController.getAllProducts);

// Obtener un producto por ID
productRouter.get('/:id', ProductController.getProductById);

// Registrar un nuevo producto
productRouter.post('/', ProductController.newProductRegister);

// Actualizar un producto existente
productRouter.put('/:id', ProductController.productUpdated);

// Actualizar el stock de un producto
productRouter.put('/:id/stock', ProductController.updateProductStock);

// Eliminar un producto
productRouter.delete('/:id', ProductController.productDelete);

// Obtener todos los productos por ID de orden
productRouter.get('/order/:orderId', ProductController.getProductsByOrderId);