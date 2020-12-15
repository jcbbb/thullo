import {Response, Request, NextFunction} from 'express';
import {asyncHandler} from '../utils/async-handler';
import * as UserService from '../services/user.service';

export const profile = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
  const {_id} = req.user;
  const user = await UserService.getUserById(_id);
  res.status(200).json({user});
});
