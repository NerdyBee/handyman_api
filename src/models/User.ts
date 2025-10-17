import { Schema, model } from "mongoose";

export interface IUser {
  name: string;
  email: string;
  password: string;
  role: "client" | "handyman" | "admin";
  phone?: string;
  createdAt?: Date;
  updatedAt?: Date;
}

const userSchema = new Schema<IUser>(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: {
      type: String,
      enum: ["client", "handyman", "admin"],
      default: "client",
    },
    phone: { type: String },
  },
  { timestamps: true }
);

export default model<IUser>("User", userSchema);
