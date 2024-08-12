import { User } from "../models/userTable"; // Asegúrate de que este sea el modelo correcto
import { injectable } from 'tsyringe';

@injectable()
export class UserRepository {
    // Obtener todos los usuarios
    async findAll(): Promise<User[]> {
        try {
            return await User.findAll();
        } catch (error) {
            console.error('Error fetching all users:', error);
            throw new Error('Error fetching all users');
        }
    }

    // Encontrar un usuario por correo electrónico
    async findByEmail(email: string): Promise<User | null> {
        try {
            return await User.findOne({
                where: { email }
            });
        } catch (error) {
            console.error('Error finding user by email:', error);
            throw new Error('Error finding user by email');
        }
    }

    // Encontrar un usuario por ID
    async findById(id: number): Promise<User | null> {
        try {
            return await User.findByPk(id);
        } catch (error) {
            console.error('Error finding user by ID:', error);
            throw new Error('Error finding user by ID');
        }
    }

    // Crear un nuevo usuario
    async createNewUser(user: Partial<User>): Promise<User> {
        try {
            return await User.create(user as any);
        } catch (error) {
            console.error('Error creating new user:', error);
            throw new Error('Error creating new user');
        }
    }

    // Actualizar un usuario por ID
    async updateUserById(userUpdated: Partial<User>, id: number): Promise<number> {
        try {
            const [affectedCount] = await User.update(userUpdated, {
                where: { id }
            });
            return affectedCount; // Retorna el número de filas afectadas
        } catch (error) {
            console.error('Error updating user by ID:', error);
            throw new Error('Error updating user by ID');
        }
    }

    // Eliminar un usuario por ID
    async deleteUserById(id: number): Promise<void> {
        try {
            await User.destroy({
                where: { id }
            });
        } catch (error) {
            console.error('Error deleting user by ID:', error);
            throw new Error('Error deleting user by ID');
        }
    }
}


