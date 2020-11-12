import { Response, Request, NextFunction } from 'express';
import { IUser } from '../models/user';
import { AuthenticationError, AuthorizationError, BadRequestError } from './errors'
import jwt from 'jsonwebtoken';
import redisClient from '../services/redis';
import config from '../config';

type AccessToken = string;
type roles = 'user' | 'admin';

export const generateToken = (user: IUser): AccessToken => {
  const { _id, email, role } = user;
  const accessToken = jwt.sign({ _id, email, role }, config.access_token_secret, {
    expiresIn: config.access_token_expiration,
  });
  return accessToken
};

export const setCookies = (res: Response, accessToken: AccessToken) => {
  const accessTokenExpiration = parseInt(config.access_token_expiration, 10);

  return res
    .cookie('access_token', accessToken, {
      expires: new Date(Date.now() + accessTokenExpiration),
      secure: true,
      sameSite: true,
      httpOnly: true,
    });
};

export const randomNumber = () => Math.floor(100000 + Math.random() * 900000);

export const verifyToken = (req: Request, res: Response, next: NextFunction) => {
  const accessToken = req.cookies.access_token || '';
  if (!accessToken) {
    throw new BadRequestError('Access token is required')
  }

  jwt.verify(accessToken, (err, decoded) => {
    if (!err) {
      redisClient.get((decoded as any)._id, (err, reply) => {
        if (err) {
          throw new Error('Something went wrong with redis')
        }
        if (reply) {
          throw new AuthenticationError('This user has been blocked by admin')
        }
      })
      req.user = decoded as any;
      next()
    }
  })
};

export const permit = (...permittedRoles: roles[]) => {
  return (req: Request, res: Response, next: NextFunction) => {
    const user = req.user;
    if (user && permittedRoles.includes(user.role as roles)) {
      return next()
    } else {
      throw new AuthorizationError('Forbidden');
    }
  }
}