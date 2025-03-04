import { createAsyncThunk } from '@reduxjs/toolkit';
import { AuthResponse, AuthRequest } from 'types/user.types';
import { AUTH_ENDPOINTS } from 'app/config';
import api from 'services/api';
import { AxiosError } from 'axios';
import { API_BASE_URL } from 'app/config';

interface ErrorResponse {
  message: string;
}

export const login = createAsyncThunk(
  'auth/login',
  async (credentials: AuthRequest, { rejectWithValue }) => {
    try {
      const response = await api.post<AuthResponse>(
        AUTH_ENDPOINTS.LOGIN.replace(`${API_BASE_URL}/`, ''), 
        credentials
      );
      return response.data;
    } catch (error) {
      const axiosError = error as AxiosError<ErrorResponse>;
      return rejectWithValue(
        axiosError.response?.data?.message || 'Login failed. Please try again.'
      );
    }
  }
);

export const register = createAsyncThunk(
  'auth/register',
  async (userData: AuthRequest, { rejectWithValue }) => {
    try {
      const response = await api.post<AuthResponse>(
        AUTH_ENDPOINTS.REGISTER.replace(`${API_BASE_URL}/`, ''), 
        userData
      );
      return response.data;
    } catch (error) {
      const axiosError = error as AxiosError<ErrorResponse>;
      return rejectWithValue(
        axiosError.response?.data?.message || 'Registration failed. Please try again.'
      );
    }
  }
);