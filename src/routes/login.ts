import { Router } from "express";
import { ControllAccess } from "../controllers/login";

export const login= Router()

login.post('/',ControllAccess.access)