import React from 'react';
import { Asset } from 'types/asset.types';
import Button from 'components/atoms/Button';

interface AssetTableProps {
  assets: Asset[];
  onEdit: (asset: Asset) => void;
  onDelete: (assetId: string) => void;
  sortBy: string;
  sortOrder: 'asc' | 'desc';
  onSort: (field: string) => void;
}

const getAssetTypeDisplay = (type: string): string => {
  const types: Record<string, string> = {
    real_estate: 'Real Estate',
    stock: 'Stock',
    cryptocurrency: 'Cryptocurrency',
    vehicle: 'Vehicle',
    other: 'Other',
  };
  return types[type] || type;
};

const getAssetTypeColor = (type: string): string => {
  const colors: Record<string, string> = {
    real_estate: 'badge-primary',
    stock: 'badge-success',
    cryptocurrency: 'badge-warning',
    vehicle: 'badge-info',
    other: 'badge-secondary',
  };
  return colors[type] || 'badge-neutral';
};

const applyColorMode = (baseClass: string): string => {
  return `${baseClass} border-opacity-50 text-opacity-90`;
};

const formatCurrency = (value: number): string => {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 2,
  }).format(value);
};

const formatDate = (dateString: Date): string => {
  return new Date(dateString).toLocaleDateString('en-IN', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  });
};

const AssetTable: React.FC<AssetTableProps> = ({
  assets,
  onEdit,
  onDelete,
  sortBy,
  sortOrder,
  onSort,
}) => {
  const handleSort = (field: string) => {
    onSort(field);
  };

  return (
    <div className="overflow-x-auto rounded-lg shadow-sm">
      <table className="table table-zebra w-full border-collapse">
        <thead>
          <tr className="bg-base-300">
            <th 
              className="cursor-pointer hover:bg-base-200 transition-colors" 
              onClick={() => handleSort('name')}
            >
              <div className="flex items-center space-x-1">
                <span>Name</span>
                {sortBy === 'name' && (
                  <svg 
                    xmlns="http://www.w3.org/2000/svg" 
                    className={`h-4 w-4 transition-transform ${sortOrder === 'asc' ? '' : 'rotate-180'}`} 
                    fill="none" 
                    viewBox="0 0 24 24" 
                    stroke="currentColor"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" />
                  </svg>
                )}
              </div>
            </th>
            <th 
              className="cursor-pointer hover:bg-base-200 transition-colors" 
              onClick={() => handleSort('type')}
            >
              <div className="flex items-center space-x-1">
                <span>Type</span>
                {sortBy === 'type' && (
                  <svg 
                    xmlns="http://www.w3.org/2000/svg" 
                    className={`h-4 w-4 transition-transform ${sortOrder === 'asc' ? '' : 'rotate-180'}`} 
                    fill="none" 
                    viewBox="0 0 24 24" 
                    stroke="currentColor"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" />
                  </svg>
                )}
              </div>
            </th>
            <th 
              className="cursor-pointer hover:bg-base-200 transition-colors" 
              onClick={() => handleSort('value')}
            >
              <div className="flex items-center space-x-1">
                <span>Value</span>
                {sortBy === 'value' && (
                  <svg 
                    xmlns="http://www.w3.org/2000/svg" 
                    className={`h-4 w-4 transition-transform ${sortOrder === 'asc' ? '' : 'rotate-180'}`} 
                    fill="none" 
                    viewBox="0 0 24 24" 
                    stroke="currentColor"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" />
                  </svg>
                )}
              </div>
            </th>
            <th>Description</th>
            <th 
              className="cursor-pointer hover:bg-base-200 transition-colors" 
              onClick={() => handleSort('createdAt')}
            >
              <div className="flex items-center space-x-1">
                <span>Created</span>
                {sortBy === 'createdAt' && (
                  <svg 
                    xmlns="http://www.w3.org/2000/svg" 
                    className={`h-4 w-4 transition-transform ${sortOrder === 'asc' ? '' : 'rotate-180'}`} 
                    fill="none" 
                    viewBox="0 0 24 24" 
                    stroke="currentColor"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" />
                  </svg>
                )}
              </div>
            </th>
            <th className="text-right">Actions</th>
          </tr>
        </thead>
        <tbody>
          {assets.map((asset) => (
            <tr key={asset.id} className="hover:bg-base-200 transition-colors">
              <td className="font-medium">{asset.name}</td>
              <td>
                <div className={`badge ${applyColorMode(getAssetTypeColor(asset.type))}`}>
                  {getAssetTypeDisplay(asset.type)}
                </div>
              </td>
              <td className="font-mono">{formatCurrency(asset.value)}</td>
              <td>
                <div className="max-w-xs truncate tooltip" data-tip={asset.description}>
                  {asset.description}
                </div>
              </td>
              <td>{formatDate(asset.createdAt)}</td>
              <td>
                <div className="flex justify-end space-x-2">
                  <Button 
                    variant="ghost" 
                    onClick={() => onEdit(asset)}
                    className="btn-xs"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                    </svg>
                    Edit
                  </Button>
                  <button 
                    onClick={() => onDelete(asset.id)}
                    className="flex items-center px-3 py-1 text-sm font-medium rounded-md text-error hover:bg-error hover:bg-opacity-10 focus:outline-none focus:ring-2 focus:ring-error focus:ring-opacity-50 transition-colors"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                    </svg>
                    Delete
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AssetTable;