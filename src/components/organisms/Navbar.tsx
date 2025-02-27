import React, { useState, useCallback } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from 'hooks/reduxHooks';
import { logout } from 'store/slices/auth';
import { toggleDarkMode } from 'store/slices/ui';
import Button from 'components/atoms/Button';
import { UserDTO } from 'types/user.types';

type NavigationLink = {
  to: string;
  text: string;
};

interface ThemeToggleProps {
  darkMode: boolean;
  onToggle: () => void;
}

interface IconProps {
  className?: string;
}

const SunIcon: React.FC<IconProps> = ({ className = "w-5 h-5 fill-current" }) => (
  <svg className={className} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
    <path d="M5.64,17l-.71.71a1,1,0,0,0,0,1.41,1,1,0,0,0,1.41,0l.71-.71A1,1,0,0,0,5.64,17ZM5,12a1,1,0,0,0-1-1H3a1,1,0,0,0,0,2H4A1,1,0,0,0,5,12Zm7-7a1,1,0,0,0,1-1V3a1,1,0,0,0-2,0V4A1,1,0,0,0,12,5ZM5.64,7.05a1,1,0,0,0,.7.29,1,1,0,0,0,.71-.29,1,1,0,0,0,0-1.41l-.71-.71A1,1,0,0,0,4.93,6.34Zm12,.29a1,1,0,0,0,.7-.29l.71-.71a1,1,0,1,0-1.41-1.41L17,5.64a1,1,0,0,0,0,1.41A1,1,0,0,0,17.66,7.34ZM21,11H20a1,1,0,0,0,0,2h1a1,1,0,0,0,0-2Zm-9,8a1,1,0,0,0-1,1v1a1,1,0,0,0,2,0V20A1,1,0,0,0,12,19ZM18.36,17A1,1,0,0,0,17,18.36l.71.71a1,1,0,0,0,1.41,0,1,1,0,0,0,0-1.41ZM12,6.5A5.5,5.5,0,1,0,17.5,12,5.51,5.51,0,0,0,12,6.5Zm0,9A3.5,3.5,0,1,1,15.5,12,3.5,3.5,0,0,1,12,15.5Z" />
  </svg>
);

const MoonIcon: React.FC<IconProps> = ({ className = "w-5 h-5 fill-current" }) => (
  <svg className={className} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
    <path d="M21.64,13a1,1,0,0,0-1.05-.14,8.05,8.05,0,0,1-3.37.73A8.15,8.15,0,0,1,9.08,5.49a8.59,8.59,0,0,1,.25-2A1,1,0,0,0,8,2.36,10.14,10.14,0,1,0,22,14.05,1,1,0,0,0,21.64,13Zm-9.5,6.69A8.14,8.14,0,0,1,7.08,5.22v.27A10.15,10.15,0,0,0,17.22,15.63a9.79,9.79,0,0,0,2.1-.22A8.11,8.11,0,0,1,12.14,19.73Z" />
  </svg>
);

const Logo: React.FC = () => (
  <Link to="/" className="flex items-center gap-2">
    <div className="w-10 h-10 flex items-center justify-center">
      <img
        src="/favicon.svg"
        alt="Asset Manager Logo"
        className="w-full h-full object-contain"
      />
    </div>
    <span className="font-semibold text-xl">Asset Manager</span>
  </Link>
);

const ThemeToggle: React.FC<ThemeToggleProps> = ({ darkMode, onToggle }) => (
  <button
    onClick={onToggle}
    className="p-2 rounded-full hover:bg-base-200"
    aria-label="Toggle dark mode"
  >
    {darkMode ? <SunIcon /> : <MoonIcon />}
  </button>
);

interface UserAvatarProps {
  user: UserDTO | null;
  onClick?: () => void;
}

const UserAvatar: React.FC<UserAvatarProps> = ({ user, onClick }) => (
  <div 
    onClick={onClick}
    className="cursor-pointer flex items-center justify-center rounded-full w-10 h-10 
      bg-indigo-500 text-white hover:bg-indigo-600 
      transition-colors"
  >
    <span>{user?.username?.charAt(0).toUpperCase() || 'U'}</span>
  </div>
);

