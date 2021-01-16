import { isValidObjectId } from 'mongoose';
import { BadRequestError, ResourceNotFoundError } from '../utils/errors';
import User from '../models/user.model';
import { IUser, IUserFilterOpts } from '../interfaces/user.interface';

const default_projection = {
  password: 0,
  __v: 0,
};

export const get_user_by_id = async (id: string): Promise<IUser> => {
  if (!isValidObjectId(id)) {
    throw new BadRequestError('Invalid user id');
  }
  const user = await User.findById(id, default_projection);
  if (!user) {
    throw new ResourceNotFoundError(`User with id of ${id} does not exist`);
  }
  return user;
};

export const delete_user_by_id = async (id: string) => {
  if (!isValidObjectId(id)) {
    throw new BadRequestError('Invalid user id');
  }
  const deleted_user = await User.findByIdAndRemove(id, { projection: default_projection });
  if (!deleted_user) {
    throw new BadRequestError(`User with id of ${id} does not exist`);
  }

  return deleted_user;
};
export const get_all_users = async ({
  limit = 10,
  offset = 0,
}: IUserFilterOpts): Promise<IUser[]> => {
  return await User.find({}, default_projection)
    /*
      `+offset` converts string type to number type. If can't be converted,
      NaN will be returned and .skip will get 0 as value. Same logic goes for .limit
    */
    .skip(+offset || 0)
    .limit(Math.min(+limit || 10, 100));
};

const clean_up = <T>(obj: T): T => {
  for (const key in obj) {
    if (!obj[key]) delete obj[key];
  }
  return obj;
};

export const patch_user_by_id = async (id: string, update: IUser) => {
  const clean_update = clean_up<IUser>(update);
  if (!isValidObjectId(id)) {
    throw new BadRequestError('Invalid user id');
  }

  return await User.findOneAndUpdate({ _id: id }, clean_update, {
    projection: default_projection,
    new: true,
    runValidators: true,
  });
};
