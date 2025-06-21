import mongoose from "mongoose";

const offerSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    description: { type: String },
    image: { type: String },
    imagePublicId: { type: String },
    currentPrice: { type: Number, required: true },
    oldPrice: { type: Number, required: true },
    discountPercentage: { type: Number },
    saveAmount: { type: Number },
    rating: { type: Number, default: 0 },
    tag: { type: String }, // e.g., Family Pack
    badge: { type: String }, // e.g., Popular
    expiryDate: { type: Date },
  },
  { timestamps: true }
);

export default mongoose.model("Offer", offerSchema);
