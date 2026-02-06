import axios from 'axios';

// Get the correct API URL based on environment
const getApiUrl = () => {
  // Check if running on Vercel preview or production
  if (process.env.REACT_APP_API_URL) {
    return process.env.REACT_APP_API_URL;
  }
  
  // Development
  if (process.env.NODE_ENV === 'development') {
    return 'http://localhost:5000';
  }
  
  // Vercel production fallback
  return 'https://your-render-backend-url.onrender.com';
};

// Initialize axios instance with correct baseURL
const apiClient = axios.create({
  baseURL: getApiUrl(),
  timeout: 10000,
});

// Add token to requests
apiClient.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Handle response errors
apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('token');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

export default apiClient;