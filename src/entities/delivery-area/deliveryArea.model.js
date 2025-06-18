import mongoose from 'mongoose';

const deliveryAreaSchema = new mongoose.Schema(
  {
    areaName: {
      type: String,
      required: true,
      trim: true,
      unique: true
    },
    latitude: {
      type: Number,
      required: true
    },
    longitude: {
      type: Number,
      required: true
    },
    radius: {
      type: Number,
      required: true
    }
  },
  {
    timestamps: true
  }
);

const DeliveryArea = mongoose.model('DeliveryArea', deliveryAreaSchema);

export default DeliveryArea;
