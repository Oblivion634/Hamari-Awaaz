import axios from "axios";
import { BASE_URL } from "../utils/constants.js";

// Axios instance
const api = axios.create({
  baseURL: BASE_URL,
  withCredentials: true,
});

export default api;
