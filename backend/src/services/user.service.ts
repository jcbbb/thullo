import { isValidObjectId } from 'mongoose';
import { BadRequestError } from '../utils/errors';
import User from '../models/user.model';
import { IUser, IUserFilterOpts } from '../interfaces/user.interface';

const defaultProjection = {
  passowrd: 0,
  __v: 0,
};

export const getUserById = async (id: string): Promise<IUser> => {
  if (!isValidObjectId(id)) {
    throw new BadRequestError('Invalid user id');
  }
  const user = await User.findById(id, defaultProjection);
  if (!user) {
    throw new BadRequestError(`User with id of ${id} does not exist`);
  }
  return user;
};

export const deleteUserById = async (id: string) => {
  if (!isValidObjectId(id)) {
    throw new BadRequestError('Invalid user id');
  }
  const deletedUser = await User.findByIdAndRemove(id, { projection: defaultProjection });
  if (!deletedUser) {
    throw new BadRequestError(`User with id of ${id} does not exist`);
  }

  return deletedUser;
};
export const getAllUsers = async ({
  limit = 10,
  offset = 0,
}: IUserFilterOpts): Promise<IUser[]> => {
  return await User.find({}, defaultProjection)
    /* 
      `+offset` converts string type to number type. If can't be converted, 
      NaN will be returned and .skip will get 0 as value. Same logic goes for .limit
    */
    .skip(+offset || 0)
    .limit(Math.min(+limit || 10, 100));
};

export const patchUserById = async (id: string, update: IUser) => {
  if (!isValidObjectId(id)) {
    throw new BadRequestError('Invalid user id');
  }

  return await User.findOneAndUpdate({ _id: id }, update, {
    projection: defaultProjection,
    new: true,
    runValidators: true,
  });
};
