// frontend/src/components/Sidebar.jsx
import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import {
  FiHome,
  FiDollarSign,
  FiTarget,
  FiPieChart,
  FiTrendingUp,
  FiBarChart2,
  FiMenu,
  FiX,
} from 'react-icons/fi';
import { motion, AnimatePresence } from 'framer-motion';
import './Sidebar.css';

const Sidebar = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const navigation = [
    { name: 'Dashboard', href: '/dashboard', icon: FiHome },
    { name: 'Transactions', href: '/transactions', icon: FiDollarSign },
    { name: 'Goals', href: '/goals', icon: FiTarget },
    { name: 'Budgets', href: '/budgets', icon: FiPieChart },
    { name: 'Income Streams', href: '/income-streams', icon: FiTrendingUp },
    { name: 'Reports', href: '/reports', icon: FiBarChart2 },
  ];

  return (
    <>
      {/* Mobile Sidebar */}
      <AnimatePresence>
        {sidebarOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-40 lg:hidden"
          >
            <div className="absolute inset-0 bg-black/50" onClick={() => setSidebarOpen(false)} />
            <motion.aside
              initial={{ x: '-100%' }}
              animate={{ x: 0 }}
              exit={{ x: '-100%' }}
              transition={{ type: 'spring', stiffness: 140, damping: 18 }}
              className="relative flex flex-col w-72 h-full bg-white/90 dark:bg-gray-900/85 backdrop-blur-xl border-r border-gray-200 dark:border-gray-700 shadow-2xl"
            >
              <div className="px-6 py-5 flex items-center justify-between">
                <h1 className="text-xl font-bold text-indigo-600 dark:text-indigo-300">Smart Finance</h1>
                <button onClick={() => setSidebarOpen(false)} className="p-2 rounded-md hover:bg-gray-100 dark:hover:bg-gray-800 transition">
                  <FiX className="h-6 w-6" />
                </button>
              </div>

              <nav className="px-3 py-4 space-y-1 flex-1 overflow-y-auto">
                {navigation.map((item) => (
                  <NavLink
                    key={item.name}
                    to={item.href}
                    onClick={() => setSidebarOpen(false)}
                    className={({ isActive }) =>
                      `group flex items-center px-3 py-2 rounded-lg text-sm font-medium transition-transform duration-200 transform ${
                        isActive
                          ? 'bg-gradient-to-r from-indigo-500 to-indigo-700 text-white shadow-xl scale-102'
                          : 'text-gray-700 dark:text-gray-300 hover:bg-indigo-50 dark:hover:bg-gray-800/60 hover:text-indigo-600'
                      }`
                    }
                  >
                    <item.icon className="mr-3 h-5 w-5" />
                    {item.name}
                  </NavLink>
                ))}
              </nav>
            </motion.aside>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Desktop Sidebar */}
      <aside className="hidden lg:flex lg:flex-col lg:w-64">
        <div className="flex flex-col w-64 h-full bg-white/80 dark:bg-gray-900/80 backdrop-blur-md border-r border-gray-200 dark:border-gray-700 shadow-lg">
          <div className="flex items-center px-6 py-5">
            <h1 className="text-lg font-bold text-indigo-600 dark:text-indigo-300 tracking-wide">Smart Finance</h1>
          </div>

          <nav className="flex-1 px-4 space-y-2">
            {navigation.map((item) => (
              <NavLink
                key={item.name}
                to={item.href}
                className={({ isActive }) =>
                  `group flex items-center px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200 transform ${
                    isActive
                      ? 'bg-gradient-to-r from-indigo-500 to-indigo-700 text-white shadow-md -translate-x-0'
                      : 'text-gray-700 dark:text-gray-300 hover:bg-indigo-50 dark:hover:bg-gray-800/60 hover:text-indigo-600 hover:-translate-x-1'
                  }`
                }
              >
                <item.icon className="mr-3 h-5 w-5" />
                {item.name}
              </NavLink>
            ))}
          </nav>
        </div>
      </aside>

      {/* Mobile menu button */}
      <div className="lg:hidden fixed top-4 left-4 z-30">
        <button
          onClick={() => setSidebarOpen(true)}
          className="p-2 rounded-md text-gray-700 dark:text-gray-300 hover:text-indigo-500 hover:bg-gray-100 dark:hover:bg-gray-800 focus:outline-none shadow-md transition"
        >
          <FiMenu className="h-6 w-6" />
        </button>
      </div>
    </>
  );
};

export default Sidebar;