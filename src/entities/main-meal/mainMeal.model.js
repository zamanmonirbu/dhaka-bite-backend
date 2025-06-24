import mongoose from "mongoose";

const mealSchema = new mongoose.Schema(
  {
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    mealId: { type: mongoose.Schema.Types.ObjectId, ref: "Meal" },
    date: String,
    status: { type: String, enum: ["active", "skipped"], default: "active" },
    isDelivered: { type: Boolean, default: false },
    delivermanId: { type: mongoose.Schema.Types.ObjectId, ref: "Rider" },
    deliveryTime: { type: String, default: null },
  },
  { timestamps: true }
);

const Mainmeal = mongoose.model("Mainmeal", mealSchema);

export default Mainmeal;

