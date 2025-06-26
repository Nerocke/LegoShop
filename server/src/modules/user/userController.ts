import 'dotenv/config';

import { Router } from 'express';
import { userRepository } from './userRepository';
import { createValidator } from 'express-joi-validation';
import Joi from 'joi';
import {
  expressjwt,
  Request as JWTRequest,
} from 'express-jwt';

export const userController = Router();
const validator = createValidator();

userController.use(
  expressjwt({
    secret: process.env.JWT_SECRET!,
    algorithms: ['HS256'],
  }),
);

userController.use((req: JWTRequest, res, next) => {
  if (req.auth?.role === 'admin') {
    next();
  } else {
    res.sendStatus(403);
  }
});


userController.get('/', async (req: JWTRequest, res) => {
  const users = await userRepository.find();
  res.send(users);
});


const createUserSchema = Joi.object({
  login: Joi.string().required(),
  password: Joi.string().required(),
  role: Joi.string().valid('user', 'admin').optional(),
});

userController.post(
  '/',
  validator.body(createUserSchema),
  async (req, res) => {
    try {
      const newUser = await userRepository.save({
        login: req.body.login,
        password: req.body.password,
        role: req.body.role ?? 'user',
      });
      res.send(newUser);
    } catch (error: any) {
      res.status(400).send({
        error: error.message,
        detail: error.detail,
      });
    }
  },
);

const getUserSchema = Joi.object({
  id: Joi.number().required(),
});

userController.get(
  '/:id',
  validator.params(getUserSchema),
  async (req: JWTRequest, res) => {
    const id = Number(req.params.id);
    const user = await userRepository.findOneBy({ id });
    res.send(user);
  },
);

const updateUserSchema = Joi.object({
  login: Joi.string().optional(),
  password: Joi.string().optional(),
  role: Joi.string().valid('user', 'admin').optional(),
});

userController.put(
  '/:id',
  validator.params(getUserSchema),
  validator.body(updateUserSchema),
  async (req: JWTRequest, res) => {
    const id = Number(req.params.id);
    try {
      await userRepository.update(id, {
        login: req.body.login,
        password: req.body.password,
        role: req.body.role,
      });
      const updated = await userRepository.findOneBy({ id });
      res.send(updated);
    } catch (err: any) {
      res.status(400).send({
        error: err.message,
        detail: err.detail,
      });
    }
  }
);

userController.delete(
  '/:id',
  validator.params(getUserSchema),
  async (req: JWTRequest, res) => {
    const id = Number(req.params.id);
    try {
      await userRepository.delete(id);
      res.sendStatus(204); // No Content
    } catch (err: any) {
      res.status(400).send({
        error: err.message,
        detail: err.detail,
      });
    }
  }
);
