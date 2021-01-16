import { Response, Request } from 'express';
import { async_handler } from '../utils/async-handler';
import { IUser, IUserFilterOpts } from '../interfaces/user.interface';
import * as UserService from '../services/user.service';

export const get_profile = async_handler(async (req: Request, res: Response) => {
  const { _id } = req.user;
  const user = await UserService.get_user_by_id((_id as unknown) as string);
  res.status(200).json(user);
});

export const get_all_users = async_handler(async (req: Request, res: Response) => {
  let { limit, offset } = req.query;
  const users = await UserService.get_all_users({ limit, offset } as IUserFilterOpts);
  res.status(200).json(users);
});

export const get_user_by_id = async_handler(async (req: Request, res: Response) => {
  const { user_id } = req.params;
  const user = await UserService.get_user_by_id(user_id);
  res.status(200).json(user);
});

export const delete_user_by_id = async_handler(async (req: Request, res: Response) => {
  const { user_id } = req.params;
  const deleted_user = await UserService.delete_user_by_id(user_id);
  res.status(200).json(deleted_user);
});

export const patch_user_by_id = async_handler(async (req: Request, res: Response) => {
  const { user_id } = req.params;
  const { email, password, name, profile_photo_url } = req.body;

  const patched_user = await UserService.patch_user_by_id(user_id, {
    email,
    password,
    name,
    profile_photo_url,
  } as IUser);
  res.status(200).json(patched_user);
});
