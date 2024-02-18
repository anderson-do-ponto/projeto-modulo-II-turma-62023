import { Schema, model, Model, InferSchemaType } from 'mongoose';

const productSchema = new Schema({
  name: {
    type: String,
    required: true,
    maxLength: 24,
    unique: true,
  },
  value: {
    type: Number,
    required: true,
  },
  amount: {
    type: Number,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  photo: {
    type: String,
    required: true,
  },
});

export type Product = InferSchemaType<typeof productSchema>;

export const ProductModel: Model<Product> = model('Product', productSchema);
