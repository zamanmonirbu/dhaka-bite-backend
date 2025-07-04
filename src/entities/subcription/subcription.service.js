import Payment from '../payment/payment.model.js';
import Subscription from './subcription.model.js';

export const createSubscriptionService = async (subcriptionName, subcriptionPrice, method,subciptionType,userId) => {
  if (!subcriptionName|| !subcriptionPrice || !method || !subciptionType) {
    throw new Error('All fields are required');
  }

  const newSubscription = new Subscription({subcriptionName, subcriptionPrice, method,subciptionType,userId});
  return await newSubscription.save();
};

export const getAllSubscriptionsService = async (userId) => {

  const subscriptions = await Payment.find({ userId }).sort({ createdAt: -1 }).populate('userId');

  const subcriptions = subscriptions.filter(sub => sub.payType === 'subscription');
  const recharges = subscriptions.filter(sub => sub.payType === 'recharge');
  
  return { subcriptions, recharges };
};

export const getSubscriptionByIdService = async (id) => {
  return await Subscription.findById(id);
};

export const updateSubscriptionService = async (id, data) => {
  return await Subscription.findByIdAndUpdate(id, data, { new: true });
};

export const deleteSubscriptionService = async (id) => {
  return await Subscription.findByIdAndDelete(id);
};

