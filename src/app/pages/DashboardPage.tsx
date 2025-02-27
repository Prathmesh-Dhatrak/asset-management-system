import React from 'react';
import AppLayout from 'app/templates/AppLayout';
import AssetManager from 'components/organisms/AssetManager';

const DashboardPage: React.FC = () => {

  return (
    <AppLayout>
      <div className="container mx-auto px-4 py-8">
        <div className="bg-base-100 shadow-xl rounded-xl p-6">
          <AssetManager />
        </div>
      </div>
    </AppLayout>
  );
};

export default DashboardPage;