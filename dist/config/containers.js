"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tsyringe_1 = require("tsyringe");
const userServices_1 = require("../services/userServices");
const userRepository_1 = require("../repositories/userRepository");
const productServices_1 = require("../services/productServices");
const productRepository_1 = require("../repositories/productRepository");
const orderServices_1 = require("../services/orderServices");
const orderRepository_1 = require("../repositories/orderRepository");
const productCartService_1 = require("../services/productCartService");
const productCartRepository_1 = require("../repositories/productCartRepository");
tsyringe_1.container.registerSingleton(userRepository_1.UserRepository);
tsyringe_1.container.registerSingleton(userServices_1.UserService);
tsyringe_1.container.registerSingleton(productRepository_1.ProductRepository);
tsyringe_1.container.registerSingleton(productServices_1.ProductService);
tsyringe_1.container.registerSingleton(orderServices_1.OrderService);
tsyringe_1.container.registerSingleton(orderRepository_1.OrderRepository);
tsyringe_1.container.registerSingleton(productCartService_1.ProductCartService);
tsyringe_1.container.registerSingleton(productCartRepository_1.ProductCartRepository);
