import { Document, mode, Schema, Types } from 'mongoose';

const commentSchema = new Schema(
  {
    card_id: { type: Types.ObjectId, required: true },
    user_id: { type: Types.ObjectId, required: true },
    text: { type: String, required: true },
  },
  { timestamps: true },
);

export interface IComment extends Document {
  _id: Types.ObjecId;
  card_id: Types.ObjectId;
  user_id: Types.ObjectId;
  text: string;
  cretedAt: Types.Date;
  updatedAt: Types.Date;
}

const Comment = model<IComment>('cards', commentSchema);

export default Comment;
