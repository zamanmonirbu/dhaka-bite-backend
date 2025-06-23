import Subscription from './subcription.model.js';

export const createSubscriptionService = async (subcriptionName, subcriptionPrice, method,subciptionType,userId) => {
  if (!subcriptionName|| !subcriptionPrice || !method || !subciptionType) {
    throw new Error('All fields are required');
  }

  const newSubscription = new Subscription({subcriptionName, subcriptionPrice, method,subciptionType,userId});
  return await newSubscription.save();
};

export const getAllSubscriptionsService = async () => {
  const subscriptions = await Subscription.find({});
  const subcriptions = subscriptions.filter(sub => sub.subciptionType === 'subcription');
  const recharges = subscriptions.filter(sub => sub.subciptionType === 'recharge');
  
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

