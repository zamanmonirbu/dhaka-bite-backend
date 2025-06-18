import DeliveryArea from "./deliveryArea.model.js";

export const getDeliveryAreasService = async () => {
  const deliveryAreas = await DeliveryArea.find({}, { areaName: 1, _id: 0 });
  return deliveryAreas;
};

export const getDeliveryAreaByIdService = async (id) => {
  const deliveryArea = await DeliveryArea.findById(id);
  if (!deliveryArea) {
    throw new Error('Delivery area not found');
  }
  return deliveryArea;
};

export const createDeliveryAreaService = async (data) => {
  const deliveryArea = await DeliveryArea.create(data);
  return deliveryArea;
};

export const updateDeliveryAreaService = async (id, data) => {
  const deliveryArea = await DeliveryArea.findByIdAndUpdate(id, data, {
    new: true,
    runValidators: true,
  });
  if (!deliveryArea) {
    throw new Error('Delivery area not found');
  }
  return deliveryArea;
};

export const deleteDeliveryAreaService = async (id) => {
  const deliveryArea = await DeliveryArea.findByIdAndRemove(id);
  if (!deliveryArea) {
    throw new Error('Delivery area not found');
  }
  return deliveryArea;
};
