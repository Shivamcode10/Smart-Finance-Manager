import React, { useState } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  FiHome,
  FiDollarSign,
  FiTarget,
  FiPieChart,
  FiTrendingUp,
  FiBarChart2,
  FiUser,
  FiSettings,
  FiLogOut,
  FiMenu,
  FiX,
  FiChevronDown,
  FiChevronRight,
} from 'react-icons/fi';

const Sidebar = () => {
  const location = useLocation();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [expandedItems, setExpandedItems] = useState([]);

  const navigation = [
    { 
      name: 'Dashboard', 
      href: '/dashboard', 
      icon: FiHome,
      description: 'Overview of your finances'
    },
    { 
      name: 'Transactions', 
      href: '/transactions', 
      icon: FiDollarSign,
      description: 'View and manage transactions'
    },
    { 
      name: 'Goals', 
      href: '/goals', 
      icon: FiTarget,
      description: 'Track your financial goals'
    },
    { 
      name: 'Budgets', 
      href: '/budgets', 
      icon: FiPieChart,
      description: 'Manage your budgets'
    },
    { 
      name: 'Income Streams', 
      href: '/income-streams', 
      icon: FiTrendingUp,
      description: 'Monitor income sources'
    },
    { 
      name: 'Reports', 
      href: '/reports', 
      icon: FiBarChart2,
      description: 'Financial reports and analytics'
    },
  ];

  const secondaryNavigation = [
    { name: 'Profile', href: '/profile', icon: FiUser },
    { name: 'Settings', href: '/settings', icon: FiSettings },
    { name: 'Logout', href: '/logout', icon: FiLogOut },
  ];

  const toggleExpanded = (name) => {
    setExpandedItems(prev => 
      prev.includes(name) 
        ? prev.filter(item => item !== name)
        : [...prev, name]
    );
  };

  return (
    <>
      {/* Mobile Sidebar */}
      <AnimatePresence>
        {sidebarOpen && (
          <motion.div 
            className="lg:hidden fixed inset-0 flex z-40"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              className="fixed inset-0 bg-gray-900/80 backdrop-blur-sm"
              onClick={() => setSidebarOpen(false)}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            />
            <motion.div
              className="relative flex-1 flex flex-col max-w-xs w-full bg-gray-900/90 backdrop-blur-xl border-r border-white/10"
              initial={{ x: -300 }}
              animate={{ x: 0 }}
              exit={{ x: -300 }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
            >
              <div className="absolute top-0 right-0 -mr-12 pt-2">
                <motion.button
                  onClick={() => setSidebarOpen(false)}
                  className="ml-1 flex items-center h-10 w-10 rounded-full focus:outline-none focus:ring-2 focus:ring-inset focus:ring-cyan-400 text-white"
                  whileHover={{ scale: 1.1, rotate: 90 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <FiX className="h-6 w-6" />
                </motion.button>
              </div>
              <div className="flex-1 h-0 pt-5 pb-4 overflow-y-auto">
                <div className="flex-shrink-0 flex items-center px-4">
                  <h1 className="text-lg font-semibold text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-cyan-400">
                    Smart Finance
                  </h1>
                </div>
                <nav className="mt-5 flex-1 px-2 space-y-1">
                  {navigation.map((item, index) => (
                    <motion.div
                      key={item.name}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.3, delay: index * 0.1 }}
                    >
                      <NavLink
                        to={item.href}
                        className={({ isActive }) =>
                          `group flex items-center px-3 py-2.5 text-sm font-medium rounded-lg transition-all duration-200 ${
                            isActive
                              ? 'bg-gradient-to-r from-indigo-500/20 to-cyan-500/20 border-l-4 border-cyan-400 text-white'
                              : 'text-gray-300 hover:bg-gray-800/50 hover:border-l-4 hover:border-cyan-400/50 hover:text-white'
                          }`
                        }
                      >
                        <item.icon className="mr-3 h-5 w-5 group-hover:scale-110 transition-transform duration-200" />
                        <div className="flex-1">
                          <p>{item.name}</p>
                          <p className="text-xs text-gray-500 group-hover:text-gray-400">{item.description}</p>
                        </div>
                      </NavLink>
                    </motion.div>
                  ))}
                </nav>
              </div>

              {/* Secondary Navigation */}
              <div className="p-4 border-t border-gray-700/50">
                <nav className="space-y-1">
                  {secondaryNavigation.map((item, index) => (
                    <motion.div
                      key={item.name}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.3, delay: index * 0.1 + 0.6 }}
                    >
                      <NavLink
                        to={item.href}
                        className={({ isActive }) =>
                          `group flex items-center px-3 py-2.5 text-sm font-medium rounded-lg transition-all duration-200 ${
                            isActive
                              ? 'bg-gradient-to-r from-indigo-500/20 to-cyan-500/20 border-l-4 border-cyan-400 text-white'
                              : 'text-gray-300 hover:bg-gray-800/50 hover:border-l-4 hover:border-cyan-400/50 hover:text-white'
                          }`
                        }
                      >
                        <item.icon className="mr-3 h-5 w-5 group-hover:scale-110 transition-transform duration-200" />
                        {item.name}
                      </NavLink>
                    </motion.div>
                  ))}
                </nav>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Desktop Sidebar */}
      <div className="hidden lg:flex lg:flex-shrink-0">
        <motion.div 
          className="flex flex-col w-64 transition-all duration-300 ease-in-out"
          initial={{ x: -100 }}
          animate={{ x: 0 }}
          transition={{ type: "spring", damping: 25, stiffness: 200 }}
        >
          <div className="flex-1 flex flex-col border-r border-white/10 bg-gray-900/60 backdrop-blur-xl">
            <div className="flex items-center px-6 py-5">
              <h1 className="text-lg font-semibold text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-cyan-400">
                Smart Finance
              </h1>
            </div>
            <nav className="flex-1 px-4 space-y-1">
              {navigation.map((item, index) => (
                <motion.div
                  key={item.name}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.3, delay: index * 0.1 }}
                >
                  <NavLink
                    to={item.href}
                    className={({ isActive }) =>
                      `group flex items-center px-3 py-2.5 text-sm font-medium rounded-lg transition-all duration-200 ${
                        isActive
                          ? 'bg-gradient-to-r from-indigo-500/20 to-cyan-500/20 border-l-4 border-cyan-400 text-white'
                          : 'text-gray-300 hover:bg-gray-800/50 hover:border-l-4 hover:border-cyan-400/50 hover:text-white'
                      }`
                    }
                  >
                    <item.icon className="mr-3 h-5 w-5 group-hover:scale-110 transition-transform duration-200" />
                    <div className="flex-1">
                      <p>{item.name}</p>
                      <p className="text-xs text-gray-500 group-hover:text-gray-400">{item.description}</p>
                    </div>
                  </NavLink>
                </motion.div>
              ))}
            </nav>

            {/* Secondary Navigation */}
            <div className="p-4 border-t border-gray-700/50">
              <nav className="space-y-1">
                {secondaryNavigation.map((item, index) => (
                  <motion.div
                    key={item.name}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.3, delay: index * 0.1 + 0.6 }}
                  >
                    <NavLink
                      to={item.href}
                      className={({ isActive }) =>
                        `group flex items-center px-3 py-2.5 text-sm font-medium rounded-lg transition-all duration-200 ${
                          isActive
                            ? 'bg-gradient-to-r from-indigo-500/20 to-cyan-500/20 border-l-4 border-cyan-400 text-white'
                            : 'text-gray-300 hover:bg-gray-800/50 hover:border-l-4 hover:border-cyan-400/50 hover:text-white'
                        }`
                      }
                    >
                      <item.icon className="mr-3 h-5 w-5 group-hover:scale-110 transition-transform duration-200" />
                      {item.name}
                    </NavLink>
                  </motion.div>
                ))}
              </nav>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Mobile Menu Button */}
      <div className="lg:hidden fixed top-4 left-4 z-30">
        <motion.button
          onClick={() => setSidebarOpen(true)}
          className="p-2 rounded-md text-gray-300 hover:text-white hover:bg-gray-800/50 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-cyan-400"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
        >
          <FiMenu className="h-6 w-6" />
        </motion.button>
      </div>
    </>
  );
};

export default Sidebar;