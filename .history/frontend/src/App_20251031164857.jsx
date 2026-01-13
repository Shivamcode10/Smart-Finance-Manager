// frontend/src/App.jsx
import React, { useEffect, useContext } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { FinanceProvider, FinanceContext } from './context/FinanceContext';

import Sidebar from './components/Sidebar';
import ErrorAlert from './components/ErrorAlert';

import Dashboard from './pages/Dashboard';
import Transactions from './pages/Transactions';
import Budgets from './pages/Budgets';
import IncomeStreams from './pages/IncomeStreams';
import Reports from './pages/Reports';
import MyProfile from './pages/MyProfile';
import MySettings from './pages/MySettings';
import Login from './pages/Login';

function AppContent() {
  const { isAuthenticated, loading, theme } = useContext(FinanceContext);

  useEffect(() => {
    // Apply theme to document
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [theme]);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="text-xl font-semibold text-gray-900 dark:text-white">
          Loading...
        </div>
      </div>
    );
  }

  return (
    <div className={`min-h-screen ${theme === 'dark' ? 'dark' : ''}`}>
      {isAuthenticated ? (
        <div className="flex h-screen bg-gray-50 dark:bg-gray-900">
          <Sidebar />
          <div className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-100 dark:bg-gray-800 p-6">
            <Routes>
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/transactions" element={<Transactions />} />
              <Route path="/goals" element={<MyProfile />} />
              <Route path="/budgets" element={<Budgets />} />
              <Route path="/income-streams" element={<IncomeStreams />} />
              <Route path="/reports" element={<Reports />} />
              <Route path="/profile" element={<MyProfile />} />
              <Route path="/settings" element={<MySettings />} />
              <Route path="*" element={<Navigate to="/dashboard" />} />
            </Routes>
          </div>
        </div>
      ) : (
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Login />} />
          <Route path="*" element={<Navigate to="/login" />} />
        </Routes>
      )}
    </div>
  );
}

function App() {
  return (
    <FinanceProvider>
      <Router>
        <AppContent />
        <ErrorAlert />
      </Router>
    </FinanceProvider>
  );
}

export default App;
