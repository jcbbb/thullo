import { Response, Request, NextFunction } from 'express';
import { setCookies } from '../utils';
import * as AuthService from '../services/auth.service';

export const checkEmail = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { email } = req.body;
    await AuthService.check(email);
    res.status(200).json({ message: 'Email is not taken', statusCode: 200 });
  } catch (err) {
    return next(err);
  }
};

export const tempUser = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { email } = req.body;
    await AuthService.createTempUser(email);
    res.status(201).json({ message: 'Temporary user created for an hour.', statusCode: 201 });
  } catch (err) {
    return next(err);
  }
};

export const verify = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { email, authCode } = req.body;
    await AuthService.verify(email, authCode);
    res.status(200).json({ message: 'Auth code verified', statusCode: 200 });
  } catch (err) {
    return next(err);
  }
};

export const signup = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { email, password, name, authCode } = req.body;
    const { accessToken } = await AuthService.signup(email, password, name, authCode);
    setCookies(res, accessToken);
    res.status(201).json({ message: 'User created', statusCode: 201, accessToken });
  } catch (err) {
    return next(err);
  }
};

export const login = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { email, password } = req.body;
    const { accessToken } = await AuthService.login(email, password);
    setCookies(res, accessToken);
    res.status(200).json({ message: 'Logged in', statusCode: 200, accessToken });
  } catch (err) {
    return next(err);
  }
};

export const me = async (req: Request, res: Response) => {
  res.json({ message: 'Access token verified', statusCode: 200 });
};
