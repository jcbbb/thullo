import { Document, model, Schema, Types } from 'mongoose';

const boardSchema = new Schema(
  {
    title: { type: String, required: true },
    description: { type: String },
    cover_photo_url: { type: String },
    private: { type: Boolean, default: false },
    members: { type: Array },
    admins: { type: Array },
    lists: { type: Array },
    creator: { type: Types.ObjectId, required: true, ref: 'User' },
  },
  { timestamps: true },
);

export interface IBoard extends Document {
  _id: Types.ObjectId;
  title: string;
  cover_photo_url: string;
  private: boolean;
  members: Types.ObjectId[];
  lists: Types.ObjectId[];
  creator: Types.ObjectId;
  cretedAt: Date;
  updatedAt: Date;
}

boardSchema.index({ creator: 1 });

const Board = model<IBoard>('boards', boardSchema);

export default Board;
