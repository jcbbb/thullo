import { Response, Request, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { IUser } from '../models/user';
import config from '../config';

interface Token {
  accessToken: string;
  refreshToken: string;
}

export const generateToken = (user: IUser): Token => {
  const { _id, email, role } = user;
  const accessToken = jwt.sign({ _id, email, role }, config.access_token_secret, {
    expiresIn: config.access_token_expiration,
  });
  const refreshToken = jwt.sign({}, config.refresh_token_secret, {
    expiresIn: config.refresh_token_expiration,
  });

  return { accessToken, refreshToken };
};

export const setCookies = (res: Response, token: Token) => {
  const { accessToken, refreshToken } = token;

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

export const randomNumber = () => Math.floor(100000 + Math.random() * 900000);

export const verifyToken = (res: Response, req: Request, next: NextFunction) => {};
