import { Document, mode, Schema, Types } from 'mongoose';
import bcrypt from 'bcryptjs';

const tempUserSchema = new Schema({
  email: { type: String, unique: true, required: true },
  authCode: { type: String, required: true },
  createdAt: { type: Date, expires: '1h', default: Date.now },
});

export interface ITempUser extends Document {
  _id: Types.ObjectId;
  email: string;
  authCode: string;
  createdAt: Types.Date;
}

tempUserSchema.pre('save', function (next) {
  bcrypt
    .hash(this.authCode, 10)
    .then((hash) => {
      this.authCode = hash;
    })
    .catch((err) => next(err));
});

tempUserSchema.methods.compareAuthCode = function (authCode) {
  return bcrypt.compare(authCode, this.authCode);
};

const TempUser = model<ITempUser>('tempusers', tempUserSChema);

export default TempUser;
