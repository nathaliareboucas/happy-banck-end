import {Request, Response} from 'express';
import {getRepository} from 'typeorm';
import User from '../models/User';
import * as Yup from 'yup';
import userView from '../views/users_views'

export default {
  
  async create(req: Request, res: Response) {
    const repository = getRepository(User);
    const {name, email, password} = req.body;

    const data = {name, email, password};
    const schema = Yup.object().shape({
      name: Yup.string().required(),
      email: Yup.string().required().email(),
      password: Yup.string().required()
    });

    await schema.validate(data, {abortEarly: false});

    const userExists = await repository.findOne({
      where: {email}
    });

    if (userExists) {
      return res.sendStatus(409);
    }

    const user = repository.create(data);
    await repository.save(user);
    return res.status(201).json(userView.render(user));
  }
}