import { Document, mode, Schema, Types } from 'mongoose';

const boardSchema = new Schema(
  {
    title: { type: String, required: true },
    description: { type: String, required: true },
    cover_photo_url: { type: String },
    private: { type: Boolean, default: false },
    members: { type: Array },
    admins: { type: Array },
    lists: { type: Array },
    creator: { type: Types.ObjectId, required: true },
  },
  { timestamps: true },
);

export interface IBoard extends Document {
  _id: Types.ObjecId;
  title: string;
  cover_photo_url: string;
  private: boolean;
  members: Types.ObjectId[];
  lists: Types.ObjectId[];
  creator: Types.ObjectId;
  cretedAt: Types.Date;
  updatedAt: Types.Date;
}

const Board = model<IBoard>('boards', boardSchema);

export default Board;
