import { IUser } from '../interfaces/user.interface';
import jwt from 'jsonwebtoken';
import config from '../config';

type AccessToken = 'string';

export const generate_token = (user: IUser): AccessToken => {
  const { _id, email, role } = user;
  const accessToken = jwt.sign({ _id, email, role }, config.access_token_secret, {
    expiresIn: config.access_token_expiration,
  });
  return accessToken as AccessToken;
};
