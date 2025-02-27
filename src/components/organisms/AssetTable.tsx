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

  const renderSortIndicator = (field: string) => {
    if (sortBy !== field) return null;
    return sortOrder === 'asc' ? ' ↑' : ' ↓';
  };

  return (
    <div className="overflow-x-auto">
      <table className="table w-full">
        <thead>
          <tr>
            <th 
              className="cursor-pointer" 
              onClick={() => handleSort('name')}
            >
              Name{renderSortIndicator('name')}
            </th>
            <th 
              className="cursor-pointer" 
              onClick={() => handleSort('type')}
            >
              Type{renderSortIndicator('type')}
            </th>
            <th 
              className="cursor-pointer" 
              onClick={() => handleSort('value')}
            >
              Value{renderSortIndicator('value')}
            </th>
            <th>Description</th>
            <th 
              className="cursor-pointer" 
              onClick={() => handleSort('createdAt')}
            >
              Created{renderSortIndicator('createdAt')}
            </th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {assets.map((asset) => (
            <tr key={asset.id}>
              <td>{asset.name}</td>
              <td>
                <div className="badge badge-outline">{getAssetTypeDisplay(asset.type)}</div>
              </td>
              <td>${asset.value.toLocaleString()}</td>
              <td className="max-w-xs truncate">{asset.description}</td>
              <td>{new Date(asset.createdAt).toLocaleDateString()}</td>
              <td>
                <div className="flex space-x-2">
                  <Button 
                    variant="ghost" 
                    onClick={() => onEdit(asset)}
                    className="btn-xs"
                  >
                    Edit
                  </Button>
                  <Button 
                    variant="outline" 
                    onClick={() => onDelete(asset.id)}
                    className="btn-xs btn-error"
                  >
                    Delete
                  </Button>
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