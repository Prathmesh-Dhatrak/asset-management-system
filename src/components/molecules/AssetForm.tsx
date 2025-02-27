import React, { useState, useEffect } from 'react';
import Input from 'components/atoms/Input';
import Select from 'components/atoms/Select';
import Button from 'components/atoms/Button';
import { Asset, CreateAssetDTO, UpdateAssetDTO } from 'types/asset.types';

interface AssetFormProps {
  onSubmit: (data: CreateAssetDTO | UpdateAssetDTO) => void;
  isLoading: boolean;
  asset?: Asset;
  isEditing?: boolean;
}

const assetTypeOptions = [
  { value: 'real_estate', label: 'Real Estate' },
  { value: 'stock', label: 'Stock' },
  { value: 'cryptocurrency', label: 'Cryptocurrency' },
  { value: 'vehicle', label: 'Vehicle' },
  { value: 'other', label: 'Other' },
];

const AssetForm: React.FC<AssetFormProps> = ({
  onSubmit,
  isLoading,
  asset,
  isEditing = false,
}) => {
  const [formData, setFormData] = useState<CreateAssetDTO>({
    name: '',
    type: 'real_estate',
    value: 0,
    description: '',
  });

  const [validationErrors, setValidationErrors] = useState({
    name: '',
    type: '',
    value: '',
    description: '',
  });

  useEffect(() => {
    if (asset && isEditing) {
      setFormData({
        name: asset.name,
        type: asset.type,
        value: asset.value,
        description: asset.description,
      });
    }
  }, [asset, isEditing]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    
    if (name === 'value') {
      setFormData((prev) => ({
        ...prev,
        [name]: parseFloat(value) || 0,
      }));
    } else {
      setFormData((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
    
    setValidationErrors((prev) => ({ ...prev, [name]: '' }));
  };

  const validate = () => {
    const errors = {
      name: '',
      type: '',
      value: '',
      description: '',
    };
    let isValid = true;

    if (!formData.name.trim()) {
      errors.name = 'Name is required';
      isValid = false;
    }

    if (!formData.type) {
      errors.type = 'Type is required';
      isValid = false;
    }

    if (formData.value <= 0) {
      errors.value = 'Value must be greater than 0';
      isValid = false;
    }

    if (!formData.description.trim()) {
      errors.description = 'Description is required';
      isValid = false;
    }

    setValidationErrors(errors);
    return isValid;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (validate()) {
      onSubmit(formData);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <Input
        label="Asset Name"
        name="name"
        value={formData.name}
        onChange={handleChange}
        error={validationErrors.name}
        required
      />

      <Select
        label="Asset Type"
        name="type"
        value={formData.type}
        onChange={handleChange}
        options={assetTypeOptions}
        error={validationErrors.type}
        required
      />

      <Input
        label="Value"
        type="number"
        name="value"
        value={formData.value.toString()}
        onChange={handleChange}
        error={validationErrors.value}
        required
        min="0"
        step="0.01"
      />

      <div className="form-control w-full">
        <label className="label">
          <span className="label-text">Description</span>
        </label>
        <textarea
          className={`textarea textarea-bordered h-24 ${
            validationErrors.description ? 'textarea-error' : ''
          }`}
          name="description"
          value={formData.description}
          onChange={handleChange}
          required
        ></textarea>
        {validationErrors.description && (
          <label className="label">
            <span className="label-text-alt text-error">{validationErrors.description}</span>
          </label>
        )}
      </div>

      <Button type="submit" variant="primary" className="w-full" isLoading={isLoading}>
        {isEditing ? 'Update Asset' : 'Add Asset'}
      </Button>
    </form>
  );
};

export default AssetForm;