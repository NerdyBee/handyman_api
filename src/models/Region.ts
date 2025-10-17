import mongoose, { Schema, Document, Types } from "mongoose";

export interface IRegion extends Document {
  _id: Types.ObjectId; // ✅ Explicitly define ObjectId type
  name: string;
  status: boolean; // true = active, false = inactive
  createdAt?: Date;
  updatedAt?: Date;
}

const RegionSchema = new Schema<IRegion>(
  {
    name: { type: String, required: true, unique: true },
    status: { type: Boolean, default: false },
  },
  { timestamps: true }
);

const Region = mongoose.model<IRegion>("Region", RegionSchema);
export default Region;
