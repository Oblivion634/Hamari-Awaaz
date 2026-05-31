// ==================== API CONSTANTS ====================
// Stores backend URL and endpoint paths used across the frontend.
// =======================================================

// ---------- BASE URL ----------
// Root API path consumed by the shared Axios client.
export const BASE_URL = import.meta.env.VITE_API_BASE_URL;

// ---------- ENDPOINT MAP ----------
// Keeps route strings centralized for auth and issue requests.
export const ENDPOINTS = {
  LOGIN: "/auth/login",
  SIGNUP: "/auth/signup",
  GETUSER: "/auth/getuser",
  LOGOUT: "/auth/logout",
  CREATEISSUE: "/issue/createissue",
  GETSTATS: "/issue/stats",
  GETISSUES: "/issue/getissues",
  GETISSUE: "/issue/track",
  UPDATEUSER: "/auth/update",
  DELETEUSER: "/auth/deleteUser",
  VERIFY_SIGNUP_OTP: "/auth/verify-signup-otp",
  FORGOT_PASSWORD: "/auth/forgot-password",
  RESET_PASSWORD: "/auth/reset-password",
  RESEND_SIGNUP_OTP: "/auth/resend-signup-otp",
};
