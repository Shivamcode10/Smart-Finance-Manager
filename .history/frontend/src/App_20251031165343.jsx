// frontend/src/App.jsx
import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { FinanceProvider, FinanceContext } from './context/FinanceContext';
import Navbar from './components/Navbar';
import Sidebar from './components/Sidebar';
import Dashboard from './pages/Dashboard';
import Transactions from './pages/Transactions';
import Goals from './pages/Goals';
import Budgets from './pages/Budgets';
import IncomeStreams from './pages/IncomeStreams';
import LoginSignup from './pages/LoginSignup';
import { useContext } from 'react';
import ErrorAlert from './components/ErrorAlert';
import Reports from './pages/Reports';
import ProfilePage from './pages/ProfilePage';
import SettingsPage from './pages/SettingsPage';

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
        <div className="text-xl font-semibold">Loading...</div>
      </div>
    );
  }

  return (
    <div className={`min-h-screen ${theme === 'dark' ? 'dark' : ''}`}>
      {isAuthenticated ? (
        <div className="flex h-screen bg-gray-50 dark:bg-gray-900">
          <Sidebar />
          <div className="flex-1 flex flex-col overflow-hidden">
            <Navbar />
            <main className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-100 dark:bg-gray-800 p-6">
              <Routes>
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="/transactions" element={<Transactions />} />
                <Route path="/goals" element={<Goals />} />
                <Route path="/budgets" element={<Budgets />} />
                <Route path="/income-streams" element={<IncomeStreams />} />
                <Route path="*" element={<Navigate to="/dashboard" />} />
                <Route path="/reports" element={<Reports />} />
                <Route path="/profile" element={<ProfilePage />} />
                <Route path="/settings"
              </Routes>
            </main>
          </div>
        </div>
      ) : (
        <Routes>
          <Route path="/login" element={<LoginSignup />} />
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