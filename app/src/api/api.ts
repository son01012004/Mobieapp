import axios from 'axios';
  import AsyncStorage from '@react-native-async-storage/async-storage';

  // Thay đổi tùy theo môi trường
  const API_BASE_URL = 'http://10.0.2.2:8080'; // Dùng cho Android emulator

  const api = axios.create({
    baseURL: API_BASE_URL,
    headers: {
      'Content-Type': 'application/json',
    },
  });

  // Interceptor để thêm token vào header
  api.interceptors.request.use(
    async (config) => {
      const token = await AsyncStorage.getItem('token');
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
      return config;
    },
    (error) => Promise.reject(error)
  );

  export default api;