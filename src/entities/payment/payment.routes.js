import express from 'express';
import {
  createPaymentController,
  getAllPaymentsController,
  getPaymentByIdController,
  updatePaymentController,
  deletePaymentController,
  getUserBalanceController
} from './payment.controller.js';
import { adminMiddleware, userMiddleware } from '../../core/middlewares/authMiddleware.js';

const router = express.Router();

router.get('/', adminMiddleware, getAllPaymentsController);
router.get('/balance', userMiddleware, getUserBalanceController);
router.get('/:id', getPaymentByIdController);
router.post('/', userMiddleware, createPaymentController);
router.put('/:id', adminMiddleware, updatePaymentController);
router.delete('/:id', deletePaymentController);

export default router;
