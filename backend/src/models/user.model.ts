import { Document, model, Schema, Types } from 'mongoose';
import bcrypt from 'bcryptjs';
import crypto from 'crypto';

const userSchema = new Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String },
    verified: { type: Boolean, default: false },
    profile_photo_url: { type: String },
    gravatar_url: { type: String },
    blocked: { type: Boolean, default: false },
    role: { type: String, default: 'user' },
  },
  { timestamps: true }
);

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

userSchema.pre<IUser>('save', function (next) {
  if (!this.isModified('password')) return next();
  bcrypt
    .hash(this.password, 10)
    .then((hash) => {
      this.password = hash;
      next();
    })
    .catch((err) => next(err));
});

userSchema.pre<IUser>('save', function (next) {
  if (!this.email) return next();
  const md5 = crypto.createHash('md5').update(this.email).digest('hex');
  this.gravatar_url = `https://gravatar.com/avatar/${md5}?s=200&d=retro`;
  next();
});

userSchema.index({ email: 1 });

userSchema.methods.comparePassword = async function (candidatePassword: string) {
  return await bcrypt.compare(candidatePassword, this.password);
};

const User = model<IUser>('User', userSchema);

export default User;
