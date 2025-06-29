import User from "../auth/auth.model.js";
import Payment from "./payment.model.js";

export const createPaymentService = async (data, userId) => {
  const payment = await Payment.create({ ...data, userId });
  return payment;
};

export const getAllPaymentsByStatusService = async ({ page, limit, status }) => {
  const query = status !== "pending" ? { status } : {};

  const skip = (Number(page) - 1) * Number(limit);
  const total = await Payment.countDocuments(query);
  const payments = await Payment.find(query)
    .sort({ createdAt: -1 })
    .skip(skip)
    .limit(Number(limit));

  return {
    total,
    currentPage: Number(page),
    totalPages: Math.ceil(total / Number(limit)),
    data: payments,
  };
};

export const getPaymentByIdService = async (id) => {
  const payment = await Payment.findById(id);
  if (!payment) throw new Error("Payment not found");
  return payment;
};

export const updatePaymentService = async (id, data) => {

    console.log(id, data);

  const existingPayment = await Payment.findById(id);
  if (!existingPayment) throw new Error("Payment not found");

  const updatedPayment = await Payment.findByIdAndUpdate(id, data, { new: true });
  if (!updatedPayment) throw new Error("Payment not found");

  if (data.status === 'completed' && existingPayment.status !== 'completed') {
    const user = await User.findById(existingPayment.userId);
    if (user) {
      user.balance += Number(existingPayment.amount);
      await user.save();
    }
  }

  return updatedPayment;

};

export const deletePaymentService = async (id) => {
  const payment = await Payment.findByIdAndDelete(id);
  if (!payment) throw new Error("Payment not found");
  return payment;
};
