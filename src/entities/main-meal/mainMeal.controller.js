import { createMealService, updateMealStatusService } from "./mainMeal.service.js";

export const createMeal = async (req, res) => {
  const {userId,mealId, date}= req.body;
  try {
    const meal = await createMealService({userId,mealId, date});
    res.status(201).json({ success: true, data: meal });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Failed to create meal', error });
  }
};

export const updateMealStatus = async (req, res) => {
  try {
    const mealId = req.params.id;

    const updatedMeal = await updateMealStatusService(mealId,req.body);
    res.status(200).json({ success: true, data: updatedMeal });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Failed to update meal status', error });
  }
};

