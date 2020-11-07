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
    expiresIn: `${config.refresh_token_expiration}d`,
  });

  return { accessToken, refreshToken };
};

export const setCookies = (res: Response, token: Token) => {
  const day = 24 * 3600000;
  const refreshTokenExpiration = parseInt(config.refresh_token_expiration, 10);
  const accessTokenExpiration = parseInt(config.access_token_expiration, 10);
  const { accessToken, refreshToken } = token;

  return res
    .cookie('refresh_token', refreshToken, {
      expires: new Date(Date.now() + refreshTokenExpiration * day),
      secure: true,
      sameSite: true,
      httpOnly: true,
    })
    .cookie('access_token', accessToken, {
      expires: new Date(Date.now() + accessTokenExpiration),
      secure: true,
      sameSite: true,
      httpOnly: true,
    });
};

export const randomNumber = () => Math.floor(100000 + Math.random() * 900000);

export const verifyToken = (res: Response, req: Request, next: NextFunction) => {};
