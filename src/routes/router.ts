import { Router } from 'express';
import { userRouter } from "./userRouter";
import { productRouter } from './productRouter';
import { orderRouter } from './orderRouter';
import { productCartRouter } from './productCartRouter';
import { authRouter } from './authRouter';

export const router: Router = Router();

// Rutas para la gestión de usuarios
router.use('/users', userRouter);

// Rutas para la gestión de productos
router.use('/products', productRouter);

// Rutas para la gestión de órdenes
router.use('/orders', orderRouter);

// Rutas para la gestión de productos carros
router.use('/productCarts', productCartRouter);

// Rutas para autenticación y autorización
router.use('/auth', authRouter);
