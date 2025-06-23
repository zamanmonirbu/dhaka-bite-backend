import express from 'express';
import {
  createSubscriptionController,
  getAllSubscriptionsController,
  getSubscriptionByIdController,
  updateSubscriptionController,
  deleteSubscriptionController
} from './subcription.controller.js';

const router = express.Router();

router.post('/', createSubscriptionController);
router.get('/', getAllSubscriptionsController);
router.get('/:id', getSubscriptionByIdController);
router.put('/:id', updateSubscriptionController);
router.delete('/:id', deleteSubscriptionController);

export default router;

