import { generateResponse } from '../../lib/responseFormate.js';
import { 
  createPaymentService, 
  getAllPaymentsByStatusService, 
  getPaymentByIdService, 
  updatePaymentService, 
  deletePaymentService, 
  getUserBalanceService
} from './payment.service.js';


export const createPaymentController = async (req, res) => {
  try {
    const userId = req.user._id; 
    if (!userId) {
      return generateResponse(res, 401, false, 'User is not authenticated', null);
    }
    const payment = await createPaymentService(req.body, userId);
    return generateResponse(res, 201, true, 'Payment created successfully', payment);
  } catch (error) {
    return generateResponse(res, 500, false, 'Failed to create payment', error.message);
  }
};

export const getAllPaymentsController = async (req, res) => {
  try {
    const { page = 1, limit = 10, status = "pending" } = req.query;

    const result = await getAllPaymentsByStatusService({ page, limit, status });

    return generateResponse(res, 200, true, "Payments fetched successfully", result);
  } catch (error) {
    return generateResponse(res, 500, false, "Failed to fetch payments", error.message);
  }
};


export const getPaymentByIdController = async (req, res) => {
  try {
    const payment = await getPaymentByIdService(req.params.id);
    return generateResponse(res, 200, true, 'Payment fetched successfully', payment);
  } catch (error) {
    return generateResponse(res, 500, false, 'Failed to fetch payment', error.message);
  }
};

export const updatePaymentController = async (req, res) => {
  try {
    const payment = await updatePaymentService(req.params.id, req.body);
    return generateResponse(res, 200, true, 'Payment updated successfully', payment);
  } catch (error) {
    return generateResponse(res, 500, false, 'Failed to update payment', error.message);
  }
};

export const deletePaymentController = async (req, res) => {
  try {
    const payment = await deletePaymentService(req.params.id);
    return generateResponse(res, 200, true, 'Payment deleted successfully', payment);
  } catch (error) {
    return generateResponse(res, 500, false, 'Failed to delete payment', error.message);
  }
};



export const getUserBalanceController = async (req, res) => {
  try {
    const userId = req.user?._id; // Assuming user ID is stored in req.user

    if (!userId) {
      return generateResponse(res, 400, false, 'User ID is required', null);
    }
    
    const balance = await getUserBalanceService(userId);
    return generateResponse(res, 200, true, 'User balance fetched successfully', { balance });
  } catch (error) {
    return generateResponse(res, 500, false, 'Failed to fetch user balance', error.message);
  }
};