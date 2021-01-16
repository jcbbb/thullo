import { Document, model, Schema, Types } from 'mongoose';

const list_schema = new Schema(
  {
    title: { type: String, required: true },
    order: { type: Number, required: true },
    board_id: { type: Types.ObjectId, required: true },
  },
  { timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' } }
);

export interface IList extends Document {
  _id: Types.ObjectId;
  title: string;
  order: number;
  board_id: Types.ObjectId;
  created_at: Date;
  updated_at: Date;
}

const List = model<IList>('List', list_schema);

export default List;
