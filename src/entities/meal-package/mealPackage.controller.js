import { generateResponse } from "../../lib/responseFormate.js";
import {
  createMealPackageService,
  deleteMealPackageService,
  getMealPackageByIdService,
  getMealPackagesService,
  updateMealPackageService
} from "./mealPackage.service.js";

export const getMealPackagesController = async (req, res) => {
  try {
    const mealPackages = await getMealPackagesService();
    generateResponse(res, 200, true, 'Meal packages fetched successfully', mealPackages);
  } catch (error) {
    generateResponse(res, 500, false, 'Failed to fetch meal packages', null);
  }
};

export const getMealPackageByIdController = async (req, res) => {
  try {
    const { id } = req.params;
    const mealPackage = await getMealPackageByIdService(id);
    generateResponse(res, 200, true, 'Meal package fetched successfully', mealPackage);
  } catch (error) {
    generateResponse(res, 500, false, 'Failed to fetch meal package', null);
  }
};

export const createMealPackageController = async (req, res) => {
  try {
    const image = req?.files?.image?.[0];
    if (!image) return generateResponse(res, 400, false, 'Image is required', null);

    const { packageName, actualPrice, discountedPrice } = req.body;

    const mealPackage = await createMealPackageService({
      packageName,
      actualPrice: Number(actualPrice),
      discountedPrice: Number(discountedPrice)
    }, image);

    generateResponse(res, 201, true, 'Meal package created successfully', mealPackage);
  } catch (error) {
    console.error('Error creating meal package:', error);
    generateResponse(res, 500, false, 'Failed to create meal package', null);
  }
};

export const updateMealPackageController = async (req, res) => {
  try {
    const { id } = req.params;
    const image = req?.files?.image?.[0]; // optional

    const { packageName, actualPrice, discountedPrice } = req.body;

    const mealPackage = await updateMealPackageService(id, {
      packageName,
      actualPrice: Number(actualPrice),
      discountedPrice: Number(discountedPrice)
    }, image);

    generateResponse(res, 200, true, 'Meal package updated successfully', mealPackage);
  } catch (error) {
    console.error('Error updating meal package:', error);
    generateResponse(res, 500, false, 'Failed to update meal package', null);
  }
};

export const deleteMealPackageController = async (req, res) => {
  try {
    const { id } = req.params;
    await deleteMealPackageService(id);
    generateResponse(res, 200, true, 'Meal package deleted successfully', null);
  } catch (error) {
    generateResponse(res, 500, false, 'Failed to delete meal package', null);
  }
};
