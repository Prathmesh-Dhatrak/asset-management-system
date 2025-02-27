import React, { ReactNode } from 'react';
import Navbar from 'components/organisms/Navbar';

interface AppLayoutProps {
    children: ReactNode;
    activeFooter?: boolean;
}

const AppLayout: React.FC<AppLayoutProps> = ({ children, activeFooter }) => {
    return (
        <div className="flex flex-col min-h-screen bg-base-200">
            <Navbar />
            <main className="flex-grow">
                {children}
            </main>
            {activeFooter && (
                <footer className="footer footer-center p-4 bg-base-300 text-base-content mt-auto">
                    <div>
                        <p>Asset Management System &copy; {new Date().getFullYear()}</p>
                    </div>
                </footer>
            )}
        </div>
    );
};

export default AppLayout;