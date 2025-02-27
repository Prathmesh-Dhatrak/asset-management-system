import React from 'react';
import { Link } from 'react-router-dom';
import { useAppSelector } from 'hooks/reduxHooks';
import Navbar from 'components/organisms/Navbar';

const HomePage: React.FC = () => {
  const { isAuthenticated } = useAppSelector(state => state.auth);

  return (
    <div className="min-h-screen bg-base-200">
      <Navbar />
      
      <div className="hero min-h-[80vh] bg-base-200">
        <div className="hero-content text-center">
          <div className="max-w-md">
            <h1 className="text-5xl font-bold">Asset Management System</h1>
            <p className="py-6">
              A secure platform to manage your assets with easy tracking and organization.
              Keep all your investments and assets in one place.
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
      
      <footer className="footer footer-center p-4 bg-base-300 text-base-content">
        <div>
          <p>Asset Management System &copy; {new Date().getFullYear()}</p>
        </div>
      </footer>
    </div>
  );
};

export default HomePage;