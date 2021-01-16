import { Request, Response, NextFunction } from 'express';
import { AuthenticationError } from './errors';
import config from '../config';
import RedisClient from '../services/redis.service';
import jwt from 'jsonwebtoken';

export const verify_token = (req: Request, res: Response, next: NextFunction) => {
  const auth_header = req.get('Authorization')?.split(' ');
  const from_header = auth_header && auth_header[0] === 'Bearer' ? auth_header[1] : '';
  const access_token = req.cookies.access_token || from_header || '';

  if (!access_token) {
    return next(new AuthenticationError('Access token is required'));
  }

  jwt.verify(access_token, config.access_token_secret, (err: any, decoded: any) => {
    if (!err) {
      RedisClient.get(decoded._id, (err, reply) => {
        if (err) {
          return next(new Error('Something went wrong with redis'));
        }
        if (reply) {
          return next(new AuthenticationError('This user has been blocked by admin'));
        }
      });

      req.user = decoded;
      next();
    }
  });
};
