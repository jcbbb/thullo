import { Types } from 'mongoose';
import { BadRequestError } from '../utils/errors';
import User, { IUser } from '../models/user.model';

export const getUserById = async (id: Types.ObjectId): Promise<IUser> => {
  const user = await User.findById(id, { password: 0 });
  if (!user) {
    throw new BadRequestError(`User with id of ${id} does not exist`);
  }
  return user;
};
