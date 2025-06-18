import { 
  getDeliveryAreasService, 
  getDeliveryAreaByIdService, 
  createDeliveryAreaService, 
  updateDeliveryAreaService, 
  deleteDeliveryAreaService 
} from './deliveryArea.service.js';
import { generateResponse } from '../../lib/responseFormate.js';

export const getDeliveryAreasController = async (req, res) => {
  try {
    const deliveryAreas = await getDeliveryAreasService();
    generateResponse(res, 200, true, 'Delivery areas fetched successfully', deliveryAreas);
  } catch (error) {
    generateResponse(res, 500, false, 'Failed to fetch delivery areas', null);
  }
};

export const getDeliveryAreaByIdController = async (req, res) => {
  try {
    const { id } = req.params;
    const deliveryArea = await getDeliveryAreaByIdService(id);
    generateResponse(res, 200, true, 'Delivery area fetched successfully', deliveryArea);
  } catch (error) {
    generateResponse(res, 500, false, 'Failed to fetch delivery area', null);
  }
};

export const createDeliveryAreaController = async (req, res) => {
  try {
    const deliveryArea = await createDeliveryAreaService(req.body);
    generateResponse(res, 201, true, 'Delivery area created successfully', deliveryArea);
  } catch (error) {
    generateResponse(res, 500, false, 'Failed to create delivery area', null);
  }
};

export const updateDeliveryAreaController = async (req, res) => {
  try {
    const { id } = req.params;
    const deliveryArea = await updateDeliveryAreaService(id, req.body);
    generateResponse(res, 200, true, 'Delivery area updated successfully', deliveryArea);
  } catch (error) {
    generateResponse(res, 500, false, 'Failed to update delivery area', null);
  }
};

export const deleteDeliveryAreaController = async (req, res) => {
  try {
    const { id } = req.params;
    await deleteDeliveryAreaService(id);
    generateResponse(res, 200, true, 'Delivery area deleted successfully', null);
  } catch (error) {
    generateResponse(res, 500, false, 'Failed to delete delivery area', null);
  }
};

