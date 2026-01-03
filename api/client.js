import axios from "axios";
import Constants from "expo-constants";
import * as SecureStore from "expo-secure-store";

const api = axios.create({
  baseURL:
    Constants.expoConfig?.extra?.API_URL || "https://api.aibenmart.com/api",
  timeout: 10000,
  headers: { "Content-Type": "application/json" },
});

// Attach access token to every request
api.interceptors.request.use(async (config) => {
  const token = await SecureStore.getItemAsync("access_token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Unified error handler
api.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error("Error:", error);
    console.error("API Error:", error.response?.data || error.message);
    return Promise.reject(error.response?.data || error);
  }
);

export default api;
