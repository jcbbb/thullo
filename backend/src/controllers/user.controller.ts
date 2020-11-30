import { Response, Request, NextFunction } from 'express';
import * as UserService from '../services/user.service';

export const profile = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { _id } = req.user;
    const user = await UserService.getUserById(_id);
    res.status(200).json({ user });
  } catch (err) {
    return next(err);
  }
};
