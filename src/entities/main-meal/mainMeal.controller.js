import { createMealService, getMealsByUserIdInThisMonthService, getTodayMealsService,mealDeliveryService } from "./mainMeal.service.js";

export const createMeal = async (req, res) => {
  const {userId,mealId, date,status}= req.body;
  try {
    const meal = await createMealService({userId,mealId, date,status});
    res.status(201).json({ success: true, data: meal });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Failed to create meal', error });
  }
};

export const getMealsByUserIdInThisMonth = async (req, res) => {
  const { userId } = req.params;
  try {
    const meals = await getMealsByUserIdInThisMonthService(userId);
    res.status(200).json({ success: true, data: meals });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Failed to get meals', error });
  }
};


export const getTodayMeals = async (req, res) => {
  const { userId } = req.params;
  try {
    const { previousMeals, upcomingMeals } = await getTodayMealsService(userId);
    res.status(200).json({ success: true, data: { previousMeals, upcomingMeals } });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Failed to get today meals', error });
  }
};

export const mealDelivery = async (req, res) => {
  const {  mealId,riderId } = req.body;
  try {
    const meal = mealDeliveryService({ mealId, riderId });
    res.status(200).json({ success: true, data: meal });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Failed to deliver meal', error });
  }
};
