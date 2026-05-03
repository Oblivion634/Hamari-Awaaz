// ==================== API CONSTANTS ====================
// Stores backend URL and endpoint paths used across the frontend.
// =======================================================

// ---------- BASE URL ----------
// Root API path consumed by the shared Axios client.
export const BASE_URL = "http://localhost:9000/api";

// ---------- ENDPOINT MAP ----------
// Keeps route strings centralized for auth and issue requests.
export const ENDPOINTS = {
  LOGIN: "/auth/login",
  SIGNUP: "/auth/signup",
  GETUSER: "/auth/getuser",
  LOGOUT: "/auth/logout",
  CREATEISSUE: "/issue/createissue",
  GETSTATS: "/issue/getstats",
  GETISSUES: "/issue/getissues",
  GETISSUE: "/issue/getissue",
  UPDATEUSER: "/auth/update",
  DELETEUSER:"/auth/deleteUser"
};
