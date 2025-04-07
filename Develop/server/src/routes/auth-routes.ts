import { Router, Request, Response } from 'express';
import { User } from '../models/user.js';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';

export const login = async (req: Request, res: Response) => {
  // TODO: If the user exists and the password is correct, return a JWT token
  const {username, password} = req.body

  try {
    const user = await User.findOne({ where: {username}})

    if (!user) {
      return res.status(401).json({message: 'User not found'});
    };

    const isValid = await bcrypt.compare(password, user.password)

    if (!isValid) {
      return res.status(401).json({message: 'Password not Valid'})
    }

    const payload = {username: user.username};
    const token = jwt.sign(payload, process.env.JWT_SECRET_KEY || 'defetValue',
     {expiresIn: '1h'}
    );
    return res.json({token})

  } catch (error) {
    console.error(error)
    return res.status(500).json({message: `Internal server Error`})
  }

  
};

const router = Router();

// POST /login - Login a user
router.post('/login', login);

export default router;
