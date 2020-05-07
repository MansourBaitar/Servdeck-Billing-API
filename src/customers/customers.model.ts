import * as mongoose from 'mongoose';

export const CustomerSchema = new mongoose.Schema(
  {
    _owner: { type: String },
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    street: { type: String },
    number: { type: String },
    zipCode: { type: String },
    city: { type: String },
    companyName: { type: String },
    vatNumber: { type: String },
  },
  {
    timestamps: true,
  },
);

export interface Customer extends mongoose.Document {
  id: string;
  _owner: string;
  firstName: string;
  lastName: string;
  street: string;
  number: string;
  zipCode: string;
  city: string;
  companyName: string;
  vatNumber: string;
}
