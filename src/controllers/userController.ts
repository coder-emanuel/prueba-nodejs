import { container } from "tsyringe";
import { UserService } from "../services/userServices";
import { Request, Response } from "express";
import { Security } from "../services/security";

const userService = container.resolve(UserService);
const securityService = container.resolve(Security);

export class UserController {
    // Obtener todos los usuarios
    static async getAllUsers(_: Request, res: Response): Promise<Response> {
        try {
            const users = await userService.getAllUsers();
            return res.status(200).json(users);
        } catch (error) {
            console.error('Error fetching users:', error);
            return res.status(500).json({ message: 'Internal Server Error' });
        }
    }

    // Obtener un usuario por ID
    static async getUserById(req: Request, res: Response): Promise<Response> {
        try {
            const id: number = parseInt(req.params.id, 10);
            const user = await userService.findUserById(id);
            if (user) {
                return res.status(200).json({
                    message: "User found",
                    user
                });
            } else {
                return res.status(404).json({ message: "User not found" });
            }
        } catch (error) {
            console.error('Error fetching user by ID:', error);
            return res.status(500).json({ message: 'Internal Server Error' });
        }
    }

    // Registrar un nuevo usuario
    static async newUserRegister(req: Request, res: Response): Promise<Response> {
        try {
            const encryptedPassword = await securityService.encryptPassword(req.body.password);
            const userCreated = await userService.createUser({
                ...req.body,
                password: encryptedPassword
            });
            return res.status(201).json(userCreated);
        } catch (error) {
            console.error('Error registering new user:', error);
            return res.status(400).json({ message: 'Bad Request', error });
        }
    }

    // Actualizar un usuario existente
    static async userUpdated(req: Request, res: Response): Promise<Response> {
        try {
            const id: number = parseInt(req.params.id, 10);
            const userUpdates = req.body;
            const updatedUser = await userService.updateUser(userUpdates, id);
            if (updatedUser) {
                return res.status(200).json({
                    message: "User updated",
                    updatedUser
                });
            } else {
                return res.status(404).json({ message: "User not found" });
            }
        } catch (error) {
            console.error('Error updating user:', error);
            return res.status(500).json({ message: 'Internal Server Error' });
        }
    }

    // Eliminar un usuario
    static async userDelete(req: Request, res: Response): Promise<Response> {
        try {
            const id: number = parseInt(req.params.id, 10);
            const deleted = await userService.deleteByIdService(id);
            if (deleted) {
                return res.status(200).json({
                    message: 'User successfully deleted',
                    deleted
                });
            } else {
                return res.status(404).json({ message: "User not found" });
            }
        } catch (error) {
            console.error('Error deleting user:', error);
            return res.status(500).json({ message: 'Internal Server Error' });
        }
    }
}


