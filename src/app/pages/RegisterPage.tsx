import React, { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from 'hooks/reduxHooks';
import { register, clearError } from 'store/slices/auth';
import AuthForm from 'components/molecules/AuthForm';
import { AuthRequest } from 'types/user.types';
import AuthLayout from 'app/templates/AuthLayout';
import Alert from 'components/atoms/Alert';

const RegisterPage: React.FC = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { loading, error, isAuthenticated } = useAppSelector(state => state.auth);

  useEffect(() => {
    dispatch(clearError());
  }, [dispatch]);

  useEffect(() => {
    if (isAuthenticated) {
      navigate('/dashboard');
    }
  }, [isAuthenticated, navigate]);

  const handleRegister = (userData: AuthRequest) => {
    dispatch(register(userData));
  };

  return (
    <AuthLayout 
      title="Create a new account"
      subtitle={
        <>
          Or{' '}
          <Link to="/login" className="font-medium text-primary hover:text-primary-focus">
            log in to your existing account
          </Link>
        </>
      }
    >
      {error && (
        <div className="mb-4">
          <Alert type="error" message={error} />
        </div>
      )}
      <AuthForm
        type="register"
        onSubmit={handleRegister}
        isLoading={loading}
        error={null}
      />
    </AuthLayout>
  );
};

export default RegisterPage;