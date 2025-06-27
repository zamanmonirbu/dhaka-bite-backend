import MealPackage from "./mealPackage.model.js";
import { cloudinaryUpload } from "../../lib/cloudinaryUpload.js";

export const createMealPackageService = async (data, image) => {
  const { packageName, actualPrice, discountedPrice } = data;
  let imageUrl = null;

  if (image) {
    const result = await cloudinaryUpload(image.path, image.filename, "meal-packages");
    imageUrl = result.secure_url;
  }

const savings = actualPrice - discountedPrice;

  const mealPackage = new MealPackage({
    packageName,
    actualPrice,
    discountedPrice,
    savings,
    image: imageUrl
  });

  return await MealPackage.create(mealPackage);
};

export const getMealPackagesService = async () => {
  return await MealPackage.find().sort({ createdAt: -1 }).limit(3).exec();
};

export const getMealPackageByIdService = async (id) => {
  return await MealPackage.findById(id);
};

export const updateMealPackageService = async (id, data, image) => {
  const { packageName, actualPrice, discountedPrice } = data;
  let imageUrl = null;

  if (image) {
    const result = await cloudinaryUpload(image.path, image.filename, "meal-packages");
    imageUrl = result.secure_url;
  }

  const savings = actualPrice - discountedPrice;

  const updateData = {
    packageName,
    actualPrice,
    discountedPrice,
    savings
  };

  if (imageUrl) updateData.image = imageUrl;

  return await MealPackage.findByIdAndUpdate(id, updateData, { new: true });
};

export const deleteMealPackageService = async (id) => {
  return await MealPackage.findByIdAndDelete(id);
};

