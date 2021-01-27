import { Request, Response } from 'express';
import { getRepository } from 'typeorm';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { classToClass } from 'class-transformer'; 

import User from '../models/User'

class AuthController {
  async authenticate(req: Request, res: Response){
    const repository = getRepository(User)
    const { email, password } = req.body;

    //* Verifica se o email já for cadastrado
    const user = await repository.findOne({ where: {email} });

    if(!user){
      return res.sendStatus(401);
    }

    const isValidPassword = await bcrypt.compare(password, user.password)

    if(!isValidPassword){
      return res.sendStatus(401);
    }

    const token = jwt.sign({ id: user.id }, 'secret', {expiresIn: '1d'});

    return res.json({
      user: classToClass(user), 
      token
    });
  }
}

export default new AuthController();