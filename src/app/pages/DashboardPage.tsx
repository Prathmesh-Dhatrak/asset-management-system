import React from 'react';
import Navbar from 'components/organisms/Navbar';
import AssetManager from 'components/organisms/AssetManager';

const DashboardPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-base-200">
      <Navbar />
      <div className="container mx-auto px-4 py-8">
        <div className="bg-base-100 shadow-xl rounded-xl p-6">
          <AssetManager />
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;