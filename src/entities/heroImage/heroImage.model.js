import mongoose from 'mongoose';

const heroImageSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    image: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

const HeroImage = mongoose.model('HeroImage', heroImageSchema);

export default HeroImage;
