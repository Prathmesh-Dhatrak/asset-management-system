import React from 'react';
import { Link } from 'react-router-dom';
import { useAppSelector } from 'hooks/reduxHooks';
import Navbar from 'components/organisms/Navbar';

const HomePage: React.FC = () => {
  const { isAuthenticated } = useAppSelector(state => state.auth);

  return (
    <div className="flex flex-col min-h-screen bg-base-200">
      <Navbar />

      <div className="flex-grow hero bg-base-200">
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

      <footer className="footer footer-center p-4 bg-base-300 text-base-content mt-auto">
        <div>
          <p>Asset Manager &copy; {new Date().getFullYear()}</p>
        </div>
      </footer>
    </div>
  );
};

export default HomePage;