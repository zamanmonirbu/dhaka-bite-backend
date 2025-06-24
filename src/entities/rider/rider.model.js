import mongoose from 'mongoose';

const riderSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  phone: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  area: {
    type: String,
    required: true
  },
  vehicleType: {
    type: String,
    enum: ['motorbike', 'car'],
    required: true
  },
  vehicleNumber: {
    type: String,
    required: true
  },
  rating: {
    type: Number,
    default: 0
  },
  totalRide: {
    type: Number,
    default: 0
  },
  isAvailable: {
    type: Boolean,
    default: true
  },
  isVerified: {
    type: Boolean,
    default: false
  },
  verificationCode: {
    type: String,
    default: ''
  },
  verificationCodeExpires: {
    type: Date,
    default: null
  }
}, {
  timestamps: true
});

const Rider = mongoose.model('Rider', riderSchema);

export default Rider;
