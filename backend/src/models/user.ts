import { Document, mode, Schema, Types } from 'mongoose';
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
  _id: Types.ObjecId;
  name: string;
  email: string;
  password: string;
  verified: boolean;
  profile_photo_url: string;
  gravatar_url: string;
  blocked: boolean;
  role: string;
  createdAt: Types.Date;
  updatedAt: Types.Date;
}

userSchema.pre('save', function (next) {
  bcrypt
    .hash(this.password, 10)
    .then((hash) => {
      this.password = hash;
    })
    .catch((err) => next(err));
});

userSchema.methods.comparePassword = async function (candidatePassword) {
  return bcrypt.compare(candidatePassword, this.password);
};

const User = model<IUser>('users', userSchema);

export default User;
