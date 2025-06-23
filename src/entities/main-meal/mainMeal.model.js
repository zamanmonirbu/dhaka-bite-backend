import mongoose from "mongoose";

const mealSchema = new mongoose.Schema(
  {
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    mealId: { type: mongoose.Schema.Types.ObjectId, ref: "Meal" },
    date: String,
    status: { type: String, enum: ["active", "skipped"], default: "active" },
  },
  { timestamps: true }
);

const Mainmeal = mongoose.model("Mainmeal", mealSchema);

export default Mainmeal;

