import { Response, Request } from 'express';
import { asyncHandler } from '../utils/async-handler';
import { IUser, IUserFilterOpts } from '../interfaces/user.interface';
import * as UserService from '../services/user.service';

export const getProfile = asyncHandler(async (req: Request, res: Response) => {
  const { _id } = req.user;
  const user = await UserService.getUserById(_id);
  res.status(200).json(user);
});

export const getAllUsers = asyncHandler(async (req: Request, res: Response) => {
  let { limit, offset } = req.query;
  const users = await UserService.getAllUsers({ limit, offset } as IUserFilterOpts);
  res.status(200).json(users);
});

export const getUserById = asyncHandler(async (req: Request, res: Response) => {
  const { userId } = req.params;
  const user = await UserService.getUserById(userId);
  res.status(200).json(user);
});

export const deleteUserById = asyncHandler(async (req: Request, res: Response) => {
  const { userId } = req.params;
  const deletedUser = await UserService.deleteUserById(userId);
  res.status(200).json(deletedUser);
});

export const patchUserById = asyncHandler(async (req: Request, res: Response) => {
  const { userId } = req.params;
  const { email, password, name, profile_photo_url } = req.body;

  const patchedUser = await UserService.patchUserById(userId, {
    email,
    password,
    name,
    profile_photo_url,
  } as IUser);
  res.status(200).json(patchedUser);
});
