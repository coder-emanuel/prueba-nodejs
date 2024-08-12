"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
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
exports.ProductService = void 0;
const productRepository_1 = require("../repositories/productRepository");
const tsyringe_1 = require("tsyringe");
let ProductService = class ProductService {
    constructor(productRepository) {
        this.productRepository = productRepository;
    }
    // Crear un nuevo producto
    createProduct(product) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.productRepository.createNewProduct(product);
        });
    }
    // Obtener todos los productos
    getAllProducts() {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.productRepository.findAll();
        });
    }
    // Encontrar un producto por ID
    findProductById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return yield this.productRepository.findById(id);
            }
            catch (error) {
                console.log(error);
            }
        });
    }
    // Actualizar un producto por ID
    updateProduct(product, id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const affectedCount = yield this.productRepository.updateProductById(product, id);
                if (affectedCount === 0) {
                    console.log('No se encontró el producto o no se realizaron cambios.');
                    return null;
                }
                // Buscar el producto actualizado para obtener los datos actualizados
                const updatedProduct = yield this.productRepository.findById(id);
                if (updatedProduct) {
                    console.log('Datos actualizados:', updatedProduct.get({ plain: true }));
                }
                return updatedProduct;
            }
            catch (error) {
                console.log(error);
                return null;
            }
        });
    }
    // Actualizar el stock de un producto por ID
    updateProductStock(id, stock) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const affectedCount = yield this.productRepository.updateProductStockById(id, stock);
                if (affectedCount === 0) {
                    console.log('No se encontró el producto o no se realizaron cambios.');
                    return null;
                }
                // Buscar el producto actualizado para obtener los datos actualizados
                const updatedProduct = yield this.productRepository.findById(id);
                if (updatedProduct) {
                    console.log('Stock actualizado:', updatedProduct.get({ plain: true }));
                }
                return updatedProduct;
            }
            catch (error) {
                console.log(error);
                return null;
            }
        });
    }
    // Eliminar un producto por ID
    deleteProductById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const product = yield this.findProductById(id);
            if (product) {
                yield this.productRepository.deleteProductById(id);
                return product;
            }
            else {
                return "Producto no encontrado, no se puede eliminar";
            }
        });
    }
    // Obtener todos los productos por ID de orden
    getAllProductsByOrderId(orderId) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return yield this.productRepository.findAllByOrderId(orderId);
            }
            catch (error) {
                console.log('Error al obtener productos por ID de orden:', error);
                return null;
            }
        });
    }
};
exports.ProductService = ProductService;
exports.ProductService = ProductService = __decorate([
    (0, tsyringe_1.injectable)(),
    __param(0, (0, tsyringe_1.inject)(productRepository_1.ProductRepository)),
    __metadata("design:paramtypes", [productRepository_1.ProductRepository])
], ProductService);
