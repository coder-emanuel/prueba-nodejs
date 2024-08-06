import { Request, Response } from "express";
import { container } from "tsyringe";
import { Security } from "../services/security";


const SecurityServiceForUse = container.resolve(Security)

export class ControllAccess {

    static async access(req: Request, resp: Response) {
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