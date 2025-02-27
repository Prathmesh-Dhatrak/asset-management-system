import React from 'react';
import { Asset } from 'types/asset.types';
import Button from 'components/atoms/Button';

interface AssetCardProps {
  asset: Asset;
  onEdit: (asset: Asset) => void;
  onDelete: (assetId: string) => void;
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

const AssetCard: React.FC<AssetCardProps> = ({ asset, onEdit, onDelete }) => {
  return (
    <div className="card bg-base-100 shadow-xl">
      <div className="card-body">
        <h2 className="card-title">{asset.name}</h2>
        <div className="badge badge-secondary">{getAssetTypeDisplay(asset.type)}</div>
        <p className="text-2xl font-semibold">${asset.value.toLocaleString()}</p>
        <p className="mt-2">{asset.description}</p>
        <div className="card-actions justify-end mt-4">
          <Button 
            variant="ghost" 
            onClick={() => onEdit(asset)}
            className="btn-sm"
          >
            Edit
          </Button>
          <Button 
            variant="outline" 
            onClick={() => onDelete(asset.id)}
            className="btn-sm btn-error"
          >
            Delete
          </Button>
        </div>
      </div>
    </div>
  );
};

export default AssetCard;