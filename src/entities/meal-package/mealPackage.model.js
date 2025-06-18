import mongoose from 'mongoose';

const mealPackageSchema = new mongoose.Schema(
  {
    packageName: {
      type: String,
      required: true,
      trim: true
    },
    image: {
      type: String,
      required: true
    },
    actualPrice: {
      type: Number,
      required: true
    },
    discountedPrice: {
      type: Number,
      required: true
    },
    savings: {
      type: Number,
      required: true
    }
  },
  { timestamps: true }
);

const MealPackage = mongoose.model('MealPackage', mealPackageSchema);

export default MealPackage;

