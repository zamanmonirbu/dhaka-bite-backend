import Mainmeal from "./mainMeal.model.js";
import User from "../auth/auth.model.js";
import { isBefore, endOfDay } from "date-fns";
export const createMealService = async ({ userId, mealId, date, status }) => {
  const existingMeal = await Mainmeal.findOne({ userId, mealId, date })

  if (existingMeal) {
    existingMeal.status = status
    await existingMeal.save()
    return existingMeal
  }

  const user = await User.findById(userId)
  if (!user) {
    throw new Error("User not found")
  }

  if (user.balance < 100) {
    throw new Error("You can't order meal, your balance is less than 100 taka")
  }

  const meal = await Mainmeal.create({ userId, date, mealId, status })
  return meal
}


export const getMealsByUserIdInThisMonthService = async (userId) => {
  const now = new Date()
  const firstDayOfMonth = new Date(now.getFullYear(), now.getMonth(), 1)
  const lastDayOfMonth = new Date(now.getFullYear(), now.getMonth() + 1, 0)

  return await Mainmeal.find({
    userId,
    date: {
      $gte: firstDayOfMonth.toISOString(),
      $lte: lastDayOfMonth.toISOString()
    }
  }).sort({ date: 1 })
}


export const getTodayMealsService = async (userId) => {
  const now = new Date()
  const today = now.toISOString().split('T')[0]
  const firstDayOfMonth = new Date(now.getFullYear(), now.getMonth(), 1)
  const lastDayOfMonth = new Date(now.getFullYear(), now.getMonth() + 1, 0)

  const previousMeals = await Mainmeal.find({
    userId,
    date: {
      $gte: firstDayOfMonth.toISOString(),
      $lt: today
    },
    status: "active"
  })
  .populate({
    path: 'mealId',
    select: 'name price image time foodPackage'
  })
  .sort({ date: -1 })

  const upcomingMeals = await Mainmeal.find({
    userId,
    date: {
      $gte: today,
      $lte: lastDayOfMonth.toISOString()
    },
    status: "active"
  })
  .populate({
    path: 'mealId',
    select: 'name price image time foodPackage'
  })
  .sort({ date: 1 })

  return {
    previousMeals,
    upcomingMeals
  }
}

