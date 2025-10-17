import mongoose, { Schema, Document, Types } from "mongoose";

export interface IClient extends Document {
  _id: Types.ObjectId;
  name: string;
  email: string;
  phone: string;
  password: string;
  region?: Types.ObjectId | { _id: Types.ObjectId; name: string };
  area?: Types.ObjectId | { _id: Types.ObjectId; name: string };
  address?: string;
  createdAt?: Date;
  updatedAt?: Date;
}

const ClientSchema: Schema<IClient> = new Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    phone: { type: String, required: true },
    password: { type: String, required: true },
    region: { type: Schema.Types.ObjectId, ref: "Region" },
    area: { type: Schema.Types.ObjectId, ref: "Area" },
    address: String,
  },
  { timestamps: true }
);

const Client = mongoose.model<IClient>("Client", ClientSchema);
export default Client;
