import axios from 'axios';

const apiClient = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

apiClient.interceptors.request.use(
  async config => {
    if (typeof window !== 'undefined') {
      if (localStorage.getItem('user-info')) {
        config.headers.Authorization = `Bearer ${localStorage.getItem(
          'user-token'
        )}`;
      }
    }
    return config;
  },
  error => {
    Promise.reject(error);
  }
);

export default apiClient;
