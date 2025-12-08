import axios, { type InternalAxiosRequestConfig } from 'axios';
import { tokenStorage } from '@/lib/utils/token';

// Create axios instance with base configuration
const axiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8091/api/v1',
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor - attach JWT token to all requests
axiosInstance.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    const token = tokenStorage.getToken();

    if (token && config.headers) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  async error => {
    return await Promise.reject(error);
  }
);

// Response interceptor - handle errors and token expiration
axiosInstance.interceptors.response.use(
  response => {
    return response;
  },
  async error => {
    // Handle 401 Unauthorized - token expired or invalid
    if (error.response?.status === 401) {
      tokenStorage.clearAll();
      // Redirect to login page
      if (typeof window !== 'undefined') {
        window.location.href = '/login';
      }
    }

    return await Promise.reject(error);
  }
);

export default axiosInstance;
