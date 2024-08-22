import axios, { AxiosInstance } from "axios";

const axiosInstance: AxiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// Request interceptor
axiosInstance.interceptors.request.use(
  (config) => {
    // Add authorization token or any other custom headers if needed
    const token = 'sampleToken'; // Or use cookies/session storage
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    // Handle request error here
    return Promise.reject(error);
  }
);

// Response interceptor
axiosInstance.interceptors.response.use(
  (response) => {
    // Any custom response handling can be done here
    return response;
  },
  (error) => {
    // Handle response error here
    if (error.response?.status === 401) {
      // Example: redirect to login if unauthorized
      window.location.href = "/login";
    }
    return Promise.reject(error);
  }
);

export default axiosInstance;
