import React from 'react';
import { useAppSelector } from 'hooks/reduxHooks';
import Navbar from 'components/organisms/Navbar';

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
          
          <p className="text-base-content">
            This is your asset management dashboard.
          </p>
          
          <div className="divider">Assets will appear below</div>
          
          <div className="bg-base-200 p-4 rounded-lg text-center">
            <p className="text-base-content opacity-70">
              Asset management features will be implemented in the next phase.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;