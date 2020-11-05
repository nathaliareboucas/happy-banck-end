import {Request, Response} from 'express';
import {getRepository} from 'typeorm';
import User from '../models/User';
import * as Yup from 'yup';
import userView from '../views/users_views'
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

export default {
  
  async authenticate(req: Request, res: Response) {
    const repository = getRepository(User);
    const {email, password} = req.body;

    const data = {email, password};
    const schema = Yup.object().shape({
      email: Yup.string().required().email(),
      password: Yup.string().required()
    });

    await schema.validate(data, {abortEarly: false});

    const user = await repository.findOne({
      where: {email}
    });

    if (!user) {
      return res.sendStatus(401);
    }

    const isValidPassword = await bcrypt.compare(password, user.password);

    if (!isValidPassword) {
      return res.sendStatus(401);
    }

    const token = jwt
      .sign({id: user.id, name: user.name}, 'happysecret', {expiresIn: '1d'});

    return res.status(200).json({user: userView.render(user), token});
  }
}