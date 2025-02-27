// API base URL
export const API_BASE_URL = 'https://asset-manager-backend.fly.dev';

// API endpoints
export const AUTH_ENDPOINTS = {
  REGISTER: `${API_BASE_URL}/api/auth/register`,
  LOGIN: `${API_BASE_URL}/api/auth/login`,
  ME: `${API_BASE_URL}/api/auth/me`,
};

export const ASSET_ENDPOINTS = {
  BASE: `${API_BASE_URL}/api/assets`,
};