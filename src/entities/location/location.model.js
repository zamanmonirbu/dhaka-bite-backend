import mongoose from 'mongoose';

const locationSchema = new mongoose.Schema(
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

const Location = mongoose.model('Location', locationSchema);

export default Location;
