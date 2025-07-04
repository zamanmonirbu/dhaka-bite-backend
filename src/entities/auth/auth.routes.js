import express from 'express';
import {
  registerUser,
  loginUser,
  refreshAccessToken,
  forgetPassword,
  verifyCode,
  resetPassword,
  logoutUser,
  verifyUserEmail,
  resendVerifyEmail,
  getReferencesUsers,
} from './auth.controller.js';

import { userAdminSellerMiddleware, userMiddleware } from '../../core/middlewares/authMiddleware.js';

const router = express.Router();

router.post('/register', registerUser);
router.post('/verify-email', verifyUserEmail);
router.post('/resend-verify-email', resendVerifyEmail);
router.post('/login', loginUser);
router.post('/refresh-access-token', refreshAccessToken);
router.post('/forget-password', forgetPassword);
router.post('/verify-code', verifyCode);
router.post('/reset-password', resetPassword);
router.post('/logout',userAdminSellerMiddleware , logoutUser);
router.get('/get-referred-users', userMiddleware, getReferencesUsers);

export default router;
