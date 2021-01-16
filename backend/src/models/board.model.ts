import { Document, model, Schema, Types } from 'mongoose';

const board_schema = new Schema(
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
  { timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' } }
);

export interface IBoard extends Document {
  _id: Types.ObjectId;
  title: string;
  cover_photo_url: string;
  private: boolean;
  members: Types.ObjectId[];
  lists: Types.ObjectId[];
  creator: Types.ObjectId;
  created_at: Date;
  updated_at: Date;
}

board_schema.index({ creator: 1 });

const Board = model<IBoard>('Board', board_schema);

export default Board;
