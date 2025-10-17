// File: src/models/Booking.ts
import mongoose, { Schema, Document, Types } from "mongoose";

export interface IBooking extends Document {
  service: string;
  address: string;
  phone: string;
  date: string;
  time: string;
  status: "pending" | "confirmed" | "completed" | "canceled";
  client?: Types.ObjectId; // Optional reference to Client
  handyman?: Types.ObjectId; // Optional reference to Handyman
  createdAt: Date;
}

const BookingSchema: Schema = new Schema(
  {
    service: { type: String, required: true },
    address: { type: String, required: true },
    phone: { type: String, required: true },
    date: { type: String, required: true },
    time: { type: String, required: true },
    status: {
      type: String,
      enum: ["pending", "confirmed", "completed", "canceled"],
      default: "pending",
    },
    client: { type: Schema.Types.ObjectId, ref: "Client", required: false },
    handyman: { type: Schema.Types.ObjectId, ref: "Handyman", required: false },
  },
  { timestamps: true }
);

export default mongoose.model<IBooking>("Booking", BookingSchema);
