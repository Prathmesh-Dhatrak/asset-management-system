import axios from 'axios';
import { API_BASE_URL } from 'app/config';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

api.interceptors.request.use(
  (config) => {
    try {
      const persistedData = localStorage.getItem('persist:root');
      
      if (persistedData) {
        const { auth } = JSON.parse(persistedData);
        const { token } = JSON.parse(auth);
        
        if (token) {
          config.headers.Authorization = `Bearer ${token}`;
        }
      }
      return config;
    } catch (error) {
      console.error('Error accessing token:', error);
      return config;
    }
  },
  (error) => Promise.reject(error)
);

api.interceptors.response.use(
  (response) => response,
  (error) => {
    return Promise.reject(error);
  }
);

export default api;