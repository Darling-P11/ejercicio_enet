import { Request, Response, NextFunction } from 'express';
import { verifyToken } from '../utils/auth';

export const authMiddleware = (req: Request, res: Response, next: NextFunction): void => {

  const authHeader = req.headers.authorization;
  if (!authHeader) {
    res.status(403).json({ message: 'Token requerido' });
    return;
  }
  

  const token = authHeader.split(' ')[1];

  try {
    const decoded = verifyToken(token);
    (req as any).user = decoded;
    next();
  } catch (err) {
    res.status(401).json({ message: 'Token inválido o expirado' });
    return;
  }
  
};
