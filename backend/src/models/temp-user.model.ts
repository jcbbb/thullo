import { Document, model, Schema, Types } from 'mongoose';
import argon2 from 'argon2';

const temp_user_schema = new Schema(
  {
    email: { type: String, unique: true, required: true },
    auth_code: { type: String, required: true },
    created_at: { type: Date, expires: '1h', default: Date.now },
  },
  { timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' } }
);

export interface ITempUser extends Document {
  _id: Types.ObjectId;
  email: string;
  auth_code: string;
  created_at: Date;
  updated_at: Date;
  compare_auth_code: (auth_code: string) => Promise<boolean>;
}

temp_user_schema.pre<ITempUser>('save', function (next) {
  argon2
    .hash(this.auth_code)
    .then((hash) => {
      this.auth_code = hash;
      next();
    })
    .catch((err) => next(err));
});

temp_user_schema.index({ email: 1 });

temp_user_schema.methods.compare_auth_code = async function (auth_code: string): Promise<boolean> {
  return await argon2.verify(this.auth_code, auth_code);
};

const TempUser = model<ITempUser>('Tempuser', temp_user_schema);

export default TempUser;
