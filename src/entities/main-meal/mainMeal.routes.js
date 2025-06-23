import express from "express"
import { createMeal, updateMealStatus } from "./mainMeal.controller.js"

const router = express.Router()

router.post("/create", createMeal)
router.patch("/update-status/:id", updateMealStatus)

export default router
