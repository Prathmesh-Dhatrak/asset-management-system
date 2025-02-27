import React, { ReactNode } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeftIcon } from '@heroicons/react/24/outline';

interface AuthLayoutProps {
  children: ReactNode;
  title: string;
  subtitle: ReactNode;
}

const AuthLayout: React.FC<AuthLayoutProps> = ({ children, title, subtitle }) => {
  return (
    <div className="min-h-screen flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 bg-base-200">
      <div className="max-w-md w-full space-y-8 p-8 bg-base-100 shadow-xl rounded-xl relative">
        <Link 
          to="/" 
          className="absolute top-4 left-4 p-2 rounded-full flex items-center justify-center hover:bg-gray-200 dark:hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-colors"
          aria-label="Back to home"
        >
          <ArrowLeftIcon className="h-5 w-5 text-gray-700 dark:text-gray-300" />
        </Link>

        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-base-content">
            {title}
          </h2>
          <p className="mt-2 text-center text-sm text-base-content opacity-70">
            {subtitle}
          </p>
        </div>

        {children}
      </div>
    </div>
  );
};

export default AuthLayout;