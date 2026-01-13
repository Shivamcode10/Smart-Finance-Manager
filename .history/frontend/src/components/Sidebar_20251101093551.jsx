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
      {/* 🌙 Mobile Sidebar */}
      <AnimatePresence>
        {sidebarOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-40 lg:hidden"
          >
            <div
              className="absolute inset-0 bg-black/50 backdrop-blur-sm"
              onClick={() => setSidebarOpen(false)}
            />
            <motion.aside
              initial={{ x: '-100%' }}
              animate={{ x: 0 }}
              exit={{ x: '-100%' }}
              transition={{ type: 'spring', stiffness: 140, damping: 18 }}
              className="relative flex flex-col w-72 h-full bg-gradient-to-b from-indigo-600/90 via-indigo-700/80 to-indigo-900/70 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 backdrop-blur-2xl border-r border-indigo-400/30 shadow-2xl"
            >
              <div className="px-6 py-5 flex items-center justify-between border-b border-indigo-300/20">
                <h1 className="text-2xl font-bold text-white tracking-wide">
                  Smart Finance
                </h1>
                <button
                  onClick={() => setSidebarOpen(false)}
                  className="p-2 rounded-md text-gray-100 hover:bg-white/10 transition"
                >
                  <FiX className="h-6 w-6" />
                </button>
              </div>

              <nav className="px-4 py-6 space-y-2 flex-1 overflow-y-auto">
                {navigation.map((item) => (
                  <NavLink
                    key={item.name}
                    to={item.href}
                    onClick={() => setSidebarOpen(false)}
                    className={({ isActive }) =>
                      `group flex items-center px-4 py-3 rounded-xl text-sm font-medium tracking-wide transition-all duration-300 ${
                        isActive
                          ? 'bg-white/20 text-white shadow-lg scale-[1.03]'
                          : 'text-gray-100 hover:bg-white/10 hover:text-indigo-100 hover:translate-x-1'
                      }`
                    }
                  >
                    <item.icon className="mr-3 h-5 w-5 opacity-80 group-hover:opacity-100" />
                    {item.name}
                  </NavLink>
                ))}
              </nav>
            </motion.aside>
          </motion.div>
        )}
      </AnimatePresence>

      {/* 💻 Desktop Sidebar */}
      <aside className="hidden lg:flex lg:flex-col lg:w-64">
        <div className="flex flex-col w-64 h-screen bg-gradient-to-b from-indigo-600/90 via-indigo-700/80 to-indigo-900/70 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 backdrop-blur-2xl border-r border-indigo-400/30 shadow-2xl">
          <div className="flex items-center justify-center px-6 py-6 border-b border-indigo-300/20">
            <h1 className="text-2xl font-extrabold text-white tracking-wide">
              Smart Finance
            </h1>
          </div>

          <nav className="flex-1 px-5 py-6 space-y-2 overflow-y-auto">
            {navigation.map((item) => (
              <NavLink
                key={item.name}
                to={item.href}
                className={({ isActive }) =>
                  `group flex items-center px-4 py-3 rounded-xl text-sm font-medium transition-all duration-300 ${
                    isActive
                      ? 'bg-white/25 text-white shadow-lg scale-[1.03]'
                      : 'text-gray-100 hover:bg-white/10 hover:text-indigo-100 hover:translate-x-1'
                  }`
                }
              >
                <item.icon className="mr-3 h-5 w-5 opacity-80 group-hover:opacity-100" />
                {item.name}
              </NavLink>
            ))}
          </nav>
        </div>
      </aside>

      {/* 📱 Mobile Toggle Button */}
      <div className="lg:hidden fixed top-4 left-4 z-30">
        <button
          onClick={() => setSidebarOpen(true)}
          className="p-3 rounded-full bg-indigo-600 text-white shadow-lg hover:bg-indigo-500 active:scale-95 transition"
        >
          <FiMenu className="h-6 w-6" />
        </button>
      </div>
    </>
  );
};

export default Sidebar;
