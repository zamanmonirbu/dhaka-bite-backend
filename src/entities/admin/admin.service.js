import RoleType from "../../lib/types.js";
import User from "../auth/auth.model.js";
import Mainmeal from "../main-meal/mainMeal.model.js";

export const getDashboardInfoService = async ({ page = 1, limit = 10 }) => {
  const totalEarn = await Mainmeal.aggregate([
    { $match: { status: 'active' } },
    {
      $group: {
        _id: null,
        totalEarn: { $sum: '$price' }
      }
    }
  ]);

  const totalOrders = await Mainmeal.countDocuments({ status: 'active' });
  const totalUsers = await User.countDocuments({ role: RoleType.USER });
  const totalRiders = await User.countDocuments({ role: RoleType.RIDER });
  const customerList = await User.find({ role: RoleType.USER })
    .select('-password -createdAt -updatedAt -__v')
    .sort({ createdAt: -1 })
    .skip((page - 1) * limit)
    .limit(limit);

  const riderList = await User.find({ role: RoleType.RIDER })
    .select('-password -createdAt -updatedAt -__v')
    .populate('area', 'areaName')
    .sort({ createdAt: -1 })
    .skip((page - 1) * limit)
    .limit(limit);

  return {
    totalEarn: totalEarn[0].totalEarn,
    totalOrders,
    totalUsers,
    totalRiders,
    customerList,
    riderList
  };
};


export const getCustomerListService = async ({ page = 1, limit = 10 }) => {

  const today = new Date();
  const firstDayOfMonth = new Date(today.getFullYear(), today.getMonth(), 1);
  const lastDayOfMonth = new Date(today.getFullYear(), today.getMonth() + 1, 0);

  const totalCustomers = await User.countDocuments({ role: RoleType.USER });
  const totalActiveCustomers = await User.countDocuments({ role: RoleType.USER, 'isVerified': true });
  const totalInactiveCustomers = await User.countDocuments({ role: RoleType.USER, 'isVerified': false });

  const totalNewThisMonth = await User.countDocuments({ role: RoleType.USER, createdAt: { $gte: firstDayOfMonth, $lte: lastDayOfMonth } });

  const customerList = await User.find({ role: RoleType.USER })
    .select('-password -createdAt -updatedAt -__v')
    .sort({ createdAt: -1 })
    .skip((page - 1) * limit)
    .limit(limit);

  return {
    totalCustomers,
    totalActiveCustomers,
    totalInactiveCustomers,
    totalNewThisMonth,
    customerList
  };
};







// import User from '../auth/auth.model.js';
// import jwt from 'jsonwebtoken';
// import { refreshTokenSecrete, emailExpires } from '../../core/config/config.js';
// import sendEmail from '../../lib/sendEmail.js';
// import verificationCodeTemplate from '../../lib/emailTemplates.js';


// export const registerUserService = async ({
//   firstName,
//   lastName,
//   email,
//   password
// }) => {
//   const existingUser = await User.findOne({ email });
//   if (existingUser) throw new Error('User already registered.');

//   const newUser = new User({
//     firstName,
//     lastName,
//     email,
//     password
//   });

//   const user = await newUser.save();

//   const { _id, role, profileImage } = user;
//   return { _id, firstName, lastName, email, role, profileImage };
// };

// export const loginUserService = async ({ email, password }) => {
//   if (!email || !password) throw new Error('Email and password are required');

//   const user = await User.findOne({ email }).select("_id firstName lastName email role profileImage");

//   if (!user) throw new Error('User not found');

//   const isMatch = await user.comparePassword(user._id, password);
//   if (!isMatch) throw new Error('Invalid password');

//   const payload = { _id: user._id, role: user.role };

//   const data = {
//     user,
//     accessToken: user.generateAccessToken(payload)
//   };

//   user.refreshToken = user.generateRefreshToken(payload);
//   await user.save({ validateBeforeSave: false });

//   return data
// };

// export const refreshAccessTokenService = async (refreshToken) => {
//   if (!refreshToken) throw new Error('No refresh token provided');

//   const user = await User.findOne({ refreshToken });

//   if (!user) throw new Error('Invalid refresh token');

//   const decoded = jwt.verify(refreshToken, refreshTokenSecrete)

//   if (!decoded || decoded._id !== user._id.toString()) throw new Error('Invalid refresh token')

//   const payload = { _id: user._id }

//   const accessToken = user.generateAccessToken(payload);
//   const newRefreshToken = user.generateRefreshToken(payload);

//   user.refreshToken = newRefreshToken;
//   await user.save({ validateBeforeSave: false })

//   return {
//     accessToken,
//     refreshToken: newRefreshToken
//   }
// };

// export const forgetPasswordService = async (email) => {

//   if (!email) throw new Error('Email is required')

//   const user = await User.findOne({ email });
//   if (!user) throw new Error('Invalid email');

//   const otp = Math.floor(100000 + Math.random() * 900000);
//   const otpExpires = new Date(now() + emailExpires);

//   user.otp = otp;
//   user.otpExpires = otpExpires;
//   await user.save({ validateBeforeSave: false });

//   await sendEmail({
//     to: email,
//     subject: 'Password Reset OTP',
//     html: verificationCodeTemplate(otp)
//   });

//   return;
// };

// export const verifyCodeService = async ({ email, otp }) => {

//   if (!email || !otp) throw new Error('Email and otp are required')

//   const user = await User.findOne({ email });

//   if (!user) throw new Error('Invalid email');

//   if (!user.otp || !user.otpExpires) throw new Error('Otp not found');

//   if (user.otp !== otp || new Date() > user.otpExpires) throw new Error('Invalid or expired otp')

//   user.otp = null;
//   user.otpExpires = null;
//   await user.save({ validateBeforeSave: false });

//   return;
// };

// export const resetPasswordService = async ({ email, newPassword }) => {
//   if (!email || !newPassword) throw new Error('Email and new password are required');

//   const user = await User.findOne({ email });
//   if (!user) throw new Error('Invalid email');

//   if (user.otp || user.otpExpires) throw new Error('otp not cleared');

//   user.password = newPassword;
//   await user.save();

//   return;
// };
