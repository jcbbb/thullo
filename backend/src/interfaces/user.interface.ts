import { Types, Document } from 'mongoose';

export interface IUser extends Document {
  _id: Types.ObjectId;
  name?: string;
  email: string;
  password: string;
  verified?: boolean;
  profile_photo_url?: string;
  gravatar_url?: string;
  blocked?: boolean;
  role: string;
  createdAt?: Date;
  updatedAt?: Date;
  comparePassword: (candidatePassword: string) => Promise<boolean>;
}

export interface IUserFilterOpts {
  limit?: number;
  offset?: number;
}
