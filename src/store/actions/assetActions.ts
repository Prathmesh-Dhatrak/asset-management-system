import { createAsyncThunk } from '@reduxjs/toolkit';
import { Asset, CreateAssetDTO, UpdateAssetDTO, AssetQueryParams } from 'types/asset.types';
import { ASSET_ENDPOINTS } from 'app/config';
import api from 'services/api';
import { AxiosError } from 'axios';
import { API_BASE_URL } from 'app/config';

interface ErrorResponse {
  message: string;
}

const ASSETS_ENDPOINT = ASSET_ENDPOINTS.BASE.replace(`${API_BASE_URL}/`, '');

export const fetchAssets = createAsyncThunk(
  'assets/fetchAssets',
  async (queryParams: AssetQueryParams, { rejectWithValue }) => {
    try {
      const response = await api.get<Asset[]>(ASSETS_ENDPOINT, { 
        params: queryParams 
      });
      return response.data;
    } catch (error) {
      const axiosError = error as AxiosError<ErrorResponse>;
      return rejectWithValue(
        axiosError.response?.data?.message || 'Failed to fetch assets.'
      );
    }
  }
);

export const createAsset = createAsyncThunk(
  'assets/createAsset',
  async (assetData: CreateAssetDTO, { rejectWithValue }) => {
    try {
      const response = await api.post<Asset>(ASSETS_ENDPOINT, assetData);
      return response.data;
    } catch (error) {
      const axiosError = error as AxiosError<ErrorResponse>;
      return rejectWithValue(
        axiosError.response?.data?.message || 'Failed to create asset.'
      );
    }
  }
);

export const updateAsset = createAsyncThunk(
  'assets/updateAsset',
  async ({ id, data }: { id: string, data: UpdateAssetDTO }, { rejectWithValue }) => {
    try {
      const response = await api.put<Asset>(`${ASSETS_ENDPOINT}/${id}`, data);
      return response.data;
    } catch (error) {
      const axiosError = error as AxiosError<ErrorResponse>;
      return rejectWithValue(
        axiosError.response?.data?.message || 'Failed to update asset.'
      );
    }
  }
);

export const deleteAsset = createAsyncThunk(
  'assets/deleteAsset',
  async (id: string, { rejectWithValue }) => {
    try {
      await api.delete(`${ASSETS_ENDPOINT}/${id}`);
      return id;
    } catch (error) {
      const axiosError = error as AxiosError<ErrorResponse>;
      return rejectWithValue(
        axiosError.response?.data?.message || 'Failed to delete asset.'
      );
    }
  }
);