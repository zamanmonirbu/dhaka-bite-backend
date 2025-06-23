import mongoose from 'mongoose';

const subscriptionSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    subcriptionName: {
      type: String,
      required: true,
    },
    subcriptionPrice: {
      type: Number,
      required: true,
      min: 0,
    },
    subciptionType: {
      type: String,
      enum: ['subcription', 'recharge'],
      required: true,
    },
    method: {
      type: String,
      enum: ['bkash', 'nagad', 'rocket', 'card'],
      required: true,
    }
  },
  { timestamps: true }
);

const Subscription = mongoose.model('Subscription', subscriptionSchema);

export default Subscription;
