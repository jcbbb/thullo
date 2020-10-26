import { Document, model, Schema, Types } from 'mongoose';
import bcrypt from 'bcryptjs';

const userSchema = new Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
    verified: { type: Boolean, default: false },
    profile_photo_url: { type: String },
    gravatar_url: { type: String },
    blocked: { type: Boolean, default: false },
    role: { type: String, default: 'user' },
  },
  { timestamps: true },
);

export interface IUser extends Document {
  _id: Types.ObjectId;
  name: string;
  email: string;
  password: string;
  verified: boolean;
  profile_photo_url: string;
  gravatar_url: string;
  blocked: boolean;
  role: string;
  createdAt: Date;
  updatedAt: Date;
  comparePassword: (candidatePassword: string) => boolean;
}

userSchema.pre('save', function (next) {
  const user = this as IUser;
  if (!user.isModified('password')) return next();
  bcrypt
    .hash(user.password, 10)
    .then((hash) => {
      user.password = hash;
    })
    .catch((err) => next(err));
});

userSchema.methods.comparePassword = function (candidatePassword: string) {
  return bcrypt.compare(candidatePassword, this.password);
};

const User = model<IUser>('users', userSchema);

export default User;
