export const HOST = 'http://localhost:5000';

export const AUTH_ROUTES = 'api/auth'

export const SIGNUP_OTP = `${HOST}/${AUTH_ROUTES}/signup/send-otp`;
export const SIGNUP_OTP_VERIFY = `${HOST}/${AUTH_ROUTES}/signup/verify-otp`;

export const LOGIN_OTP = `${HOST}/${AUTH_ROUTES}/login/send-otp`;
export const LOGIN_OTP_VERIFY = `${HOST}/${AUTH_ROUTES}/login/verify-otp`;
export const FORGOT_PASSWORD = `${HOST}/${AUTH_ROUTES}/forgot-password/send-link`;
export const PASSWORD_RESET = `${HOST}/${AUTH_ROUTES}/forgot-password/reset`;

export const RESEND_OTP = `${HOST}/${AUTH_ROUTES}/otp/resend`;