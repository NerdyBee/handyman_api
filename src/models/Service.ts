import { Schema, model, Document } from "mongoose";

interface IReview {
  name: string;
  comment: string;
  rating: number;
}

interface IFaq {
  question: string;
  answer: string;
}

export interface IService extends Document {
  title: string;
  icon?: string;
  category?: string;
  description?: string;
  pricing?: string;
  reviews?: IReview[];
  faqs?: IFaq[];
}

const reviewSchema = new Schema<IReview>(
  {
    name: { type: String, required: true },
    comment: { type: String, required: true },
    rating: { type: Number, required: true, min: 1, max: 5 },
  },
  { _id: false }
);

const faqSchema = new Schema<IFaq>(
  {
    question: { type: String, required: true },
    answer: { type: String, required: true },
  },
  { _id: false }
);

const serviceSchema = new Schema<IService>(
  {
    title: { type: String, required: true },
    icon: { type: String },
    category: { type: String },
    description: { type: String },
    pricing: { type: String },
    reviews: [reviewSchema],
    faqs: [faqSchema],
  },
  { timestamps: true }
);

export default model<IService>("Service", serviceSchema);
