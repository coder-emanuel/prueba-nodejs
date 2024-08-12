import { Response, Request } from 'express';

export const handleError = (res: Response, req: Request, error: Error) => {
  // Enviar respuesta al cliente en caso de error
  res.status(500).json({ status: 500, message: 'Internal server error' });
};
