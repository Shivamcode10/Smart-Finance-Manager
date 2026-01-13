import React, { useState, useContext } from 'react';
import { FinanceContext } from '../context/FinanceContext';
import { motion, AnimatePresence } from 'framer-motion';
import { FiBell, FiUser, FiLogOut, FiSun, FiMoon, FiSearch, FiSettings } from 'react-icons/fi';

const Navbar = () => {
  const { user, logout, theme, setTheme, alerts } = useContext(FinanceContext);
  const [showProfile, setShowProfile] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const toggleTheme = () => {
    setTheme(theme === 'light' ? 'dark' : 'light');
  };

  return (
    <motion.header 
      className="bg-gray-900/70 backdrop-blur-xl border-b border-white/10 sticky top-0 z-50"
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center">
            <h1 className="text-xl font-semibold text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-cyan-400 animate-gradientShift">
              Smart Finance Manager
            </h1>
          </div>
          
          <div className="flex items-center space-x-4">
            {/* Search Bar */}
            <div className="hidden md:block">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search transactions..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="bg-gray-800/50 backdrop-blur-md border border-gray-700/50 rounded-full px-4 py-2 pl-10 w-64 focus:border-cyan-400 focus:outline-none focus:ring-2 focus:ring-cyan-400/20 text-white placeholder-gray-400"
                />
                <FiSearch className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
              </div>
            </div>

            {/* Notifications */}
            <div className="relative">
              <motion.button
                onClick={() => setShowNotifications(!showNotifications)}
                className="p-2 rounded-full text-gray-300 hover:text-cyan-400 hover:bg-gray-800/50 transition-colors duration-200 relative group"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
              >
                <FiBell className="h-5 w-5" />
                {alerts.length > 0 && (
                  <motion.span 
                    className="absolute top-0 right-0 h-3 w-3 bg-red-500 rounded-full"
                    animate={{ scale: [1, 1.2, 1] }}
                    transition={{ duration: 2, repeat: Infinity }}
                  ></motion.span>
                )}
              </motion.button>
              
              <AnimatePresence>
                {showNotifications && (
                  <motion.div
                    className="absolute right-0 mt-2 w-80 bg-gray-800/90 backdrop-blur-xl rounded-xl shadow-xl border border-gray-700/50 py-2 z-20"
                    initial={{ opacity: 0, y: -10, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: -10, scale: 0.95 }}
                    transition={{ duration: 0.2 }}
                  >
                    <div className="px-4 py-2 border-b border-gray-700/50">
                      <h3 className="text-sm font-medium text-white">Notifications</h3>
                    </div>
                    <div className="max-h-60 overflow-y-auto">
                      {alerts.length > 0 ? (
                        alerts.map((alert, index) => (
                          <motion.div
                            key={index}
                            className={`px-4 py-3 border-b border-gray-700/30 ${
                              alert.type === 'danger'
                                ? 'bg-red-500/10'
                                : 'bg-yellow-500/10'
                            }`}
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.2, delay: index * 0.05 }}
                          >
                            <p className="text-sm text-gray-200">{alert.message}</p>
                          </motion.div>
                        ))
                      ) : (
                        <div className="px-4 py-3">
                          <p className="text-sm text-gray-400">No notifications</p>
                        </div>
                      )}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Theme Toggle */}
            <motion.button
              onClick={toggleTheme}
              className="p-2 rounded-full text-gray-300 hover:text-cyan-400 hover:bg-gray-800/50 transition-colors duration-200"
              whileHover={{ scale: 1.1, rotate: 15 }}
              whileTap={{ scale: 0.95 }}
            >
              {theme === 'light' ? (
                <FiMoon className="h-5 w-5" />
              ) : (
                <FiSun className="h-5 w-5" />
              )}
            </motion.button>

            {/* Profile */}
            <div className="relative">
              <motion.button
                onClick={() => setShowProfile(!showProfile)}
                className="flex items-center text-sm rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-cyan-400"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <div className="h-8 w-8 rounded-full bg-gradient-to-r from-indigo-500 to-cyan-500 flex items-center justify-center text-white font-medium">
                  {user?.name?.charAt(0).toUpperCase()}
                </div>
              </motion.button>
              
              <AnimatePresence>
                {showProfile && (
                  <motion.div
                    className="absolute right-0 mt-2 w-48 bg-gray-800/90 backdrop-blur-xl rounded-xl shadow-xl border border-gray-700/50 py-2 z-20"
                    initial={{ opacity: 0, y: -10, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: -10, scale: 0.95 }}
                    transition={{ duration: 0.2 }}
                  >
                    <div className="px-4 py-2 border-b border-gray-700/50">
                      <p className="text-sm font-medium text-white">{user?.name}</p>
                      <p className="text-xs text-gray-400 truncate">{user?.email}</p>
                    </div>
                    <motion.button
                      onClick={logout}
                      className="block w-full text-left px-4 py-2 text-sm text-gray-300 hover:bg-gray-700/50 transition-colors duration-200"
                      whileHover={{ x: 5 }}
                    >
                      <div className="flex items-center">
                        <FiLogOut className="mr-2 h-4 w-4" />
                        Sign out
                      </div>
                    </motion.button>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </div>
      </div>
    </motion.header>
  );
};

export default Navbar;