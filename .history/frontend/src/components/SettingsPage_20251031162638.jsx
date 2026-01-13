// frontend/src/components/SettingsPage.jsx
import React, { useState, useContext, useEffect } from 'react';
import { FinanceContext } from '../context/FinanceContext';
import { FiBell, FiMoon, FiSun, FiGlobe, FiLock, FiUser, FiMail, FiShield, FiHelpCircle } from 'react-icons/fi';
import { toast } from 'react-toastify';

const SettingsPage = () => {
  const { user, updateUser, logout } = useContext(FinanceContext);
  const [darkMode, setDarkMode] = useState(
    localStorage.getItem('darkMode') === 'true'
  );
  const [notifications, setNotifications] = useState(true);
  const [emailNotifications, setEmailNotifications] = useState(
    localStorage.getItem('emailNotifications') === 'true'
  );
  const [twoFactorAuth, setTwoFactorAuth] = useState(
    localStorage.getItem('twoFactorAuth') === 'true'
  );

  useEffect(() => {
    localStorage.setItem('darkMode', darkMode);
  }, [darkMode]);

  const toggleDarkMode = () => {
    const newMode = !darkMode;
    setDarkMode(newMode);
    localStorage.setItem('darkMode', newMode);
    toast.success(`Switched to ${newMode ? 'dark' : 'light'} mode`);
  };

  const toggleNotifications = () => {
    const newValue = !notifications;
    setNotifications(newValue);
    localStorage.setItem('notifications', newValue);
    toast.success(`Notifications ${newValue ? 'enabled' : 'disabled'}`);
  };

  const toggleEmailNotifications = () => {
    const newValue = !emailNotifications;
    setEmailNotifications(newValue);
    localStorage.setItem('emailNotifications', newValue);
    toast.success(`Email notifications ${newValue ? 'enabled' : 'disabled'}`);
  };

  const toggleTwoFactorAuth = () => {
    const newValue = !twoFactorAuth;
    setTwoFactorAuth(newValue);
    localStorage.setItem('twoFactorAuth', newValue);
    toast.success(`Two-factor authentication ${newValue ? 'enabled' : 'disabled'}`);
  };

  const handleLogout = () => {
    logout();
    toast.success('Logged out successfully');
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white p-4 md:p-8">
      <div className="max-w-4xl mx-auto">
        <div className="bg-gray-800 rounded-xl shadow-xl overflow-hidden">
          <div className="bg-gradient-to-r from-indigo-600 to-purple-600 p-6">
            <h1 className="text-2xl font-bold text-white">Settings</h1>
          </div>

          <div className="p-6 space-y-6">
            {/* Appearance */}
            <div className="bg-gray-700 rounded-lg p-4">
              <h3 className="text-lg font-medium text-white mb-4">Appearance</h3>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium text-gray-300">Dark Mode</span>
                  <button
                    onClick={toggleDarkMode}
                    className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none ${
                      darkMode
                        ? 'bg-indigo-600'
                        : 'bg-gray-600'
                    }`}
                  >
                    {darkMode ? <FiMoon className="h-5 w-5 text-white" /> : <FiSun className="h-5 w-5 text-white" />}
                  </button>
                </div>
              </div>
            </div>

            {/* Notifications */}
            <div className="bg-gray-700 rounded-lg p-4">
              <h3 className="text-lg font-medium text-white mb-4">Notifications</h3>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium text-gray-300">Push Notifications</span>
                  <button
                    onClick={toggleNotifications}
                    className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none ${
                      notifications
                        ? 'bg-indigo-600'
                        : 'bg-gray-600'
                    }`}
                  >
                    <FiBell className="h-5 w-5 text-white" />
                  </button>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium text-gray-300">Email Notifications</span>
                  <button
                    onClick={toggleEmailNotifications}
                    className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none ${
                      emailNotifications
                        ? 'bg-indigo-600'
                        : 'bg-gray-600'
                    }`}
                  >
                    <FiMail className="h-5 w-5 text-white" />
                  </button>
                </div>
              </div>
            </div>

            {/* Security */}
            <div className="bg-gray-700 rounded-lg p-4">
              <h3 className="text-lg font-medium text-white mb-4">Security</h3>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium text-gray-300">Two-Factor Auth</span>
                  <button
                    onClick={toggleTwoFactorAuth}
                    className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none ${
                      twoFactorAuth
                        ? 'bg-indigo-600'
                        : 'bg-gray-600'
                    }`}
                  >
                    <FiShield className="h-5 w-5 text-white" />
                  </button>
                </div>
              </div>
            </div>

            {/* Account Management */}
            <div className="bg-gray-700 rounded-lg p-4">
              <h3 className="text-lg font-medium text-white mb-4">Account</h3>
              <div className="space-y-4">
                <button
                  onClick={handleLogout}
                  className="w-full px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 flex items-center justify-center"
                >
                  <FiLogOut className="h-5 w-5 mr-2" />
                  Logout
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SettingsPage;