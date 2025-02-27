import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { useAppSelector } from 'hooks/reduxHooks';

import HomePage from 'app/pages/HomePage';
import LoginPage from 'app/pages/LoginPage';
import RegisterPage from 'app/pages/RegisterPage';
import DashboardPage from 'app/pages/DashboardPage';

const ProtectedRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { isAuthenticated } = useAppSelector(state => state.auth);
  
  if (!isAuthenticated) {
    return <Navigate to="/login" />;
  }
  
  return <>{children}</>;
};

const AppRoutes: React.FC = () => {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage />} />
      <Route path="/dashboard" element={
        <ProtectedRoute>
          <DashboardPage />
        </ProtectedRoute>
      } />
      <Route path="*" element={<Navigate to="/" />} />
    </Routes>
  );
};

export default AppRoutes;