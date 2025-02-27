import { useEffect } from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { useAppSelector } from 'hooks/reduxHooks';

import AppRoutes from './routes';

function App() {
  const { darkMode } = useAppSelector(state => state.ui);

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', darkMode ? 'dark' : 'light');
  }, [darkMode]);

  return (
    <Router>
      <AppRoutes />
    </Router>
  );
}

export default App;