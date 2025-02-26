/* eslint-disable @typescript-eslint/no-unused-vars */
import { createAsyncThunk } from '@reduxjs/toolkit';
import { AuthResponse, LoginDTO, CreateUserDTO } from '../../types/user.types';

export const login = createAsyncThunk(
  'auth/login',
  async (credentials: LoginDTO, { rejectWithValue }) => {
    try {
      const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(credentials),
      });
      
      if (!response.ok) {
        const errorData = await response.json();
        return rejectWithValue(errorData);
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
  async (userData: CreateUserDTO, { rejectWithValue }) => {
    try {
      const response = await fetch('/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(userData),
      });
      
      if (!response.ok) {
        const errorData = await response.json();
        return rejectWithValue(errorData);
      }
      
      const data: AuthResponse = await response.json();
      return data;
    } catch (error) {
      return rejectWithValue('Registration failed. Please try again.');
    }
  }
);