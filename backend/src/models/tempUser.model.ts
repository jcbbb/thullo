import { Document, model, Schema, Types } from 'mongoose';
import argon2 from 'argon2';

const tempUserSchema = new Schema({
  email: { type: String, unique: true, required: true },
  authCode: { type: String, required: true },
  createdAt: { type: Date, expires: '1h', default: Date.now },
});

export interface ITempUser extends Document {
  _id: Types.ObjectId;
  email: string;
  authCode: string;
  createdAt: Date;
  compareAuthCode: (authCode: string) => Promise<boolean>;
}

tempUserSchema.pre<ITempUser>('save', function (next) {
  argon2
    .hash(this.authCode)
    .then((hash) => {
      this.authCode = hash;
      next();
    })
    .catch((err) => next(err));
});

tempUserSchema.index({ email: 1 });

tempUserSchema.methods.compareAuthCode = async function (authCode: string): Promise<boolean> {
  return await argon2.verify(this.authCode, authCode);
};

const TempUser = model<ITempUser>('Tempuser', tempUserSchema);

export default TempUser;
