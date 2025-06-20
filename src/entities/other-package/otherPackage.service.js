import OtherPackage from "./otherPackage.model.js";
import { cloudinaryUpload } from "../../lib/cloudinaryUpload.js";

export const createMealPackageService = async (data, image) => {
  const { packageName, description } = data;
  let imageUrl = null;

  if (image) {
    const result = await cloudinaryUpload(image.path, image.filename, "other-packages");
    imageUrl = result.secure_url;
  }


  const mealPackage = new OtherPackage({
    packageName, description,
    image: imageUrl
  });

  return await OtherPackage.create(mealPackage);
};

export const getMealPackagesService = async () => {
  return await OtherPackage.find().sort({ createdAt: -1 }).limit(3).exec();
};

export const getMealPackageByIdService = async (id) => {
  return await OtherPackage.findById(id);
};

export const updateMealPackageService = async (id, data, image) => {
  const { packageName, description } = data;
  let imageUrl = null;

  if (image) {
    const result = await cloudinaryUpload(image.path, image.filename, "other-packages");
    imageUrl = result.secure_url;
  }


  const updateData = {
    packageName, description
  };

  if (imageUrl) updateData.image = imageUrl;

  return await OtherPackage.findByIdAndUpdate(id, updateData, { new: true });
};

export const deleteMealPackageService = async (id) => {
  return await OtherPackage.findByIdAndDelete(id);
};

