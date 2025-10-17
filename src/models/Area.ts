import mongoose, { Schema, Document, Types } from "mongoose";

export interface IArea extends Document {
  _id: Types.ObjectId;
  name: string;
  region: Types.ObjectId; // Reference Region
  createdAt?: Date;
  updatedAt?: Date;
}

const AreaSchema = new Schema<IArea>(
  {
    name: { type: String, required: true },
    region: { type: Schema.Types.ObjectId, ref: "Region", required: true },
  },
  { timestamps: true }
);

const Area = mongoose.model<IArea>("Area", AreaSchema);
export default Area;
