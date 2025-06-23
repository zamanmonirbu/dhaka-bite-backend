import Mainmeal from "./mainMeal.model.js";
import User from "../auth/auth.model.js";
import { isBefore, endOfDay } from "date-fns";

export const createMealService = async ({ userId,mealId, date }) => {

  console.log(userId,mealId, date)

  const user = await User.findById(userId);

  
  if (!user) throw new Error("User not found");

  if (user.balance < 100) {
    return {
      success: false,
      message: "You can't order meal, your balance is less then 100 taka",
    };
  }
  let status = "skipped";
  if (user.balance >= 100) {
    status = "active";
  }

  const meal = await Mainmeal.create({ userId, date,mealId, status });
  return meal;
};

export const updateMealStatusService = async (mealId,{ date,userId}) => {
  const now = new Date();
  const deadline = endOfDay(now);
  if (!isBefore(now, deadline)) {
    throw new Error("You can't update after midnight");
  }

  const meal = await Mainmeal.findById(userId, date,mealId);
  if (!meal) throw new Error("Meal not found");

  // toggle status
  meal.status = meal.status === "active" ? "skipped" : "active";
  await meal.save();
  return meal;
};

