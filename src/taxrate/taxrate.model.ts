import * as mongoose from 'mongoose';

export const TaxrateSchema = new mongoose.Schema(
  {
    name: { type: String },
    percentage: { type: Number },
  },
  {
    timestamps: true,
  },
);

export interface Taxrate extends mongoose.Document {
  id: string;
  name: String;
  percentage: Number;
}
