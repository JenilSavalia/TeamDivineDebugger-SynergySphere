import { Router } from 'express';
import { sendSignupOTP, verifySignupOTP, verifyLogin, sendLoginOTP } from '../controllers/auth.controller.js';
import { reSendOtp, forgotPassword, resetPassword, logOut } from '../controllers/auth.controller.js';
const authRoutes = Router();

authRoutes.post('/signup/send-otp', sendSignupOTP);
authRoutes.post('/signup/verify-otp', verifySignupOTP);
authRoutes.post('/login/send-otp', sendLoginOTP);
authRoutes.post('/login/verify-otp', verifyLogin);
authRoutes.post('/otp/resend', reSendOtp);
authRoutes.post('/forgot-password/send-link', forgotPassword);
authRoutes.post('/forgot-password/reset/:token', resetPassword);
authRoutes.post('/logout', logOut);

export default authRoutes;
