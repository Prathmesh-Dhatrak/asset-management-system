/* eslint-disable @typescript-eslint/no-unused-vars */
import { createAsyncThunk } from '@reduxjs/toolkit';
import { Asset, CreateAssetDTO, UpdateAssetDTO, AssetQueryParams } from 'types/asset.types';
import { RootState } from 'store/rootReducer';
import { ASSET_ENDPOINTS } from 'app/config';

export const fetchAssets = createAsyncThunk(
  'assets/fetchAssets',
  async (queryParams: AssetQueryParams, { getState, rejectWithValue }) => {
    try {
      const { auth } = getState() as RootState;
      
      const queryString = Object.entries(queryParams)
        .filter(([_, value]) => value !== undefined)
        .map(([key, value]) => `${key}=${encodeURIComponent(String(value))}`)
        .join('&');
      
      const response = await fetch(`${ASSET_ENDPOINTS.BASE}?${queryString}`, {
        headers: { 
          'Authorization': `Bearer ${auth.token}` 
        },
      });
      
      if (!response.ok) {
        const errorData = await response.json();
        return rejectWithValue(errorData);
      }
      
      const data: Asset[] = await response.json();
      return data;
    } catch (error) {
      return rejectWithValue('Failed to fetch assets.');
    }
  }
);

export const createAsset = createAsyncThunk(
  'assets/createAsset',
  async (assetData: CreateAssetDTO, { getState, rejectWithValue }) => {
    try {
      const { auth } = getState() as RootState;
      
      const response = await fetch(ASSET_ENDPOINTS.BASE, {
        method: 'POST',
        headers: { 
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${auth.token}` 
        },
        body: JSON.stringify(assetData),
      });
      
      if (!response.ok) {
        const errorData = await response.json();
        return rejectWithValue(errorData);
      }
      
      const data: Asset = await response.json();
      return data;
    } catch (error) {
      return rejectWithValue('Failed to create asset.');
    }
  }
);

export const updateAsset = createAsyncThunk(
  'assets/updateAsset',
  async ({ id, data }: { id: string, data: UpdateAssetDTO }, { getState, rejectWithValue }) => {
    try {
      const { auth } = getState() as RootState;
      
      const response = await fetch(`${ASSET_ENDPOINTS.BASE}/${id}`, {
        method: 'PUT',
        headers: { 
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${auth.token}` 
        },
        body: JSON.stringify(data),
      });
      
      if (!response.ok) {
        const errorData = await response.json();
        return rejectWithValue(errorData);
      }
      
      const responseData: Asset = await response.json();
      return responseData;
    } catch (error) {
      return rejectWithValue('Failed to update asset.');
    }
  }
);

export const deleteAsset = createAsyncThunk(
  'assets/deleteAsset',
  async (id: string, { getState, rejectWithValue }) => {
    try {
      const { auth } = getState() as RootState;
      
      const response = await fetch(`${ASSET_ENDPOINTS.BASE}/${id}`, {
        method: 'DELETE',
        headers: { 'Authorization': `Bearer ${auth.token}` },
      });
      
      if (!response.ok) {
        const errorData = await response.json();
        return rejectWithValue(errorData);
      }
      
      return id;
    } catch (error) {
      return rejectWithValue('Failed to delete asset.');
    }
  }
);
