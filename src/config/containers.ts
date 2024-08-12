import { container } from 'tsyringe';
import {UserService} from '../services/userServices';
import {UserRepository} from '../repositories/userRepository';
import { ProductService } from '../services/productServices';
import { ProductRepository } from '../repositories/productRepository';
import { OrderService } from '../services/orderServices';
import { OrderRepository } from '../repositories/orderRepository';
import { ProductCartService } from '../services/productCartService';
import { ProductCartRepository } from '../repositories/productCartRepository';


container.registerSingleton<UserRepository>(UserRepository);
container.registerSingleton<UserService>(UserService);
container.registerSingleton<ProductRepository>(ProductRepository);
container.registerSingleton<ProductService>(ProductService);
container.registerSingleton<OrderService>(OrderService);
container.registerSingleton<OrderRepository>(OrderRepository);
container.registerSingleton<ProductCartService>(ProductCartService);
container.registerSingleton<ProductCartRepository>(ProductCartRepository);
