import * as mongoose from 'mongoose';

export const ProductSchema = new mongoose.Schema(
  {
    owner: { type: String },
    title: { type: String, required: true },
    description: { type: String, required: true },
    price: { type: Number, required: true },
  },
  {
    timestamps: true,
  },
);

export interface Product extends mongoose.Document {
  id: string;
  owner: string;
  title: string;
  description: string;
  price: number;
}
