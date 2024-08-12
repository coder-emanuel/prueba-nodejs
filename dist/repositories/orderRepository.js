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
exports.OrderRepository = void 0;
const orderTable_1 = require("../models/orderTable");
const userTable_1 = require("../models/userTable");
const tsyringe_1 = require("tsyringe");
let OrderRepository = class OrderRepository {
    // Obtener todos los productos
    finAll() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return yield orderTable_1.Order.findAll();
            }
            catch (error) {
                console.error('Error fetching all products:', error);
                throw new Error('Error fetching all products');
            }
        });
    }
    // Encontrar una orden por ID
    findById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return yield orderTable_1.Order.findByPk(id);
            }
            catch (error) {
                console.error('Error finding order by ID:', error);
                throw new Error('Error finding order by ID');
            }
        });
    }
    // Crear un nuevo producto
    createNewOrder(order) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return yield orderTable_1.Order.create(order);
            }
            catch (error) {
                console.error('Error creating new order:', error);
                throw new Error('Error creating new order');
            }
        });
    }
    // Actualizar un producto por ID
    updateOrderById(orderUpdated, id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const [affectedCount] = yield orderTable_1.Order.update(orderUpdated, {
                    where: { id }
                });
                return affectedCount;
            }
            catch (error) {
                console.error('Error updating order by ID:', error);
                throw new Error('Error updating order by ID');
            }
        });
    }
    // Eliminar un producto por ID
    deleteOrderById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield orderTable_1.Order.destroy({
                    where: { id }
                });
            }
            catch (error) {
                console.error('Error deleting order by ID:', error);
                throw new Error('Error deleting order by ID');
            }
        });
    }
    // Obtener todos las ordenes por ID de usuario
    findAllByUserId(userId) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return yield orderTable_1.Order.findAll({
                    include: [{
                            model: userTable_1.User,
                            where: { id: userId }
                        }]
                });
            }
            catch (error) {
                console.error('Error fetching orders by order ID:', error);
                throw new Error('Error fetching orders by order ID');
            }
        });
    }
};
exports.OrderRepository = OrderRepository;
exports.OrderRepository = OrderRepository = __decorate([
    (0, tsyringe_1.injectable)()
], OrderRepository);
