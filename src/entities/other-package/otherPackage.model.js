import mongoose from 'mongoose';

const otherPackageSchema = new mongoose.Schema(
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
    description: {
      type: String,
      required: true,
      trim: true
    }
  },
  { timestamps: true }
);

const OtherPackage = mongoose.model('OtherPackage', otherPackageSchema);

export default OtherPackage;

