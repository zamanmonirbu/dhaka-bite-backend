import User from "../auth/auth.model.js";
import Order from "./order.model.js";

export const createOrderService = async ({userId, ...data }) => {

  if (typeof data.deliveryAddress?.location === 'string') {
    const [latStr, lngStr] = data.deliveryAddress.location.split(",");
    data.deliveryAddress.location = {
      lat: parseFloat(latStr),
      lng: parseFloat(lngStr),
    };
  }
  const order = await Order.create({userId, ...data });

  if (!order) {
    throw new Error("Order creation failed");
  }
  else{
    const user = await User.findById(userId);
    if (!user) {
      throw new Error("User not found");
    }
    if (user.balance < data.totalAmount) {
      throw new Error("Insufficient balance");
    }
    user.balance -= data.totalAmount;
    await user.save();
  }

  return order;
};

export const getAllOrdersService = async () => {
  const orders = await Order.find().populate("userId", "name email");
  return orders;
};

export const getOrderByIdService = async (id) => {
  const order = await Order.findById(id).populate("userId", "name email");
  return order;
};

export const updateOrderService = async (id, data) => {
  const order = await Order.findByIdAndUpdate(id, data, {
    new: true,
    runValidators: true,
  });
  return order;
};

export const deleteOrderService = async (id) => {
  const order = await Order.findByIdAndDelete(id);
  return order;
};
