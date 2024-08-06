import { Router } from "express";
import { UserController } from "../controllers/userController";

export const userRouter = Router();

// Obtener todos los usuarios
userRouter.get('/', UserController.getAllUsers);

// Obtener un usuario por ID
userRouter.get('/:id', UserController.getUserById);

// Registrar un nuevo usuario
userRouter.post('/', UserController.newUserRegister);

// Actualizar un usuario existente
userRouter.put('/:id', UserController.userUpdated);

// Eliminar un usuario
userRouter.delete('/:id', UserController.userDelete);
