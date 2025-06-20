import Meal from './meal.model.js';
import { cloudinaryUpload } from '../../lib/cloudinaryUpload.js';

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

export const getMealByIdService = async (id) => {
  return await Meal.findById(id);
};

export const getMealsService = async (packages = null, days) => {
  const filter = {};

  if (packages) {
    filter.foodPackage = { $in: packages };
  }

  if (days?.length) {
    filter.availability = { $in: days };
  }

  const meals = await Meal.find(filter).lean();

  const grouped = {};

  meals.forEach((meal) => {
    const pkg = meal.foodPackage;
    const day = meal.availability;

    if (!grouped[pkg]) grouped[pkg] = {};
    if (!grouped[pkg][day]) grouped[pkg][day] = [];

    grouped[pkg][day].push(meal);
  });

  // Order by custom day cycle
  const orderedResult = {};

  for (const pkg of Object.keys(grouped)) {
    orderedResult[pkg] = {};
    for (const day of days) {
      if (grouped[pkg][day]) {
        orderedResult[pkg][day] = grouped[pkg][day];
      }
    }
  }

  return orderedResult;
};




export const deleteMealService = async (id) => {
  return await Meal.findByIdAndDelete(id);
};

