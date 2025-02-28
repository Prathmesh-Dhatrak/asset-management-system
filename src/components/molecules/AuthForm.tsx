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

  const [showPassword, setShowPassword] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    
    // Clear validation error for this field
    setValidationErrors(prev => ({ ...prev, [name]: '' }));
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
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

  const handleUseDemoUser = () => {
    const demoUser = {
      email: "prathmesh_user@gmail.com",
      password: "pass1234"
    };
    
    setFormData(prev => ({
      ...prev,
      email: demoUser.email,
      password: demoUser.password
    }));
    
    setValidationErrors({
      username: '',
      email: '',
      password: '',
    });
    onSubmit(demoUser);
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
      
      <div className="form-control w-full">
        <label className="label">
          <span className="label-text">Password</span>
        </label>
        <div className="relative">
          <input
            type={showPassword ? "text" : "password"}
            name="password"
            value={formData.password}
            onChange={handleChange}
            className={`input input-bordered w-full pr-10 ${
              validationErrors.password ? 'input-error' : ''
            }`}
            required
          />
          <button
            type="button"
            className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600"
            onClick={togglePasswordVisibility}
          >
            {showPassword ? (
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path d="M10 12a2 2 0 100-4 2 2 0 000 4z" />
                <path fillRule="evenodd" d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z" clipRule="evenodd" />
              </svg>
            ) : (
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M3.707 2.293a1 1 0 00-1.414 1.414l14 14a1 1 0 001.414-1.414l-1.473-1.473A10.014 10.014 0 0019.542 10C18.268 5.943 14.478 3 10 3a9.958 9.958 0 00-4.512 1.074l-1.78-1.781zm4.261 4.26l1.514 1.515a2.003 2.003 0 012.45 2.45l1.514 1.514a4 4 0 00-5.478-5.478z" clipRule="evenodd" />
                <path d="M12.454 16.697L9.75 13.992a4 4 0 01-3.742-3.741L2.335 6.578A9.98 9.98 0 00.458 10c1.274 4.057 5.065 7 9.542 7 .847 0 1.669-.105 2.454-.303z" />
              </svg>
            )}
          </button>
        </div>
        {validationErrors.password && (
          <label className="label">
            <span className="label-text-alt text-error">{validationErrors.password}</span>
          </label>
        )}
      </div>
      
      <div className="flex flex-col space-y-3">
        <Button 
          type="submit" 
          variant="primary" 
          className="w-full" 
          isLoading={isLoading}
        >
          {type === 'login' ? 'Log In' : 'Sign Up'}
        </Button>
        
        {type === 'login' && (
          <Button 
            type="button" 
            variant="outline" 
            className="w-full" 
            onClick={handleUseDemoUser}
          >
            Use Demo User
          </Button>
        )}
      </div>
    </form>
  );
};

export default AuthForm;