import { Response, Request, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { IUser } from '../models/user';
import config from '../config';

export const generateToken = (res: Response, user: IUser) => {
  const { _id, email, role } = user;
  const accessToken = jwt.sign({ _id, email, role }, config.access_token_secret, {
    expiresIn: config.access_token_expiration,
  });
  const refreshToken = jwt.sign({}, config.refresh_token_secret, {
    expiresIn: config.refresh_token_expiration,
  });

  res.cookie('access_token', accessToken, {
    expires: new Date(Date.now() + config.access_token_expiration),
    secure: true,
    sameSite: true,
    httpOnly: true,
  });

  res.cookie('refresh_token', refreshToken, {
    expires: new Date(Date.now() + config.refresh_token_expiration),
    secure: true,
    sameSite: true,
    httpOnly: true,
  });
};

export const verifyToken = (res: Response, req: Request, next: NextFunction) => {};
