import axios from 'axios';

const api = axios.create({
  baseURL: '/api',
  headers: {
    'Content-Type': 'application/json',
  },
});

// Attach Basic Auth header from session storage
api.interceptors.request.use((config) => {
  const saved = sessionStorage.getItem('hrs_user');
  if (saved) {
    const { credentials } = JSON.parse(saved);
    config.headers.Authorization = `Basic ${credentials}`;
  }
  return config;
});

// Global error handler
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      sessionStorage.removeItem('hrs_user');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

export default api;
