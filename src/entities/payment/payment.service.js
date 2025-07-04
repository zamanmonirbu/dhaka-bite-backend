import User from "../auth/auth.model.js";
import Payment from "./payment.model.js";

export const createPaymentService = async (data, userId) => {
  
  console.log("Creating payment with data:", data, "for userId:", userId);

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
  const payments = await Payment.find({ userId: id }).sort({ createdAt: -1 });
  const subcriptions = payments.filter(payment => payment.payType === 'subscription');
  const recharges = payments.filter(payment => payment.payType === 'recharge');

  return { subcriptions, recharges };
};

export const updatePaymentService = async (id, data) => {

  const existingPayment = await Payment.findById(id);
  if (!existingPayment) throw new Error("Payment not found");

  const updatedPayment = await Payment.findByIdAndUpdate(id, data, { new: true });
  if (!updatedPayment) throw new Error("Payment not found");

  if (updatedPayment.payType === 'subscription' && updatedPayment.status === 'completed') {
     const user = await User.findById(existingPayment.userId);

     user.hasActiveSubscription = true;
     user.subscription = (updatedPayment.amount == 400 ? 'basic' : updatedPayment.amount == 450 ? 'standard' : 'premium');
     user.subscriptionStartDate = new Date();
      user.subscriptionEndDate = new Date(new Date().setMonth(new Date().getMonth() + 1));

     await user.save();

  }

  else if (data.status === 'completed' && existingPayment.status !== 'completed' && existingPayment.payType === 'recharge') {
    const user = await User.findById(existingPayment.userId);
    if (user) {
      user.balance += Number(existingPayment.amount);
      await user.save();
    }
  }

  return updatedPayment;

};


export const getUserBalanceService = async (userId) => {

  console.log("Getting user balance for userId:", userId);

  const user = await User.findById(userId).select('balance');

  console.log("User found:", user);

  if (!user) throw new Error("User not found");
  return user.balance;
};


export const deletePaymentService = async (id) => {
  const payment = await Payment.findByIdAndDelete(id);
  if (!payment) throw new Error("Payment not found");
  return payment;
};
