import { Document, mode, Schema, Types } from 'mongoose';

type Obj = {
  [key: string]: string;
};

const cardSchema = new Schema(
  {
    title: { type: String, required: true },
    description: { type: String },
    cover_photo_url: { type: String },
    labels: { type: Array },
    members: { type: Array },
    attachments: { type: Array },
    order: { type: Number, required: true },
    list_id: { type: Types.ObjectId, required: true },
  },
  { timestamps: true },
);

export interface ICard extends Document {
  _id: Types.ObjecId;
  title: string;
  description: string;
  cover_photo_url: string;
  labels: Obj;
  members: Types.ObjectId[];
  attachments: Obj;
  order: number;
  list_id: Types.ObjectId;
  cretedAt: Types.Date;
  updatedAt: Types.Date;
}

const Card = model<ICard>('cards', cardSchema);

export default Card;
