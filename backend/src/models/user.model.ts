import { Document, model, Schema } from 'mongoose';
import { IUser } from '../interfaces/user.interface';
import argon2 from 'argon2';
import crypto from 'crypto';

const isEmail = (str: string) => str.length > 5;
const isLength = ({ min = 0, max }: { min: number; max?: number }) => (val: string) => {
  return val.length >= min && (typeof max === 'undefined' || val.length <= max);
};

const userSchema = new Schema(
  {
    name: { type: String, required: true },
    email: {
      type: String,
      required: true,
      validate: [isEmail, 'Email is not valid'],
    },
    password: {
      type: String,
      validate: [isLength({ min: 6, max: 10 }), 'Password must be at least 6 characters long'],
    },
    verified: { type: Boolean, default: false },
    profile_photo_url: { type: String },
    gravatar_url: { type: String },
    blocked: { type: Boolean, default: false },
    role: { type: String, default: 'user' },
  },
  { timestamps: true }
);

userSchema.pre<IUser>('save', function (next) {
  if (!this.isModified('password')) return next();
  argon2
    .hash(this.password)
    .then((hash) => {
      this.password = hash;
      next();
    })
    .catch((err) => next(err));
});

userSchema.pre<IUser>('validate', function (next) {
  console.log('this :>> ', this);
  next();
});

userSchema.pre<IUser>('save', function (next) {
  if (!this.email) return next();
  const md5 = crypto.createHash('md5').update(this.email).digest('hex');
  this.gravatar_url = `https://gravatar.com/avatar/${md5}?s=200&d=retro`;
  next();
});

userSchema.index({ email: 1 });

userSchema.methods.comparePassword = async function (candidatePassword: string) {
  return await argon2.verify(this.password, candidatePassword);
};

const User = model<IUser>('User', userSchema);

export default User;
