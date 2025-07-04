import Meal from './meal.model.js';
import { cloudinaryUpload } from '../../lib/cloudinaryUpload.js';
import MealPackage from '../meal-package/mealPackage.model.js';

export const createMealService = async (data, image) => {
  const { name, time,foodPackage, description, ingredients, price, availability, deliveryCharges } = data;


  let imageUrl = null;

  if (image) {
    const result = await cloudinaryUpload(image.path, image.filename, "meals");
    imageUrl = result.secure_url;
  }

  const meal = new Meal({
    name,
    time,
    foodPackage,
    description,
    image: imageUrl,
    ingredients,
    price, availability, deliveryCharges
  });

  const existingMeal = await Meal.findOne({
    foodPackage: meal.foodPackage,
    time: meal.time,
    availability: meal.availability,
  });

  if (existingMeal) {
    throw new Error('Meal already exists for this day and time');
  }

  return await meal.save();

};

export const updateMealService = async (id, data, image) => {
  const { name, time, foodPackage, description, ingredients, price, availability, deliveryCharges } = data;
  let imageUrl = null;

  if (image) {
    const result = await cloudinaryUpload(image.path, image.filename, "meals");
    imageUrl = result.secure_url;
  }

  const updateData = {
    name,
    time,
    foodPackage,
    description,
    ingredients,
    price, availability, deliveryCharges
    };

  if (imageUrl) updateData.image = imageUrl;

  return await Meal.findByIdAndUpdate(id, updateData, { new: true });
};

export const getMealByIdService = async (foodPackage) => {

  const foodPackageFound = await MealPackage.findOne({ packageName: foodPackage });


  return await Meal.find({ foodPackage: foodPackageFound._id });
};


export const getMealsService = async (packages = null, days = [
  "sunday", "monday", "tuesday", "wednesday", "thursday", "friday", "saturday"
]) => {
  const filter = {};

  if (packages && packages.length) {
    filter.foodPackage = { $in: packages.map((id) => new mongoose.Types.ObjectId(id)) };
  }

  if (days?.length) {
    filter.availability = { $in: days };
  }

  const meals = await Meal.find(filter)
    .populate({
      path: "foodPackage",
      select: "packageName actualPrice discountedPrice savings image",
    })
    .lean();

  const grouped = new Map();

  for (const meal of meals) {
    const pkg = meal.foodPackage;
    const day = meal.availability;

    if (!pkg || typeof pkg !== "object") continue;

    const pkgId = pkg._id.toString();

    if (!grouped.has(pkgId)) {
      grouped.set(pkgId, {
        packageInfo: pkg,
        days: {},
      });
    }

    const entry = grouped.get(pkgId);

    if (!entry.days[day]) {
      entry.days[day] = [];
    }

    entry.days[day].push(meal);
  }

  // Convert to array and order days
  const result = [];

  for (const [, { packageInfo, days: rawDays }] of grouped.entries()) {
    const orderedDays = {};

    for (const day of days) {
      if (rawDays[day]) {
        orderedDays[day] = rawDays[day];
      }
    }

    result.push({ packageInfo, days: orderedDays });
  }

  return result;
};




export const deleteMealService = async (id) => {
  return await Meal.findByIdAndDelete(id);
};



export const getMealByUserIdService = async (userId) => {
  return await Meal.find({ userId })
    .populate({
      path: 'foodPackage',
      select: 'name price image time',
    })
    .sort({ date: -1 });
};
