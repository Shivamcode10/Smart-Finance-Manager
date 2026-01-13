// frontend/src/components/Navbar.jsx
import React, { useState, useContext } from 'react';
import { FinanceContext } from '../context/FinanceContext';
import { FiBell, FiUser, FiLogOut, FiSun, FiMoon } from 'react-icons/fi';
import

const Navbar = () => {
  const { user, logout, theme, setTheme, alerts } = useContext(FinanceContext);
  const [showProfile, setShowProfile] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);

  const toggleTheme = () => {
    setTheme(theme === 'light' ? 'dark' : 'light');
  };

  return (
    <header className="bg-white dark:bg-gray-800 shadow-sm border-b border-gray-200 dark:border-gray-700">
      <div className="px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center">
            <h1 className="text-xl font-semibold text-gray-800 dark:text-white">
              Smart Finance Manager
            </h1>
          </div>
          <div className="flex items-center space-x-4">
            {/* Notifications */}
            <div className="relative">
              <button
                onClick={() => setShowNotifications(!showNotifications)}
                className="p-1 rounded-full text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white focus:outline-none"
              >
                <FiBell className="h-6 w-6" />
                {alerts.length > 0 && (
                  <span className="absolute top-0 right-0 block h-2 w-2 rounded-full bg-red-500"></span>
                )}
              </button>
              {showNotifications && (
                <div className="absolute right-0 mt-2 w-80 bg-white dark:bg-gray-800 rounded-md shadow-lg py-1 z-20">
                  <div className="px-4 py-2 border-b border-gray-200 dark:border-gray-700">
                    <h3 className="text-sm font-medium text-gray-900 dark:text-white">
                      Notifications
                    </h3>
                  </div>
                  <div className="max-h-60 overflow-y-auto">
                    {alerts.length > 0 ? (
                      alerts.map((alert, index) => (
                        <div
                          key={index}
                          className={`px-4 py-3 border-b border-gray-100 dark:border-gray-700 ${
                            alert.type === 'danger'
                              ? 'bg-red-50 dark:bg-red-900/20'
                              : 'bg-yellow-50 dark:bg-yellow-900/20'
                          }`}
                        >
                          <p className="text-sm text-gray-800 dark:text-gray-200">
                            {alert.message}
                          </p>
                        </div>
                      ))
                    ) : (
                      <div className="px-4 py-3">
                        <p className="text-sm text-gray-500 dark:text-gray-400">
                          No notifications
                        </p>
                      </div>
                    )}
                  </div>
                </div>
              )}
            </div>

            {/* Theme Toggle */}
            <button
              onClick={toggleTheme}
              className="p-1 rounded-full text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white focus:outline-none"
            >
              {theme === 'light' ? (
                <FiMoon className="h-6 w-6" />
              ) : (
                <FiSun className="h-6 w-6" />
              )}
            </button>

            {/* Profile */}
            <div className="relative">
              <button
                onClick={() => setShowProfile(!showProfile)}
                className="flex items-center text-sm rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                <div className="h-8 w-8 rounded-full bg-indigo-500 flex items-center justify-center text-white font-medium">
                  {user?.name?.charAt(0).toUpperCase()}
                </div>
              </button>
              {showProfile && (
                <div className="absolute right-0 mt-2 w-48 bg-white dark:bg-gray-800 rounded-md shadow-lg py-1 z-20">
                  <div className="px-4 py-2 border-b border-gray-200 dark:border-gray-700">
                    <p className="text-sm font-medium text-gray-900 dark:text-white">
                      {user?.name}
                    </p>
                    <p className="text-xs text-gray-500 dark:text-gray-400 truncate">
                      {user?.email}
                    </p>
                  </div>
                  <button
                    onClick={logout}
                    className="block w-full text-left px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
                  >
                    <div className="flex items-center">
                      <FiLogOut className="mr-2 h-4 w-4" />
                      Sign out
                    </div>
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
