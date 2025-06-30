import { generateResponse } from "../../lib/responseFormate.js";
import { createOrderService, getAllOrdersService, getOrderByIdService, updateOrderService, deleteOrderService } from "./order.service.js";

export const createOrderController = async (req, res) => {
  const userId = req.user?._id;
  try {
    const order = await createOrderService({ userId, ...req.body });
    return generateResponse(res, 201, true, 'Order created successfully', order);
  } catch (error) {
    return generateResponse(res, 400, false, error.message, null);
  }
};

export const getAllOrdersController = async (req, res) => {
  try {
    const orders = await getAllOrdersService();
    return generateResponse(res, 200, true, 'Orders fetched successfully', orders);
  } catch (error) {
    return generateResponse(res, 400, false, error.message, null);
  }
};

export const getOrderByIdController = async (req, res) => {
  try {
    const order = await getOrderByIdService(req.params.id);
    return generateResponse(res, 200, true, 'Order fetched successfully', order);
  } catch (error) {
    return generateResponse(res, 400, false, error.message, null);
  }
};

export const updateOrderController = async (req, res) => {
  try {
    const order = await updateOrderService(req.params.id, req.body);
    return generateResponse(res, 200, true, 'Order updated successfully', order);
  } catch (error) {
    return generateResponse(res, 400, false, error.message, null);
  }
};

export const deleteOrderController = async (req, res) => {
  try {
    const order = await deleteOrderService(req.params.id);
    return generateResponse(res, 200, true, 'Order deleted successfully', order);
  } catch (error) {
    return generateResponse(res, 400, false, error.message, null);
  }
};

