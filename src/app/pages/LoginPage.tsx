import React, { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from 'hooks/reduxHooks';
import { login, clearError } from 'store/slices/auth';
import AuthForm from 'components/molecules/AuthForm';
import { AuthRequest } from 'types/user.types';
import AuthLayout from 'app/templates/AuthLayout';
import Alert from 'components/atoms/Alert';

const LoginPage: React.FC = () => {
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

  const handleLogin = (credentials: AuthRequest) => {
    dispatch(login(credentials));
  };

  return (
    <AuthLayout 
      title="Log in to your account"
      subtitle={
        <>
          Or{' '}
          <Link to="/register" className="font-medium text-primary hover:text-primary-focus">
            create a new account
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
        type="login"
        onSubmit={handleLogin}
        isLoading={loading}
        error={null}
      />
    </AuthLayout>
  );
};

export default LoginPage;