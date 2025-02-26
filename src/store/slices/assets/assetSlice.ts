import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Asset } from '../../../types/asset.types';
import { fetchAssets, createAsset, updateAsset, deleteAsset } from '../../actions/assetActions';

interface AssetState {
  items: Asset[];
  selectedAsset: Asset | null;
  loading: boolean;
  error: string | null;
}

const initialState: AssetState = {
  items: [],
  selectedAsset: null,
  loading: false,
  error: null,
};

const assetSlice = createSlice({
  name: 'assets',
  initialState,
  reducers: {
    selectAsset: (state, action: PayloadAction<string>) => {
      state.selectedAsset = state.items.find(asset => asset.id === action.payload) || null;
    },
    clearSelectedAsset: (state) => {
      state.selectedAsset = null;
    },
    clearError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchAssets.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchAssets.fulfilled, (state, action: PayloadAction<Asset[]>) => {
        state.loading = false;
        state.items = action.payload;
      })
      .addCase(fetchAssets.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
    
    builder
      .addCase(createAsset.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createAsset.fulfilled, (state, action: PayloadAction<Asset>) => {
        state.loading = false;
        state.items.push(action.payload);
      })
      .addCase(createAsset.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
    
    builder
      .addCase(updateAsset.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateAsset.fulfilled, (state, action: PayloadAction<Asset>) => {
        state.loading = false;
        const index = state.items.findIndex(asset => asset.id === action.payload.id);
        if (index !== -1) {
          state.items[index] = action.payload;
        }
        if (state.selectedAsset?.id === action.payload.id) {
          state.selectedAsset = action.payload;
        }
      })
      .addCase(updateAsset.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
    
    builder
      .addCase(deleteAsset.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteAsset.fulfilled, (state, action: PayloadAction<string>) => {
        state.loading = false;
        state.items = state.items.filter(asset => asset.id !== action.payload);
        if (state.selectedAsset?.id === action.payload) {
          state.selectedAsset = null;
        }
      })
      .addCase(deleteAsset.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export const { selectAsset, clearSelectedAsset, clearError } = assetSlice.actions;
export default assetSlice.reducer;