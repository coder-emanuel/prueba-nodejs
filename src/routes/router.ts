import { Router } from 'express';
import { userRouter } from "./userRouter";
// import { productRouter } from './productRouter';
// import { cartRouter } from './cartRouter';
// import { orderRouter } from './orderRouter';
// import { login } from './login';

export const router: Router = Router();

// Rutas para la gestión de usuarios
router.use('/users', userRouter);

// // Rutas para la gestión de productos
// router.use('/products', productRouter);

// // Rutas para la gestión de carritos de compras
// router.use('/carts', cartRouter);

// // Rutas para la gestión de órdenes
// router.use('/orders', orderRouter);

// // Rutas para autenticación y autorización
// router.use('/auth', login);
