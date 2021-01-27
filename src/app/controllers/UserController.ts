import { Request, Response } from 'express';
import { getRepository } from 'typeorm';
import { classToClass } from 'class-transformer';

//* Importando o model
import User from '../models/User'

class UserController {
  index(req: Request, res: Response){
    return res.send({ userID: req.userId });
  }


  async store(req: Request, res: Response){
    const repository = getRepository(User)
    const { email, password } = req.body;

    //* Verifica se o email já for cadastrado
    const userExists = await repository.findOne({ where: {email} });

    if(userExists){
      return res.sendStatus(409);
    }

    const user = repository.create({ email, password });
    await repository.save(user); //* Essa função de fato faz o insert no DB

    return res.json(classToClass(user))
  }
}

export default new UserController();
