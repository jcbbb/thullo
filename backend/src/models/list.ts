import { Document, model, Schema, Types } from 'mongoose';

const listSchema = new Schema(
  {
    title: { type: String, required: true },
    order: { type: Number, required: true },
    board_id: { type: Types.ObjectId, required: true },
  },
  { timestamps: true },
);

export interface IList extends Document {
  _id: Types.ObjectId;
  title: string;
  order: number;
  board_id: Types.ObjectId;
}

const List = model<IList>('lists', listSchema);

export default List;
