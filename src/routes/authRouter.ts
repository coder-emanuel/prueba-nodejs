import { Router } from "express";
import { AuthController } from "../controllers/auth.controller";

export const authRouter: Router = Router();

authRouter.post('/', AuthController.registerUser)
authRouter.post('/', AuthController.loginUser)

