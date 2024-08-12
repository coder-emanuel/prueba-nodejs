import { Request, Response } from "express";
import { container } from "tsyringe";
import { Security } from "../services/security";
import { UserService } from "../services/userServices";
import { handleError } from "../utils/handleError";


const SecurityServiceForUse = container.resolve(Security)

export class AuthController {

    static async registerUser(req: Request, res: Response) {
        try {
          const { email, password, roleId } = req.body;
    
          // Verificar que todos los campos requeridos estén presentes
          if (!email || !password || !roleId) {
            console.warn('Registration attempt with missing data');
            return res.status(400).json({ status: 400, message: 'Email, password, and roleId are required.'});
          }
    
          const userService = container.resolve(UserService);
          const createdUser = await userService.createUser({ email, password, roleId });
    
          console.info(`User registered: ${email}`);
    
          res.status(201).json({ status: 201, message: createdUser });
        } catch (error) {
          // Asegúrate de que 'error' es un objeto Error
          const errorMessage = error instanceof Error ? error.message : 'Unknown error';
          console.error(`Error in AuthController.registerUser: ${errorMessage}`);
          handleError(res, req, error as Error);
        }
      }


    static async loginUser(req: Request, resp: Response) {
        try {
            const email = req.body.email
            const password = req.body.password
            const canAccess = await SecurityServiceForUse.authorize(email, password)
            if (canAccess) {
                const token = await SecurityServiceForUse.generateToken(email)
                resp.header('athorization', token).status(201).json({
                    message: "welcome login successfully your token was generated is in header",
                })

            } else {
                resp.status(500).json({
                    message: "unauthorized"
                })
            }
            
        } catch (error) {
            console.log("desde el controlador", error)
        }
    }
}