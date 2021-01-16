import { Document, model, Schema, Types } from 'mongoose';

type Obj = {
  [key: string]: string;
};

const card_schema = new Schema(
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
  { timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' } }
);

export interface ICard extends Document {
  _id: Types.ObjectId;
  title: string;
  description: string;
  cover_photo_url: string;
  labels: Obj;
  members: Types.ObjectId[];
  attachments: Obj;
  order: number;
  list_id: Types.ObjectId;
  created_at: Date;
  updated_at: Date;
}

const Card = model<ICard>('Card', card_schema);

export default Card;
