import { model, Schema } from 'mongoose';
import { IUser } from '../interfaces/user.interface';
import argon2 from 'argon2';
import crypto from 'crypto';

const email_regex = /^(([^<>()[\].,;:\s@"]+(\.[^<>()[\].,;:\s@"]+)*)|(".+"))@(([^<>()[\].,;:\s@"]+\.)+[^<>()[\].,;:\s@"]{2,})$/i;

const user_schema = new Schema(
  {
    name: { type: String, required: true },
    email: {
      type: String,
      required: true,
      match: [email_regex, 'Email is not valid'],
    },
    password: {
      type: String,
      minlength: [6, 'Password must be at least 6 characters long'],
    },
    verified: { type: Boolean, default: false },
    profile_photo_url: { type: String },
    gravatar_url: { type: String },
    blocked: { type: Boolean, default: false },
    role: { type: String, default: 'user' },
  },
  { timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' } }
);

user_schema.pre<IUser>('save', async function (next) {
  if (!this.isModified('password')) return next();
  try {
    const hash = await argon2.hash(this.password);
    this.password = hash;
    next();
  } catch (err) {
    next(err);
  }
});

user_schema.pre<IUser>('save', function (next) {
  if (!this.email) return next();
  const md5 = crypto.createHash('md5').update(this.email).digest('hex');
  this.gravatar_url = `https://gravatar.com/avatar/${md5}?s=200&d=retro`;
  next();
});

user_schema.pre('findOneAndUpdate', async function (next) {
  const query = this as any;
  const user: IUser = await query.model.findOne(query.getQuery());
  const is_match = await user.compare_password(query._update.password);
  if (!is_match) {
    try {
      const hash = await argon2.hash(query._update.password);
      query._update.password = hash;
    } catch (err) {
      next(err);
    }
  }
});

user_schema.index({ email: 1 });

user_schema.methods.compare_password = async function (candidate_password: string) {
  return await argon2.verify(this.password, candidate_password);
};

const User = model<IUser>('User', user_schema);

export default User;
