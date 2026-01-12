import axios, { AxiosError } from 'axios';
import type { AxiosInstance, AxiosResponse, InternalAxiosRequestConfig } from 'axios';
import { APP_CONFIG, STORAGE_KEYS } from '../constants';


// Define standardized response shape matching Backend ApiResponse
export interface ApiResponse<T = any> {
  success: boolean;
  message: string;
  data: T;
  statusCode: number;
}

const api: AxiosInstance = axios.create({
  baseURL: APP_CONFIG.API_URL,
  timeout: APP_CONFIG.TIMEOUT,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request Interceptor
api.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    const token = localStorage.getItem(STORAGE_KEYS.TOKEN);
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error: AxiosError) => Promise.reject(error)
);

// Response Interceptor
api.interceptors.response.use(
  (response: AxiosResponse<ApiResponse>) => {
    return response; 
  },
  (error: AxiosError<ApiResponse>) => {
    // const toastStore = useToastStore();
    // Optional: Auto-toast on specific structural errors if needed
    // const message = error.response?.data?.message || 'Something went wrong';
    return Promise.reject(error);
  }
);

export default api;
