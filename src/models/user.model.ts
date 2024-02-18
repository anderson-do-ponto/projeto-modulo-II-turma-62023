import { Document, Schema, model, Model, InferSchemaType } from "mongoose";

const userSchema = new Schema({
  _id: {
    type: Schema.Types.ObjectId,
    auto: true,
    required: true,
  },
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
  jewelsAmount: {
    type: Number,
    default: 0,
  },
  products: [
    {
      type: String,
      ref: "Product",
    },
  ],
  favoriteProducts: [
    {
      type: Schema.Types.ObjectId,
      ref: "Product",
    },
  ],
  photo: {
    type: String,
  },
  isAdmin: {
    type: Boolean,
    default: false,
  },
}, {timestamps: true});

export interface User extends Document {
  _id: Schema.Types.ObjectId;
  name: string;
  email: string;
  password: string;
  jewelsAmount: number;
  products: string[];
  favoriteProducts: Schema.Types.ObjectId[];
  photo?: string;
  isAdmin: boolean;
}

export const UserModel: Model<User> = model<User>("User", userSchema);
