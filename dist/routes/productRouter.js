"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.productRouter = void 0;
const express_1 = require("express");
const productController_1 = require("../controllers/productController");
exports.productRouter = (0, express_1.Router)();
// Obtener todos los productos
exports.productRouter.get('/', productController_1.ProductController.getAllProducts);
// Obtener un producto por ID
exports.productRouter.get('/:id', productController_1.ProductController.getProductById);
// Registrar un nuevo producto
exports.productRouter.post('/', productController_1.ProductController.newProductRegister);
// Actualizar un producto existente
exports.productRouter.put('/:id', productController_1.ProductController.productUpdated);
// Actualizar el stock de un producto
exports.productRouter.put('/:id/stock', productController_1.ProductController.updateProductStock);
// Eliminar un producto
exports.productRouter.delete('/:id', productController_1.ProductController.productDelete);
// Obtener todos los productos por ID de orden
exports.productRouter.get('/order/:orderId', productController_1.ProductController.getProductsByOrderId);
