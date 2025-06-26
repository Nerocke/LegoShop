import { Router, Request, Response } from 'express'
import { userRepository } from '../user/userRepository'
import { createValidator } from 'express-joi-validation'
import Joi from 'joi'
import jwt from 'jsonwebtoken'

export const authController = Router()
const validator = createValidator()

const loginSchema = Joi.object({
  login: Joi.string().required(),
  password: Joi.string().required(),
})

// ✅ Route de connexion
authController.post(
  '/login',
  validator.body(loginSchema),
  async (req, res) => {
    const user = await userRepository.findOneBy({
      login: req.body.login,
      password: req.body.password,
    })
    if (user) {
      const token = jwt.sign(
        {
          id: user.id,
          role: user.role,
        },
        process.env.JWT_SECRET!,
        {
          algorithm: 'HS256',
        },
      )
      res.send({
        token,
        user: {
          id: user.id,
          login: user.login,
          role: user.role,
        },
      })
    } else {
      res.sendStatus(401)
    }
  },
)


authController.get('/me', (req, res) => {
  const authHeader = req.headers.authorization;
  if (!authHeader) {
    res.sendStatus(401);
    return;
  }

  const token = authHeader.split(' ')[1];

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET!);

    if (
      typeof decoded === 'object' &&
      decoded !== null &&
      'id' in decoded &&
      'role' in decoded
    ) {
      res.json({
        user: {
          id: (decoded as any).id,
          role: (decoded as any).role,
        },
      });
    } else {
      res.sendStatus(401);
    }
  } catch (err) {
    res.sendStatus(401);
  }
});
