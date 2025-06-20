import { generateResponse } from '../../lib/responseFormate.js';
import {
  createLocationImageService,
  updateLocationImageService,
  getLastThreeLocationImagesService, // ✅ fixed name
  deleteLocationImageService
} from './location.service.js';

export const createLocationController = async (req, res) => {
  try {
    const { title } = req.body;
    const file = req?.files?.image?.[0];
    if (!file) throw new Error('Image file is required');
    const location = await createLocationImageService(title, file);
    generateResponse(res, 201, true, 'Location created successfully', location);
  } catch (error) {
    generateResponse(res, 500, false, 'Failed to create location', error.message);
  }
};

export const updateLocationController = async (req, res) => {
  try {
    const { id } = req.params;
    const { title } = req.body;
    const file = req?.files?.image?.[0];
    if (!file) throw new Error('Image file is required');
    const location = await updateLocationImageService(id, title, file);
    generateResponse(res, 200, true, 'Location updated successfully', location);
  } catch (error) {
    generateResponse(res, 500, false, 'Failed to update location', error.message);
  }
};

export const getLastThreeLocationsController = async (req, res) => {
  try {
    const locations = await getLastThreeLocationImagesService(); // ✅ synced name
    generateResponse(res, 200, true, 'Last 3 locations', locations);
  } catch (error) {
    generateResponse(res, 500, false, 'Failed to get last 3 locations', error.message);
  }
};

export const deleteLocationController = async (req, res) => {
  try {
    const { id } = req.params;
    await deleteLocationImageService(id);
    generateResponse(res, 200, true, 'Location deleted successfully', null);
  } catch (error) {
    generateResponse(res, 500, false, 'Failed to delete location', error.message);
  }
};
