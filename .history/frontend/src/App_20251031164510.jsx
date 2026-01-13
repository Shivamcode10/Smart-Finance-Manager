// frontend/src/App.jsx
import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { FinanceProvider, ThemeProvider } from './context/FinanceContext';
import Navbar from './components/Navbar';
import Sidebar from './components/Sidebar';
import Dashboard from './pages/Dashboard';
import Transactions from './pages/Transactions';
import Goals from './pages/Goals';
import Budgets from './components/Budgets';
import IncomeStreams from './pages/Imports/IncomeStreams'; // Corrected import path
import Reports from './pages/Reports';
import Login from './pages/Login'; // Assuming Login.jsx exists
import Register from './pages/Register'; // Assuming Register.jsx exists

function AppContent() {
  const { isAuthenticated, theme } = useContext(FinanceContext);

  useEffect(() => {
    // Apply theme to document
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [theme]);

  if (!isAuthenticated) {
    return (
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="*" element={<Navigate to="/login" />} />
      </Routes>
    );
  }

  return (
    <FinanceProvider>
      <Router>
        <Navbar />
        <Sidebar />
        <main className="flex-1 flex-1 overflow-x-hidden overflow-y-auto bg-gray-50 dark:bg-gray-900 p-4">
          <Routes>
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/transactions" element={<Transactions />} />
            <Route path="/goals" element={<Goals />} />
            <Route path="/budgets" element={<Budgets />} />
            <Route path="/income-streams" element={<IncomeStreams />} />
            <Route path="/reports" element={<Reports />} />
            <Route path="*" element={<Navigate to="/dashboard" />} />
          </Routes>
        </main>
      </Router>
    </FinanceProvider>
  );
}

export default App;