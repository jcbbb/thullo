import { Document, model, Schema, Types } from 'mongoose';

const comment_schema = new Schema(
  {
    card_id: { type: Types.ObjectId, required: true },
    user_id: { type: Types.ObjectId, required: true },
    text: { type: String, required: true },
  },
  { timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' } }
);

export interface IComment extends Document {
  _id: Types.ObjectId;
  card_id: Types.ObjectId;
  user_id: Types.ObjectId;
  text: string;
  created_at: Date;
  udpated_at: Date;
}

const Comment = model<IComment>('Comment', comment_schema);

export default Comment;
