import React, { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from 'hooks/reduxHooks';
import { login, clearError } from 'store/slices/auth';
import AuthForm from 'components/molecules/AuthForm';
import { AuthRequest } from 'types/user.types';

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
    <div className="min-h-screen flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 bg-base-200">
      <div className="max-w-md w-full space-y-8 p-8 bg-base-100 shadow-xl rounded-xl">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-base-content">
            Log in to your account
          </h2>
          <p className="mt-2 text-center text-sm text-base-content opacity-70">
            Or{' '}
            <Link to="/register" className="font-medium text-primary hover:text-primary-focus">
              create a new account
            </Link>
          </p>
        </div>

        <AuthForm
          type="login"
          onSubmit={handleLogin}
          isLoading={loading}
          error={error}
        />
      </div>
    </div>
  );
};

export default LoginPage;