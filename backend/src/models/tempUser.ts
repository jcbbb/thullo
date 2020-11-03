import { Document, model, Schema, Types } from 'mongoose';
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
  createdAt: Date;
  compareAuthCode: (authCode: string) => Promise<boolean>;
}

tempUserSchema.pre('save', function (next) {
  const tempUser = this as ITempUser;
  bcrypt
    .hash(tempUser.authCode, 10)
    .then((hash) => {
      tempUser.authCode = hash;
      next();
    })
    .catch((err) => next(err));
});

tempUserSchema.index({ email: 1 });

tempUserSchema.methods.compareAuthCode = async function (authCode: string): Promise<boolean> {
  return await bcrypt.compare(authCode, this.authCode);
};

const TempUser = model<ITempUser>('tempusers', tempUserSchema);

export default TempUser;
