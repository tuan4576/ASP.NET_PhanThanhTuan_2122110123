// src/api/axiosClient.ts
import axios from "axios";

const axiosClient = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || "https://localhost:7104/api",
  headers: {
    "Content-Type": "application/json",
  },
});

// Optional: Interceptors
axiosClient.interceptors.request.use(
  (config) => {
    // Thêm token nếu cần
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

axiosClient.interceptors.response.use(
  (response) => response.data,
  (error) => {
    // Xử lý lỗi chung ở đây
    console.error("API error:", error);
    return Promise.reject(error);
  }
);

export default axiosClient;
