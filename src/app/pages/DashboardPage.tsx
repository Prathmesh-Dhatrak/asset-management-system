import React from 'react';
import { useAppSelector } from 'hooks/reduxHooks';
import Navbar from 'components/organisms/Navbar';
import AssetManager from 'components/organisms/AssetManager';

const DashboardPage: React.FC = () => {
  const { user } = useAppSelector(state => state.auth);

  return (
    <div className="min-h-screen bg-base-200">
      <Navbar />
      
      <div className="container mx-auto px-4 py-8">
        <div className="bg-base-100 shadow-xl rounded-xl p-6">
          <h1 className="text-2xl font-bold text-base-content mb-6">
            Welcome to your Dashboard, {user?.username}!
          </h1>
          
          <p className="text-base-content mb-8">
            Manage your assets portfolio in one place. Add, edit, and monitor your investments.
          </p>
          
          <AssetManager />
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;