import mongoose, { Schema, Document } from "mongoose";

export interface IHandyman extends Document {
  name: string;
  slug: string;
  image?: string;
  services: string;
  specialties: string[];
  rating: number;
  reviewsCount: number;
  bio: string;
  rates: {
    hourly: string;
    minimum: string;
    travel: string;
  };
  portfolio: string[];
  reviews: {
    name: string;
    date: string;
    rating: number;
    comment: string;
  }[];
  contact: {
    phone: string;
    availability: string;
  };
}

const HandymanSchema = new Schema<IHandyman>(
  {
    name: { type: String, required: true },
    slug: { type: String, required: true, unique: true },
    image: String,
    services: String,
    specialties: [String],
    rating: Number,
    reviewsCount: Number,
    bio: String,
    rates: {
      hourly: String,
      minimum: String,
      travel: String,
    },
    portfolio: [String],
    reviews: [
      {
        name: String,
        date: String,
        rating: Number,
        comment: String,
      },
    ],
    contact: {
      phone: String,
      availability: String,
    },
  },
  { timestamps: true }
);

export default mongoose.model<IHandyman>("Handyman", HandymanSchema);
