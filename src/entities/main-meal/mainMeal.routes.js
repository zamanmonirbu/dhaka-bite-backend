import express from "express"
import { createMeal, getMealsByUserIdInThisMonth, getTodayMeals } from "./mainMeal.controller.js"

const router = express.Router()

router.post("/create", createMeal)
router.get("/user/:userId/this-month", getMealsByUserIdInThisMonth)
router.get("/user/:userId/today", getTodayMeals)

export default router


