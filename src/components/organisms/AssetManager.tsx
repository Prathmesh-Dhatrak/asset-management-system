import React, { useState, useEffect } from 'react';
import { useAppDispatch, useAppSelector } from 'hooks/reduxHooks';
import {
  fetchAssets,
  createAsset,
  updateAsset,
  deleteAsset,
} from 'store/slices/assets';
import { Asset, AssetQueryParams, CreateAssetDTO, UpdateAssetDTO } from 'types/asset.types';
import Button from 'components/atoms/Button';
import SearchInput from 'components/atoms/SearchInput';
import Modal from 'components/molecules/Modal';
import AssetForm from 'components/molecules/AssetForm';
import AssetFilter from 'components/molecules/AssetFilter';
import AssetTable from 'components/organisms/AssetTable';
import Alert from 'components/atoms/Alert';

const AssetManager: React.FC = () => {
  const dispatch = useAppDispatch();
  const { items: assets, loading, error } = useAppSelector((state) => state.assets);
  
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedAsset, setSelectedAsset] = useState<Asset | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [queryParams, setQueryParams] = useState<AssetQueryParams>({
    sortBy: 'createdAt',
    sortOrder: 'desc',
  });
  const [successMessage, setSuccessMessage] = useState('');

  useEffect(() => {
    dispatch(fetchAssets({ ...queryParams, search: searchTerm }));
  }, [dispatch, queryParams, searchTerm]);

  const handleSearch = (value: string) => {
    setSearchTerm(value);
  };

  const handleFilter = (filters: AssetQueryParams) => {
    setQueryParams({ ...queryParams, ...filters });
  };

  const handleSort = (field: string) => {
    const validField = field as 'name' | 'type' | 'value' | 'createdAt';
    
    setQueryParams((prev) => ({
      ...prev,
      sortBy: validField,
      sortOrder:
        prev.sortBy === validField && prev.sortOrder === 'asc' ? 'desc' : 'asc',
    }));
  };

  const handleAddAsset = (data: CreateAssetDTO | UpdateAssetDTO) => {
    dispatch(createAsset(data as CreateAssetDTO))
      .unwrap()
      .then(() => {
        setShowAddModal(false);
        setSuccessMessage('Asset created successfully');
        setTimeout(() => setSuccessMessage(''), 3000);
      });
  };

  const handleEditAsset = (asset: Asset) => {
    setSelectedAsset(asset);
    setShowEditModal(true);
  };

  const handleUpdateAsset = (data: CreateAssetDTO | UpdateAssetDTO) => {
    if (selectedAsset) {
      dispatch(updateAsset({ id: selectedAsset.id, data: data as UpdateAssetDTO }))
        .unwrap()
        .then(() => {
          setShowEditModal(false);
          setSelectedAsset(null);
          setSuccessMessage('Asset updated successfully');
          setTimeout(() => setSuccessMessage(''), 3000);
        });
    }
  };

  const handleDeleteClick = (assetId: string) => {
    const asset = assets.find((a) => a.id === assetId);
    if (asset) {
      setSelectedAsset(asset);
      setShowDeleteModal(true);
    }
  };

  const handleDeleteConfirm = () => {
    if (selectedAsset) {
      dispatch(deleteAsset(selectedAsset.id))
        .unwrap()
        .then(() => {
          setShowDeleteModal(false);
          setSelectedAsset(null);
          setSuccessMessage('Asset deleted successfully');
          setTimeout(() => setSuccessMessage(''), 3000);
        });
    }
  };

  return (
    <div className="space-y-6">
      {error && <Alert type="error" message={error} />}
      {successMessage && <Alert type="success" message={successMessage} />}

      <div className="flex flex-wrap justify-between items-center gap-4">
        <div>
          <h2 className="text-2xl font-bold">Your Assets</h2>
          <p className="text-base-content/70">Manage your assets portfolio</p>
        </div>
        <div className="flex items-center space-x-4">
          <SearchInput onSearch={handleSearch} />
          <Button variant="primary" onClick={() => setShowAddModal(true)}>
            Add Asset
          </Button>
        </div>
      </div>

      <AssetFilter onFilter={handleFilter} initialFilters={queryParams} />

      {loading ? (
        <div className="flex justify-center p-8">
          <span className="loading loading-spinner loading-lg"></span>
        </div>
      ) : assets.length > 0 ? (
        <AssetTable
          assets={assets}
          onEdit={handleEditAsset}
          onDelete={handleDeleteClick}
          sortBy={queryParams.sortBy || 'createdAt'}
          sortOrder={queryParams.sortOrder || 'desc'}
          onSort={handleSort}
        />
      ) : (
        <div className="text-center p-8 bg-base-200 rounded-lg">
          <p className="text-lg">No assets found</p>
          <p className="text-base-content/70 mt-2">
            Add your first asset to get started
          </p>
          <Button
            variant="primary"
            className="mt-4"
            onClick={() => setShowAddModal(true)}
          >
            Add Asset
          </Button>
        </div>
      )}

      <Modal
        id="add-asset-modal"
        title="Add New Asset"
        isOpen={showAddModal}
        onClose={() => setShowAddModal(false)}
      >
        <AssetForm onSubmit={handleAddAsset} isLoading={loading} />
      </Modal>

      <Modal
        id="edit-asset-modal"
        title="Edit Asset"
        isOpen={showEditModal}
        onClose={() => setShowEditModal(false)}
      >
        {selectedAsset && (
          <AssetForm
            onSubmit={handleUpdateAsset}
            isLoading={loading}
            asset={selectedAsset}
            isEditing={true}
          />
        )}
      </Modal>

      <Modal
        id="delete-asset-modal"
        title="Delete Asset"
        isOpen={showDeleteModal}
        onClose={() => setShowDeleteModal(false)}
        footer={
          <>
            <Button variant="ghost" onClick={() => setShowDeleteModal(false)}>
              Cancel
            </Button>
            <Button variant="primary" onClick={handleDeleteConfirm} isLoading={loading}>
              Delete
            </Button>
          </>
        }
      >
        <p>
          Are you sure you want to delete{' '}
          <span className="font-semibold">{selectedAsset?.name}</span>? This action
          cannot be undone.
        </p>
      </Modal>
    </div>
  );
};

export default AssetManager;