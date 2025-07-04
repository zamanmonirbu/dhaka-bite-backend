// import { getMealPackageByIdService } from "../meal-package/mealPackage.service";

import { generateResponse } from "../../lib/responseFormate.js";
import { getMealPackageByIdService } from "../meal-package/mealPackage.service.js";
import { createMealService, deleteMealService, getMealByIdService, getMealsService, updateMealService } from "./meal.service.js";


export const getMealsController = async (req, res) => {
  try {
  const { foodPackage, today } = req.query;

let packages = (foodPackage || '').split(',').filter(Boolean);
let days = [];

if (today) {
  days = getDayCycle(today.toLowerCase());
} else {
  // Default: start from friday
  days = getDayCycle('friday');
}

const meals = await getMealsService(
  packages.length > 0 ? packages : null,
  days
);

    generateResponse(res, 200, true, 'Meals fetched successfully', meals);
  } catch (error) {
    console.error('Error:', error);
    generateResponse(res, 500, false, 'Failed to fetch meals', null);
  }
};

const dayList = ['sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday'];

function getDayCycle(startDay) {
  const index = dayList.indexOf(startDay);
  if (index === -1) return dayList;

  const reordered = [...dayList.slice(index), ...dayList.slice(0, index)];
  return reordered.slice(0, 7); // 7-day loop
}


// const dayList = ['sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday'];

// const getDayIndex = (day) => {
//   return dayList.indexOf(day.toLowerCase());
// };


export const getMealByIdController = async (req, res) => {
  try {
    const { foodPackage } = req.params;

    // console.log('Fetching meal for food package:', foodPackage);

    const meal = await getMealByIdService(foodPackage);
    generateResponse(res, 200, true, 'Meal fetched successfully', meal);
  } catch (error) {
    generateResponse(res, 500, false, 'Failed to fetch meal', null);
  }
};

export const createMealController = async (req, res) => {
  try {
     // Parse ingredients if it's string
    if (typeof req.body.ingredients === 'string') {
      req.body.ingredients = JSON.parse(req.body.ingredients);
    }
    const image = req?.files?.image?.[0]; // optional
    const { name, time,foodPackage, description, ingredients, price, availability, deliveryCharges } = req.body;

    const meal = await createMealService({ name, time,foodPackage, description, ingredients, price, availability, deliveryCharges }, image);

    generateResponse(res, 201, true, 'Meal created successfully', meal);
} catch (error) {
  console.error('Error creating meal:', error);
  generateResponse(res, 500, false, error.message || 'Failed to create meal', null);
}

};

export const updateMealController = async (req, res) => {
  try {
    const { id } = req.params;
    const image = req?.files?.image?.[0]; // optional
    const { name, time,foodPackage, description, ingredients, price, availability, deliveryCharges } = req.body;

    const meal = await updateMealService(id, { name, time,foodPackage, description, ingredients, price, availability, deliveryCharges }, image);

    generateResponse(res, 200, true, 'Meal updated successfully', meal);
  } catch (error) {
    console.error('Error updating meal:', error);
    generateResponse(res, 500, false, 'Failed to update meal', null);
  }
};

export const deleteMealController = async (req, res) => {
  try {
    const { id } = req.params;
    await deleteMealService(id);
    generateResponse(res, 200, true, 'Meal deleted successfully', null);
  } catch (error) {
    generateResponse(res, 500, false, 'Failed to delete meal', null);
  }
};
