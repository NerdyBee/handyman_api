import mongoose, { Schema, Document, Types } from "mongoose";

export interface ICity extends Document {
  name: string;
  region: Types.ObjectId;
  status: boolean;
}

const CitySchema = new Schema<ICity>({
  name: { type: String, required: true },
  region: { type: Schema.Types.ObjectId, ref: "Region", required: true },
  status: { type: Boolean, default: true },
});

const City = mongoose.model<ICity>("City", CitySchema);
export default City;
