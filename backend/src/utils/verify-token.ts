import { Request, Response, NextFunction } from 'express';
import { AuthenticationError } from './errors';
import config from '../config';
import redisClient from '../services/redis.service';
import jwt from 'jsonwebtoken';

export const verifyToken = (req: Request, res: Response, next: NextFunction) => {
  const authHeader = req.get('Authorization')?.split(' ');
  const fromHeader = authHeader && authHeader[0] === 'Bearer' ? authHeader[1] : '';
  const accessToken = req.cookies.access_token || fromHeader || '';

  if (!accessToken) {
    return next(new AuthenticationError('Access token is required'));
  }

  jwt.verify(accessToken, config.access_token_secret, (err: any, decoded: any) => {
    if (!err) {
      redisClient.get(decoded._id, (err, reply) => {
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
