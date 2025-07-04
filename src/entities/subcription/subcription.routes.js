import express from 'express';
import {
  createSubscriptionController,
  getAllSubscriptionsController,
  getSubscriptionByIdController,
  updateSubscriptionController,
  deleteSubscriptionController
} from './subcription.controller.js';
import { userMiddleware } from '../../core/middlewares/authMiddleware.js';

const router = express.Router();

router.post('/', createSubscriptionController);
router.get('/',userMiddleware, getAllSubscriptionsController);
router.get('/:id', getSubscriptionByIdController);
router.put('/:id', updateSubscriptionController);
router.delete('/:id', deleteSubscriptionController);

export default router;

