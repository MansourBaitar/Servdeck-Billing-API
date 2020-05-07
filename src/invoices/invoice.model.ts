import * as mongoose from 'mongoose';

export const InvoiceSchema = new mongoose.Schema(
  {
    owner: { type: String },
    customer: [{ type: mongoose.Schema.ObjectId, ref: 'cudstomers' }],
    description: { type: String, required: true },
    products: [
      {
        productsId: { type: mongoose.Schema.ObjectId, ref: 'products' },
        quantity: { type: Number },
        price: { type: Number },
        vat: { type: mongoose.Schema.ObjectId, ref: 'taxrates' },
        productTotal: { type: Number },
      },
    ],
  },
  {
    timestamps: true,
  },
);

export interface Invoice extends mongoose.Document {
  id: string;
  owner: string;
  customer: string;
  description: string;
  products: Invoice[];
}
