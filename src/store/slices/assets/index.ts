import assetReducer, { selectAsset, clearSelectedAsset, clearError } from './assetSlice';
import { fetchAssets, createAsset, updateAsset, deleteAsset } from '../../actions/assetActions';

export {
  fetchAssets,
  createAsset,
  updateAsset,
  deleteAsset,
  selectAsset,
  clearSelectedAsset,
  clearError
};

export default assetReducer;