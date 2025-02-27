import React, { useState } from 'react';
import Select from 'components/atoms/Select';
import Input from 'components/atoms/Input';
import Button from 'components/atoms/Button';
import { AssetQueryParams, AssetType } from 'types/asset.types';

interface AssetFilterProps {
  onFilter: (filters: AssetQueryParams) => void;
  initialFilters?: AssetQueryParams;
}

const assetTypeOptions = [
  { value: '', label: 'All Types' },
  { value: 'real_estate', label: 'Real Estate' },
  { value: 'stock', label: 'Stock' },
  { value: 'cryptocurrency', label: 'Cryptocurrency' },
  { value: 'vehicle', label: 'Vehicle' },
  { value: 'other', label: 'Other' },
];

const AssetFilter: React.FC<AssetFilterProps> = ({ onFilter, initialFilters = {} }) => {
  const [filters, setFilters] = useState<AssetQueryParams>({
    type: initialFilters.type,
    minValue: initialFilters.minValue || 0,
    maxValue: initialFilters.maxValue,
    sortBy: initialFilters.sortBy || 'createdAt',
    sortOrder: initialFilters.sortOrder || 'desc',
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    
    if (name === 'minValue' || name === 'maxValue') {
      setFilters((prev) => ({
        ...prev,
        [name]: value ? parseFloat(value) : undefined,
      }));
    } else if (name === 'type') {
      setFilters((prev) => ({
        ...prev,
        type: value === '' ? undefined : value as AssetType,
      }));
    } else {
      setFilters((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onFilter(filters);
  };

  const handleReset = () => {
    const resetFilters: AssetQueryParams = {
      type: undefined,
      minValue: undefined,
      maxValue: undefined,
      sortBy: 'createdAt',
      sortOrder: 'desc',
    };
    setFilters(resetFilters);
    onFilter(resetFilters);
  };

  return (
    <form onSubmit={handleSubmit} className="bg-base-200 p-4 rounded-lg">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Select
          label="Asset Type"
          name="type"
          value={filters.type || ''}
          onChange={handleChange}
          options={assetTypeOptions}
        />
        
        <Input
          label="Min Value"
          type="number"
          name="minValue"
          value={filters.minValue?.toString() || ''}
          onChange={handleChange}
          min="0"
          step="0.01"
        />
        
        <Input
          label="Max Value"
          type="number"
          name="maxValue"
          value={filters.maxValue?.toString() || ''}
          onChange={handleChange}
          min="0"
          step="0.01"
        />
      </div>
      
      <div className="flex justify-end space-x-2 mt-4">
        <Button type="button" variant="ghost" onClick={handleReset}>
          Reset
        </Button>
        <Button type="submit" variant="primary">
          Apply Filters
        </Button>
      </div>
    </form>
  );
};

export default AssetFilter;