"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductController = void 0;
const tsyringe_1 = require("tsyringe");
const productServices_1 = require("../services/productServices");
const productService = tsyringe_1.container.resolve(productServices_1.ProductService);
class ProductController {
    // Obtener todos los productos
    static getAllProducts(_, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const products = yield productService.getAllProducts();
                return res.status(200).json(products);
            }
            catch (error) {
                console.error('Error fetching products:', error);
                return res.status(500).json({ message: 'Internal Server Error' });
            }
        });
    }
    // Obtener un producto por ID
    static getProductById(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const id = parseInt(req.params.id, 10);
                const product = yield productService.findProductById(id);
                if (product) {
                    return res.status(200).json({
                        message: "Product found",
                        product
                    });
                }
                else {
                    return res.status(404).json({ message: "Product not found" });
                }
            }
            catch (error) {
                console.error('Error fetching product by ID:', error);
                return res.status(500).json({ message: 'Internal Server Error' });
            }
        });
    }
    // Registrar un nuevo producto
    static newProductRegister(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const productCreated = yield productService.createProduct(req.body);
                return res.status(201).json(productCreated);
            }
            catch (error) {
                console.error('Error registering new product:', error);
                return res.status(400).json({ message: 'Bad Request', error });
            }
        });
    }
    // Actualizar un producto existente
    static productUpdated(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const id = parseInt(req.params.id, 10);
                const productUpdates = req.body;
                const updatedProduct = yield productService.updateProduct(productUpdates, id);
                if (updatedProduct) {
                    return res.status(200).json({
                        message: "Product updated",
                        updatedProduct
                    });
                }
                else {
                    return res.status(404).json({ message: "Product not found" });
                }
            }
            catch (error) {
                console.error('Error updating product:', error);
                return res.status(500).json({ message: 'Internal Server Error' });
            }
        });
    }
    // Actualizar el stock de un producto
    static updateProductStock(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const id = parseInt(req.params.id, 10);
                const { stock } = req.body;
                const updatedProduct = yield productService.updateProductStock(id, stock);
                if (updatedProduct) {
                    return res.status(200).json({
                        message: "Product stock updated",
                        updatedProduct
                    });
                }
                else {
                    return res.status(404).json({ message: "Product not found" });
                }
            }
            catch (error) {
                console.error('Error updating product stock:', error);
                return res.status(500).json({ message: 'Internal Server Error' });
            }
        });
    }
    // Eliminar un producto
    static productDelete(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const id = parseInt(req.params.id, 10);
                const deleted = yield productService.deleteProductById(id);
                if (deleted) {
                    return res.status(200).json({
                        message: 'Product successfully deleted',
                        deleted
                    });
                }
                else {
                    return res.status(404).json({ message: "Product not found" });
                }
            }
            catch (error) {
                console.error('Error deleting product:', error);
                return res.status(500).json({ message: 'Internal Server Error' });
            }
        });
    }
    // Obtener todos los productos por ID de orden
    static getProductsByOrderId(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const orderId = parseInt(req.params.orderId, 10);
                const products = yield productService.getAllProductsByOrderId(orderId);
                return res.status(200).json(products);
            }
            catch (error) {
                console.error('Error fetching products by order ID:', error);
                return res.status(500).json({ message: 'Internal Server Error' });
            }
        });
    }
}
exports.ProductController = ProductController;
