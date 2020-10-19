import { Response } from 'express';
import jwt from 'jsonwebtoken';
import { IUser } from '../models/user';
import {
  ACCESS_TOKEN_SECRET,
  REFRESH_TOKEN_SECRET,
  ACCESS_TOKEN_EXPIRATION,
  REFRESH_TOKEN_EXPIRATION,
} from '../';

export const generateToken = (res: Response, user: IUser) => {
  const { _id, email, role } = user;
  const accessToken = jwt.sign({ _id, email, role }, ACCESS_TOKEN_SECRET, {
    expiresIn: ACCESS_TOKEN_EXPIRATION,
  });
};