const Navbar: React.FC = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const { isAuthenticated, user } = useAppSelector(state => state.auth);
  const { darkMode } = useAppSelector(state => state.ui);
  const [mobileMenuOpen, setMobileMenuOpen] = useState<boolean>(false);

  const handleLogout = useCallback((): void => {
    dispatch(logout());
    navigate('/login');
    setMobileMenuOpen(false);
  }, [dispatch, navigate]);

  const handleToggleDarkMode = useCallback((): void => {
    dispatch(toggleDarkMode());
  }, [dispatch]);

  const isActive = useCallback((path: string): boolean => 
    location.pathname === path, [location.pathname]);

  const toggleMobileMenu = useCallback((): void => {
    setMobileMenuOpen(prev => !prev);
  }, []);

  const closeMobileMenu = useCallback((): void => {
    setMobileMenuOpen(false);
  }, []);

  const getNavigationLink = useCallback((): NavigationLink | null => {
    if (location.pathname === '/') {
      return { to: '/dashboard', text: 'Dashboard' };
    } else if (location.pathname === '/dashboard') {
      return { to: '/', text: 'Home' };
    }
    return null;
  }, [location.pathname]);

  const navLink = getNavigationLink();

  return (
    <nav className="bg-base-100 border-b border-base-200">
      <div className="container mx-auto px-4">
        <div className="hidden md:flex justify-between items-center h-16">
          <Logo />

          <div className="flex items-center space-x-1">
            <div className="flex items-center ml-4">
              {isAuthenticated ? (
                <div className="dropdown dropdown-end">
                  <label tabIndex={0}>
                    <UserAvatar user={user} />
                  </label>
                  <ul tabIndex={0} className="mt-2 z-[1] p-2 shadow menu menu-sm dropdown-content bg-base-100 rounded-box w-52">
                    <p className="px-1 py-2 text-sm opacity-70 font-medium">{`Hi ${user?.username || ''}`}</p>
                    {location.pathname === '/' || location.pathname === '/dashboard' ? (
                      navLink && (
                        <li><Link to={navLink.to} className="hover:bg-base-200">{navLink.text}</Link></li>
                      )
                    ) : (
                      <>
                        <li><Link to="/" className="hover:bg-base-200">Home</Link></li>
                        <li><Link to="/dashboard" className="hover:bg-base-200">Dashboard</Link></li>
                      </>
                    )}
                    <li><button onClick={handleLogout} className="text-red-600 hover:bg-base-200 w-full text-left">Logout</button></li>
                  </ul>
                </div>
              ) : (
                <>
                  <Link to="/login">
                    <Button variant="ghost">Login</Button>
                  </Link>
                  <Link to="/register">
                    <Button variant="primary">Sign Up</Button>
                  </Link>
                </>
              )}
            </div>
            <ThemeToggle darkMode={darkMode} onToggle={handleToggleDarkMode} />
          </div>
        </div>

        <div className="md:hidden flex justify-between items-center h-16">
          <Logo />

          <div className="flex items-center">
            <ThemeToggle darkMode={darkMode} onToggle={handleToggleDarkMode} />
            <button
              type="button"
              className="inline-flex items-center justify-center p-2 rounded-md hover:bg-base-200 ml-1"
              aria-expanded={mobileMenuOpen}
              onClick={toggleMobileMenu}
            >
              <span className="sr-only">Open main menu</span>
              {mobileMenuOpen ? (
                <svg className="h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
              ) : (
                <svg className="h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              )}
            </button>
          </div>
        </div>

        {mobileMenuOpen && (
          <div className="md:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 border-t border-base-200">
              <Link
                to="/"
                className={`block px-3 py-2 rounded-md text-base font-medium ${
                  isActive('/') ? 'bg-indigo-600 text-white' : 'text-base-content hover:bg-base-200'
                }`}
                onClick={closeMobileMenu}
              >
                Home
              </Link>

              {isAuthenticated && (
                <Link
                  to="/dashboard"
                  className={`block px-3 py-2 rounded-md text-base font-medium ${
                    isActive('/dashboard') ? 'bg-indigo-600 text-white' : 'text-base-content hover:bg-base-200'
                  }`}
                  onClick={closeMobileMenu}
                >
                  Dashboard
                </Link>
              )}

              {isAuthenticated ? (
                <div className="border-t border-base-200 mt-2 pt-2">
                  <div className="px-3 py-2 text-sm opacity-70">
                    Signed in as <span className="font-medium">{user?.username}</span>
                  </div>
                  <button
                    onClick={handleLogout}
                    className="block w-full text-left px-3 py-2 rounded-md text-base font-medium text-red-600 hover:bg-base-200"
                  >
                    Logout
                  </button>
                </div>
              ) : (
                <div className="border-t border-base-200 mt-2 pt-2 space-y-1">
                  <Link
                    to="/login"
                    className="block px-3 py-2 rounded-md text-base font-medium hover:bg-base-200"
                    onClick={closeMobileMenu}
                  >
                    Login
                  </Link>
                  <Link
                    to="/register"
                    className="block px-3 py-2 rounded-md text-base font-medium bg-indigo-600 text-white hover:bg-indigo-700"
                    onClick={closeMobileMenu}
                  >
                    Sign Up
                  </Link>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;