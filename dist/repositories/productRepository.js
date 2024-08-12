"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
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
exports.ProductRepository = void 0;
const productTable_1 = require("../models/productTable");
const orderTable_1 = require("../models/orderTable");
const tsyringe_1 = require("tsyringe");
let ProductRepository = class ProductRepository {
    // Obtener todos los productos
    findAll() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return yield productTable_1.Product.findAll();
            }
            catch (error) {
                console.error('Error fetching all products:', error);
                throw new Error('Error fetching all products');
            }
        });
    }
    // Encontrar un producto por ID
    findById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return yield productTable_1.Product.findByPk(id);
            }
            catch (error) {
                console.error('Error finding product by ID:', error);
                throw new Error('Error finding product by ID');
            }
        });
    }
    // Crear un nuevo producto
    createNewProduct(product) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return yield productTable_1.Product.create(product);
            }
            catch (error) {
                console.error('Error creating new product:', error);
                throw new Error('Error creating new product');
            }
        });
    }
    // Actualizar un producto por ID
    updateProductById(productUpdated, id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const [affectedCount] = yield productTable_1.Product.update(productUpdated, {
                    where: { id }
                });
                return affectedCount;
            }
            catch (error) {
                console.error('Error updating product by ID:', error);
                throw new Error('Error updating product by ID');
            }
        });
    }
    // Actualizar el stock de un producto por ID
    updateProductStockById(id, stock) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const [affectedCount] = yield productTable_1.Product.update({ stock }, {
                    where: { id }
                });
                return affectedCount; // Retorna el número de filas afectadas
            }
            catch (error) {
                console.error('Error updating product stock by ID:', error);
                throw new Error('Error updating product stock by ID');
            }
        });
    }
    // Eliminar un producto por ID
    deleteProductById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield productTable_1.Product.destroy({
                    where: { id }
                });
            }
            catch (error) {
                console.error('Error deleting product by ID:', error);
                throw new Error('Error deleting product by ID');
            }
        });
    }
    // Obtener todos los productos por ID de orden
    findAllByOrderId(orderId) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return yield productTable_1.Product.findAll({
                    include: [{
                            model: orderTable_1.Order,
                            where: { id: orderId }
                        }]
                });
            }
            catch (error) {
                console.error('Error fetching products by order ID:', error);
                throw new Error('Error fetching products by order ID');
            }
        });
    }
};
exports.ProductRepository = ProductRepository;
exports.ProductRepository = ProductRepository = __decorate([
    (0, tsyringe_1.injectable)()
], ProductRepository);
