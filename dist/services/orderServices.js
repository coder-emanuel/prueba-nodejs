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
exports.OrderService = void 0;
const orderRepository_1 = require("../repositories/orderRepository");
const tsyringe_1 = require("tsyringe");
let OrderService = class OrderService {
    constructor(orderRepository) {
        this.orderRepository = orderRepository;
    }
    //Crear una nueva orden
    createOrder(order) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.orderRepository.createNewOrder(order);
        });
    }
    //Obtener todas las ordenes
    getAllOrders() {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.orderRepository.finAll();
        });
    }
    //Encontrar una orden por ID
    findOrderById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return yield this.orderRepository.findById(id);
            }
            catch (error) {
                console.log(error);
            }
        });
    }
    //Actualizar una orden por ID
    updateOrder(order, id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                // Actualiza la orden usando el repositorio
                const affectedCount = yield this.orderRepository.updateOrderById(order, id);
                if (affectedCount === 0) {
                    console.log('No se encontró la orden o no se realizaron cambios.');
                    return null;
                }
                // Buscar la orden actualizada para obtener los datos actualizados
                const updatedOrder = yield this.orderRepository.findById(id);
                if (updatedOrder) {
                    console.log('Datos actualizados:', updatedOrder.get({ plain: true }));
                }
                return updatedOrder;
            }
            catch (error) {
                console.error('Error al actualizar la orden:', error);
                return null;
            }
        });
    }
    // Eliminar una orden por ID
    deleteOrderById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const order = yield this.orderRepository.findById(id);
            if (order) {
                yield this.orderRepository.deleteOrderById(id);
                return order;
            }
            else {
                return "Orden no encontrada, no se puede eliminar";
            }
        });
    }
    // Obtener todas las órdenes por ID de usuario
    getAllOrdersByUserId(userId) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                // Busca todas las órdenes asociadas al ID de usuario
                return yield this.orderRepository.findAllByUserId(userId);
            }
            catch (error) {
                console.error('Error al obtener las órdenes por ID de usuario:', error);
                return null;
            }
        });
    }
};
exports.OrderService = OrderService;
exports.OrderService = OrderService = __decorate([
    (0, tsyringe_1.injectable)(),
    __param(0, (0, tsyringe_1.inject)(orderRepository_1.OrderRepository)),
    __metadata("design:paramtypes", [orderRepository_1.OrderRepository])
], OrderService);
