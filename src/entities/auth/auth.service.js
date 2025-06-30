import User from './auth.model.js';
import jwt from 'jsonwebtoken';
import { refreshTokenSecrete, emailExpires, verificationEmailExpires } from '../../core/config/config.js';
import sendEmail from '../../lib/sendEmail.js';
import { generateResetPasswordEmail, generateVerificationEmail } from '../../lib/emailTemplates.js';



export const registerUserService = async ({
  name, email, address, password, phone, referedBy, role, isVerified, area
}) => {
  const existingUser = await User.findOne({ email });
  if (existingUser) throw new Error('User already registered.');

  const verificationCode = Math.floor(100000 + Math.random() * 900000);

  const newUser = new User({
    name, email, address, password, phone, referedBy, role, isVerified,
    area,
    otp: verificationCode,
    otpExpires: new Date(Date.now() + verificationEmailExpires) 
  });

  const user = await newUser.save();

  const message = generateVerificationEmail(verificationCode);

  const emailSent = await sendEmail({
    to: email,
    subject: 'Dhaka Bite Email Verification',
    html: message
  });


  if (!emailSent) {
    return sendResponse(res, 400, false, 'Invalid email address. Please enter a valid one.');
  }


  const { _id, profileImage } = user;
  return { _id, name, email, role, profileImage };
};

export const verifyUserEmailService = async ({ email, otp }) => {
  if (!email || !otp) throw new Error('Email and otp are required');

  const user = await User.findOne({ email });

  if (!user) throw new Error('Invalid email');

  if (user.otp !== otp) throw new Error('Invalid otp');

  if (new Date() > user.otpExpires) throw new Error('Otp expired');

  user.isVerified = true;
  user.otp = null;
  user.otpExpires = null;
  await user.save();

  return;
};


export const resendVerifyEmailService = async (email) => {
  if (!email) throw new Error('Email is required'); // Add this line

  const user = await User.findOne({ email });

  if (!user) throw new Error('Invalid email');

  const otp = Math.floor(100000 + Math.random() * 900000);
  const otpExpires = new Date(Date.now() + verificationEmailExpires);

  user.otp = otp;
  user.otpExpires = otpExpires;
  await user.save({ validateBeforeSave: false });

  const message = generateVerificationEmail(otp);

  console.log("email, message", email, message);

  const emailSent = await sendEmail({
    to: email,
    subject: 'Dhaka Bite Email Verification',
    html: message
  });

  if (!emailSent) {
    return sendResponse(res, 400, false, 'Invalid email address. Please enter a valid one.');
  }

  return ({
    message: 'Verification email sent successfully. Please check your inbox.',
    otpExpires: user.otpExpires // Add this line to return otpExpires
  })
}


export const loginUserService = async ({ email, password }) => {
  if (!email || !password) throw new Error('Email and password are required');

  const user = await User.findOne({ email }).select("-password").populate("area");

  if (!user) throw new Error('User not found');

  console.log('user', user);

  if (!user.isVerified) throw new Error('User is not verified yet. Please verify your email address.');

  const isMatch = await user.comparePassword(user._id, password);
  if (!isMatch) throw new Error('Invalid password');

  const payload = { _id: user._id, role: user.role };

  const data = {
    user,
    accessToken: user.generateAccessToken(payload)
  };

  user.refreshToken = user.generateRefreshToken(payload);
  await user.save({ validateBeforeSave: false });

  return data
};


export const refreshAccessTokenService = async (refreshToken) => {
  if (!refreshToken) throw new Error('No refresh token provided');

  const user = await User.findOne({ refreshToken });

  if (!user) throw new Error('Invalid refresh token');

  const decoded = jwt.verify(refreshToken, refreshTokenSecrete)

  if (!decoded || decoded._id !== user._id.toString()) throw new Error('Invalid refresh token')

  const payload = { _id: user._id }

  const accessToken = user.generateAccessToken(payload);
  const newRefreshToken = user.generateRefreshToken(payload);

  user.refreshToken = newRefreshToken;
  await user.save({ validateBeforeSave: false })

  return {
    accessToken,
    refreshToken: newRefreshToken
  }
};

export const forgetPasswordService = async (email) => {

  if (!email) throw new Error('Email is required')

  const user = await User.findOne({ email });
  if (!user) throw new Error('Invalid email');

  const otp = Math.floor(100000 + Math.random() * 900000);
  const otpExpires = new Date(Date.now() + resetPasswordEmailExpires);

  user.otp = otp;
  user.otpExpires = otpExpires;
  await user.save({ validateBeforeSave: false });

  await sendEmail({
    to: email,
    subject: 'Password Reset OTP',
    html: generateResetPasswordEmail(otp)
  });

  return;
};

export const verifyCodeService = async ({ email, otp }) => {

  if (!email || !otp) throw new Error('Email and otp are required')

  const user = await User.findOne({ email });

  if (!user) throw new Error('Invalid email');

  if (!user.otp || !user.otpExpires) throw new Error('Otp not found');

  if (Number(user.otp) !== Number(otp) || new Date() > user.otpExpires) throw new Error('Invalid or expired otp')

  user.otp = null;
  user.otpExpires = null;
  await user.save({ validateBeforeSave: false });

  return;
};

export const resetPasswordService = async ({ email, newPassword }) => {
  if (!email || !newPassword) throw new Error('Email and new password are required');

  const user = await User.findOne({ email });
  if (!user) throw new Error('Invalid email');

  if (user.otp || user.otpExpires) throw new Error('otp not cleared');

  user.password = newPassword;
  await user.save();

  return;
};
