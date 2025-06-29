import express from 'express';
import {
  createPaymentController,
  getAllPaymentsController,
  getPaymentByIdController,
  updatePaymentController,
  deletePaymentController,
} from './payment.controller.js';
import { adminMiddleware, userMiddleware } from '../../core/middlewares/authMiddleware.js';

const router = express.Router();

router.post('/',userMiddleware, createPaymentController);
router.get('/', getAllPaymentsController);
router.get('/:id', getPaymentByIdController);
router.put('/:id', updatePaymentController);
router.delete('/:id', deletePaymentController);

export default router;
