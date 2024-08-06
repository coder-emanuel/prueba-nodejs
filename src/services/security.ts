import bcrypt from "bcryptjs";
import env from "dotenv"
import { injectable, inject } from "tsyringe";
import { UserRepository } from "../repositories/userRepository";
import jwt from "jsonwebtoken";

env.config();

@injectable()
export class Security {
  constructor(@inject(UserRepository) private userRepository: UserRepository) {}

  // Método para encriptar contraseñas
  async encryptPassword(password: string): Promise<string> {
    const salt = await bcrypt.genSalt(10); // Genera un salt aleatorio
    return await bcrypt.hash(password, salt); // Encripta la contraseña con el salt generado
  }

  // Método para generar un token JWT
  async generateToken(data: object): Promise<string> {
    const secretKey = process.env.SECRET_KEY_ADMIN || "generica"; // Clave secreta desde el entorno o una clave genérica
    const token = jwt.sign(data, secretKey, {
      expiresIn: 60 * 60 * 2, // Expira en 2 horas
    });
    return token;
  }

  // Método para autorizar a un usuario comparando email y contraseña
  async authorize(email: string, password: string): Promise<boolean> {
    try {
      // Busca el usuario por email
      const user = await this.userRepository.findByEmail(email);
      // Verifica si el usuario existe
      if (!user) {
        return false;
      }
      // Compara la contraseña proporcionada con el hash almacenado
      const isMatch = await bcrypt.compare(password, user.password);
      return isMatch;
    } catch (error) {
      console.error('Error during authorization:', error);
      return false;
    }
  }
}
