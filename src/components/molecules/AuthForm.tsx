import React, { useState } from 'react';
import Input from 'components/atoms/Input';
import Button from 'components/atoms/Button';
import Alert from 'components/atoms/Alert';
import { AuthRequest } from 'types/user.types';

interface AuthFormProps {
  type: 'login' | 'register';
  onSubmit: (data: AuthRequest) => void;
  isLoading: boolean;
  error: string | null;
}

const AuthForm: React.FC<AuthFormProps> = ({ type, onSubmit, isLoading, error }) => {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
  });
  
  const [validationErrors, setValidationErrors] = useState({
    username: '',
    email: '',
    password: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    
    setValidationErrors(prev => ({ ...prev, [name]: '' }));
  };

  const validate = () => {
    const errors = {
      username: '',
      email: '',
      password: '',
    };
    let isValid = true;
    
    if (type === 'register' && !formData.username.trim()) {
      errors.username = 'Username is required';
      isValid = false;
    }
    
    if (!formData.email.trim()) {
      errors.email = 'Email is required';
      isValid = false;
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      errors.email = 'Email is invalid';
      isValid = false;
    }
    
    if (!formData.password) {
      errors.password = 'Password is required';
      isValid = false;
    } else if (formData.password.length < 6) {
      errors.password = 'Password must be at least 6 characters';
      isValid = false;
    }
    
    setValidationErrors(errors);
    return isValid;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (validate()) {
      const dataToSubmit = type === 'login' 
        ? { email: formData.email, password: formData.password }
        : formData;
      onSubmit(dataToSubmit);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {error && <Alert type="error" message={error} />}
      
      {type === 'register' && (
        <Input
          label="Username"
          name="username"
          value={formData.username}
          onChange={handleChange}
          error={validationErrors.username}
          required
        />
      )}
      
      <Input
        label="Email"
        type="email"
        name="email"
        value={formData.email}
        onChange={handleChange}
        error={validationErrors.email}
        required
      />
      
      <Input
        label="Password"
        type="password"
        name="password"
        value={formData.password}
        onChange={handleChange}
        error={validationErrors.password}
        required
      />
      
      <Button 
        type="submit" 
        variant="primary" 
        className="w-full mt-4" 
        isLoading={isLoading}
      >
        {type === 'login' ? 'Log In' : 'Sign Up'}
      </Button>
    </form>
  );
};

export default AuthForm;