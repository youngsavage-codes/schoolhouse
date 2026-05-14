import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse } from "axios";
import {
  getAccessToken,
  refreshAccessToken,
  getRefreshToken,
  clearAccessToken,
  isTokenExpired,
} from "../lib/tokenManager";

const api: AxiosInstance = axios.create({
  baseURL: process.env.EXPO_PUBLIC_API_URL, // your API base
});

// ========================
// REQUEST INTERCEPTOR
// ========================
api.interceptors.request.use(
  async (config: AxiosRequestConfig) => {
    const token = await getAccessToken(); // <-- must await

    if (token) {
      if (!config.headers) config.headers = {};
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config; // <-- must return config
  },
  (error) => Promise.reject(error)
);

// ========================
// RESPONSE INTERCEPTOR
// ========================
api.interceptors.response.use(
  (response: AxiosResponse) => response,
  async (error) => {
    const originalRequest = error.config as AxiosRequestConfig & { _retry?: boolean };

    // If not 401 → reject
    if (error.response?.status !== 401) return Promise.reject(error);

    // Prevent infinite retry
    if (originalRequest._retry) {
      await clearAccessToken();
      return Promise.reject(error);
    }

    // Check if token expired
    const token = await getAccessToken();
    const expired = isTokenExpired(token || undefined);

    if (!expired) {
      // Token exists but rejected → invalid permission
      await clearAccessToken();
      return Promise.reject(error);
    }

    originalRequest._retry = true;

    try {
      const refreshToken = await getRefreshToken();
      if (!refreshToken) throw new Error("No refresh token available");

      const newToken = await refreshAccessToken(refreshToken);

      if (!originalRequest.headers) originalRequest.headers = {};
      originalRequest.headers.Authorization = `Bearer ${newToken}`;

      return api(originalRequest); // <-- retry original request
    } catch (refreshError) {
      await clearAccessToken();
      return Promise.reject(refreshError);
    }
  }
);

export default api;