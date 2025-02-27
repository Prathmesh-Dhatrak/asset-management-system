import React, { useState } from 'react';
import Select from 'components/atoms/Select';
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

const sortByOptions = [
  { value: 'name', label: 'Name' },
  { value: 'type', label: 'Type' },
  { value: 'value', label: 'Value' },
  { value: 'createdAt', label: 'Date Created' },
];

const sortOrderOptions = [
  { value: 'asc', label: 'Ascending' },
  { value: 'desc', label: 'Descending' },
];

const AssetFilter: React.FC<AssetFilterProps> = ({ onFilter, initialFilters = {} }) => {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [filters, setFilters] = useState<AssetQueryParams>({
    type: initialFilters.type,
    minValue: initialFilters.minValue ?? undefined,
    maxValue: initialFilters.maxValue,
    sortBy: initialFilters.sortBy || 'createdAt',
    sortOrder: initialFilters.sortOrder || 'desc',
  });

  const [activeFiltersCount, setActiveFiltersCount] = useState(() => {
    let count = 0;
    if (filters.type) count++;
    if (filters.minValue !== undefined) count++;
    if (filters.maxValue !== undefined) count++;
    if (filters.sortBy !== 'createdAt' || filters.sortOrder !== 'desc') count++;
    return count;
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    
    if (name === 'minValue' || name === 'maxValue') {
      setFilters((prev) => ({
        ...prev,
        [name]: value === '' ? undefined : parseFloat(value),
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
    let count = 0;
    if (filters.type) count++;
    if (filters.minValue !== undefined) count++;
    if (filters.maxValue !== undefined) count++;
    if (filters.sortBy !== 'createdAt' || filters.sortOrder !== 'desc') count++;
    setActiveFiltersCount(count);
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
    setActiveFiltersCount(0);
    onFilter(resetFilters);
  };

  const toggleCollapse = () => {
    setIsCollapsed(!isCollapsed);
  };

  return (
    <div className="bg-base-200 rounded-lg shadow-sm mb-6 transition-all duration-300">
      <div 
        className="flex items-center justify-between p-4 cursor-pointer"
        onClick={toggleCollapse}
      >
        <div className="flex items-center gap-2">
          <svg 
            xmlns="http://www.w3.org/2000/svg" 
            className={`h-5 w-5 transition-transform duration-200 ${isCollapsed ? '' : 'rotate-180'}`}
            viewBox="0 0 20 20" 
            fill="currentColor"
          >
            <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
          </svg>
          <h3 className="font-medium text-lg">Filter & Sort Assets</h3>
        </div>
        {activeFiltersCount > 0 && (
          <div className="badge badge-primary text-white">{activeFiltersCount} active filters</div>
        )}
      </div>
      
      {!isCollapsed && (
        <form onSubmit={handleSubmit} className="p-4 pt-0 border-t border-base-300">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <Select
              label="Asset Type"
              name="type"
              value={filters.type || ''}
              onChange={handleChange}
              options={assetTypeOptions}
            />
            
            <div className="flex flex-col space-y-1">
              <label className="label">
                <span className="label-text">Value Range</span>
              </label>
              <div className="flex items-center space-x-2">
                <div className="flex-1">
                  <input
                    type="number"
                    name="minValue"
                    value={filters.minValue?.toString() || ''}
                    onChange={handleChange}
                    min="0"
                    step="0.01"
                    className="input input-bordered w-full"
                    placeholder="Min"
                  />
                </div>
                <span className="text-base-content/70">to</span>
                <div className="flex-1">
                  <input
                    type="number"
                    name="maxValue"
                    value={filters.maxValue?.toString() || ''}
                    onChange={handleChange}
                    min="0"
                    step="0.01"
                    className="input input-bordered w-full"
                    placeholder="Max"
                  />
                </div>
              </div>
            </div>
            
            <Select
              label="Sort By"
              name="sortBy"
              value={filters.sortBy || 'createdAt'}
              onChange={handleChange}
              options={sortByOptions}
            />
            
            <Select
              label="Sort Order"
              name="sortOrder"
              value={filters.sortOrder || 'desc'}
              onChange={handleChange}
              options={sortOrderOptions}
            />
          </div>
          
          <div className="flex justify-end space-x-3 mt-6">
            <Button type="button" variant="ghost" onClick={handleReset} className="btn-sm">
              Reset Filters
            </Button>
            <Button type="submit" variant="primary" className="btn-sm">
              Apply Filters
            </Button>
          </div>
        </form>
      )}
    </div>
  );
};

export default AssetFilter;