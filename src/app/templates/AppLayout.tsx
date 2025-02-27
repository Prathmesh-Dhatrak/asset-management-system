import React, { ReactNode } from 'react';
import Navbar from 'components/organisms/Navbar';

interface AppLayoutProps {
    children: ReactNode;
}

const AppLayout: React.FC<AppLayoutProps> = ({ children }) => {
    return (
        <div className="flex flex-col min-h-screen bg-base-200">
            <Navbar />
            <main className="flex-grow">
                {children}
            </main>
            <footer className="footer footer-center p-4 bg-base-300 text-base-content mt-auto">
                <div>
                    <p>Asset Management System &copy; {new Date().getFullYear()}</p>
                </div>
            </footer>
        </div>
    );
};

export default AppLayout;