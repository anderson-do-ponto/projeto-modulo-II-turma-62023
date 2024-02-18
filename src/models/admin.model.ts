import { Schema, model, Model, InferSchemaType } from 'mongoose';

const adminSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
});

export type Admin = InferSchemaType<typeof adminSchema>;

export const AdminModel: Model<Admin> = model('Admin', adminSchema);
