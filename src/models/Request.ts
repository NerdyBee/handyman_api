import { Schema, model, Types } from "mongoose";

export interface IRequest {
  client: Types.ObjectId;
  handyman?: Types.ObjectId;
  service: Types.ObjectId;
  details?: string;
  status: "open" | "accepted" | "in_progress" | "completed" | "cancelled";
  price?: number;
}

const requestSchema = new Schema<IRequest>(
  {
    client: { type: Schema.Types.ObjectId, ref: "User", required: true },
    handyman: { type: Schema.Types.ObjectId, ref: "User" },
    service: { type: Schema.Types.ObjectId, ref: "Service", required: true },
    details: { type: String },
    status: {
      type: String,
      enum: ["open", "accepted", "in_progress", "completed", "cancelled"],
      default: "open",
    },
    price: { type: Number },
  },
  { timestamps: true }
);

export default model<IRequest>("Request", requestSchema);
