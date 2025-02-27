import React from 'react';
import { Link } from 'react-router-dom';
import { useAppSelector } from 'hooks/reduxHooks';
import AppLayout from 'app/templates/AppLayout';

const HomePage: React.FC = () => {
  const { isAuthenticated } = useAppSelector(state => state.auth);

  return (
    <AppLayout activeFooter={true}>
      <div className="hero bg-base-200">
        <div className="hero-content text-center">
          <div className="max-w-lg">
            <h1 className="text-4xl font-bold">Asset Management System</h1>
            <p className="py-6">
              React-based web application that includes user authentication and an asset management system using Tailwind CSS and DaisyUI.
            </p>
            {isAuthenticated ? (
              <Link to="/dashboard" className="btn btn-primary">Go to Dashboard</Link>
            ) : (
              <div className="space-x-4">
                <Link to="/login" className="btn btn-primary">Log In</Link>
                <Link to="/register" className="btn btn-outline">Sign Up</Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </AppLayout>
  );
};

export default HomePage;