import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

interface JwtPayload {
  username: string;
}

export const authenticateToken = (req: Request, res: Response, next: NextFunction) => {
  // TODO: verify the token exists and add the user data to the request object
  const auth = req.get('Authorization');
  if (!auth ||auth.startsWith('Bearer ')) {
    return res.status(401).json({ message: 'Token no proporcionado'})
  }
   const token = auth.split(' ')[1]
  
  try {
    const key = process.env.JWT_SECRET_KEY || 'defectKey';
    const payload = jwt.verify(token,key) as JwtPayload

    req.user = payload
    next();
  } catch (error) {
    return res.status(403).json({ message: 'No valid Token' });
  }
};
