
import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import env from 'dotenv';

env.config();

export const tokenValidation = (req: Request, res: Response, next: NextFunction) => {
  try {
    const token = req.header('authorization');

    if (!token) {
      return res.status(401).json({ message: 'Access denied. No token provided.' });
    }

    // Extract token from "Bearer token" format
    const tokenWithoutBearer = token.startsWith('Bearer') ? token.slice(7) : token;

    jwt.verify(tokenWithoutBearer, process.env.JWT_SECRET as string);
    
    next();
  } catch (err) {
    return res.status(401).json({ message: 'Invalid token.' });
  }
};
