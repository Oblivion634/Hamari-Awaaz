import api from "../api/axios";
import { ENDPOINTS } from "../utils/constants";

// ==================== AUTH SERVICE ====================
// Wraps frontend authentication API calls behind reusable helpers.
// ======================================================

// ---------- CURRENT USER ----------
// Loads the active session user through the shared API client.
export const getCurrentUser = async () => {
  const res = await api.get(ENDPOINTS.GETUSER);
  return res.data;
};
