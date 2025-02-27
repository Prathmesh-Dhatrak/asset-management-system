/* eslint-disable @typescript-eslint/no-unused-vars */
import { createAsyncThunk } from '@reduxjs/toolkit';
import { AuthResponse, AuthRequest } from 'types/user.types';
import { AUTH_ENDPOINTS } from 'app/config';

export const login = createAsyncThunk(
  'auth/login',
  async (credentials: AuthRequest, { rejectWithValue }) => {
    try {
      const response = await fetch(AUTH_ENDPOINTS.LOGIN, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(credentials),
      });
      
      if (!response.ok) {
        const errorData = await response.json();
        return rejectWithValue(errorData.message || 'Login failed');
      }
      
      const data: AuthResponse = await response.json();
      return data;
    } catch (error) {
      return rejectWithValue('Login failed. Please try again.');
    }
  }
);

export const register = createAsyncThunk(
  'auth/register',
  async (userData: AuthRequest, { rejectWithValue }) => {
    try {
      const response = await fetch(AUTH_ENDPOINTS.REGISTER, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(userData),
      });
      
      if (!response.ok) {
        const errorData = await response.json();
        return rejectWithValue(errorData.message || 'Registration failed');
      }
      
      const data: AuthResponse = await response.json();
      return data;
    } catch (error) {
      return rejectWithValue('Registration failed. Please try again.');
    }
  }
);