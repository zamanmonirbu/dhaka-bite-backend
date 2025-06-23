import cron from "node-cron"
import MeaMainmeal from "../main-meal/mainMeal.model.js"
import User from "../auth/auth.model.js"
import { format, addDays } from "date-fns"

cron.schedule("59 23 * * *", async () => {
  const tomorrow = format(addDays(new Date(), 1), "yyyy-MM-dd")
  const meals = await MeaMainmeal.find({ date: tomorrow })

  for (const meal of meals) {
    const user = await User.findById(meal.userId)
    if (user?.balance > 100) {
      meal.status = "active"
      await meal.save()
      console.log(`✅ Meal activated for user: ${user.name}`)
    }
  }
})
