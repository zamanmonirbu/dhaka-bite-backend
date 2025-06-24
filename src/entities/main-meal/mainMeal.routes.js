import express from "express"
import { createMeal, getMealsByUserIdInThisMonth, getTodayMeals,mealDelivery } from "./mainMeal.controller.js"

const router = express.Router()

router.post("/create", createMeal)
router.get("/user/:userId/this-month", getMealsByUserIdInThisMonth)
router.get("/user/:userId/today", getTodayMeals)
router.post("/meal-delivery", mealDelivery)

export default router


