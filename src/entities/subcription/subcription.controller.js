import { generateResponse } from '../../lib/responseFormate.js';
import {
  createSubscriptionService,
  getAllSubscriptionsService,
  getSubscriptionByIdService,
  updateSubscriptionService,
  deleteSubscriptionService
} from './subcription.service.js';

export const createSubscriptionController = async (req, res) => {
  const { subcriptionName, subcriptionPrice, method,subciptionType,userId } = req.body;
  try {
    const newSubscription = await createSubscriptionService(subcriptionName, subcriptionPrice, method,subciptionType,userId);
    generateResponse(res, 201, true, 'Subscription created successfully', newSubscription);
  } catch (error) {
    generateResponse(res, 500, false, 'Failed to create subscription', error.message);
  }
};

export const getAllSubscriptionsController = async (req, res) => {
  const userId = req.user._id;
  try {
    const subscriptions = await getAllSubscriptionsService(userId);
    generateResponse(res, 200, true, 'Subscriptions fetched successfully', subscriptions);
  } catch (error) {
    generateResponse(res, 500, false, 'Failed to fetch subscriptions', error.message);
  }
};

export const getSubscriptionByIdController = async (req, res) => {
  try {
    const { id } = req.params;
    const subscription = await getSubscriptionByIdService(id);
    if (subscription) {
      generateResponse(res, 200, true, 'Subscription fetched successfully', subscription);
    } else {
      generateResponse(res, 404, false, 'Subscription not found', null);
    }
  } catch (error) {
    generateResponse(res, 500, false, 'Failed to fetch subscription', error.message);
  }
};

export const updateSubscriptionController = async (req, res) => {
  try {
    const { id } = req.params;
    const updatedSubscription = await updateSubscriptionService(id, req.body);
    if (updatedSubscription) {
      generateResponse(res, 200, true, 'Subscription updated successfully', updatedSubscription);
    } else {
      generateResponse(res, 404, false, 'Subscription not found', null);
    }
  } catch (error) {
    generateResponse(res, 500, false, 'Failed to update subscription', error.message);
  }
};

export const deleteSubscriptionController = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedSubscription = await deleteSubscriptionService(id);
    if (deletedSubscription) {
      generateResponse(res, 200, true, 'Subscription deleted successfully', deletedSubscription);
    } else {
      generateResponse(res, 404, false, 'Subscription not found', null);
    }
  } catch (error) {
    generateResponse(res, 500, false, 'Failed to delete subscription', error.message);
  }
};

