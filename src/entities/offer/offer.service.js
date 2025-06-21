import { cloudinaryUpload } from "../../lib/cloudinaryUpload.js";
import Offer from "./offer.model.js";

export const createOfferService = async (data, file) => {
  if (file) {
    const upload = await cloudinaryUpload(file.path, `offer-${Date.now()}`, "offers");
    if (upload === "file upload failed") throw new Error("Image upload failed");
    data.image = upload.secure_url;
    data.imagePublicId = upload.public_id;
  }

  // Calculate discount & savings
  const saveAmount = data.oldPrice - data.currentPrice;
  const discountPercentage = Math.round((saveAmount / data.oldPrice) * 100);
  data.saveAmount = saveAmount;
  data.discountPercentage = discountPercentage;

  const offer = await Offer.create(data);
  return offer;
};

export const getAllOffersService = async (page, limit) => {
  const currentDate = new Date();

  const filter = {
    expiryDate: { $gte: currentDate },
  };

  const skip = (page - 1) * limit;

  const total = await Offer.countDocuments(filter);

  const offers = await Offer.find(filter)
    .sort({ createdAt: -1 })
    .skip(skip)
    .limit(limit);

  return { offers, total };
};


export const deleteOfferService = async (id) => {
  const offer = await Offer.findById(id);
  if (!offer) throw new Error("Offer not found");
  if (offer.imagePublicId) await cloudinary.uploader.destroy(offer.imagePublicId);
  await offer.deleteOne();
  return offer;
};
