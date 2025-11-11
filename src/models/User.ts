import { Schema, model } from "mongoose";

export interface IUser {
  name: string;
  email: string;
  password: string;
  role: "super admin" | "admin";
  phone?: string;
  status: "Active" | "Inactive";
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
      enum: ["super admin", "admin"],
      default: "admin",
    },
    status: {
      type: String,
      enum: ["Active", "Inactive"],
      default: "Active",
    },

    phone: { type: String },
  },
  { timestamps: true }
);

export default model<IUser>("User", userSchema);
