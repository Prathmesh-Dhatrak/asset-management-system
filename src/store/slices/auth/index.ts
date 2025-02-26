import authReducer, { logout, clearError } from './authSlice';
import { login, register } from '../../actions/authActions';

export {
  login,
  register,
  logout,
  clearError
};

export default authReducer;