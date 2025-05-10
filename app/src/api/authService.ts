import api from './api';
import { LoginRequest, LoginResponse, RegisterRequest, UserProfile } from '../types/auth';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const login = async (credentials: LoginRequest): Promise<LoginResponse> => {
  try {
    const response = await api.post<LoginResponse>('/auth/login', credentials);
    if (response.data.accessToken) {
      await AsyncStorage.setItem('token', response.data.accessToken);
    }
    return response.data;
  } catch (error: any) {
    throw new Error(error.response?.data?.message || 'Login failed');
  }
};

export const register = async (data: RegisterRequest): Promise<LoginResponse> => {
  try {
    const response = await api.post<LoginResponse>('/auth/register', data);
    if (response.data.accessToken) {
      await AsyncStorage.setItem('token', response.data.accessToken);
    }
    return response.data;
  } catch (error: any) {
    throw new Error(error.response?.data?.message || 'Register failed');
  }
};

export const logout = async (): Promise<void> => {
  await AsyncStorage.removeItem('token');
};

// Removed local declaration of UserProfile to resolve conflict with imported type

export const getProfile = async (): Promise<UserProfile> => {
  try {
    const response = await api.get<UserProfile>('/auth/profile');
    return response.data;
  } catch (error: any) {
    throw new Error(error.response?.data?.message || 'Failed to fetch profile');
  }
};