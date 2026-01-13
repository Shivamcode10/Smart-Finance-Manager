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
      <div className={`lg:hidden ${sidebarOpen ? 'block' : 'hidden'}`}>
        <div className="fixed inset-0 flex z-40">
          <div
            className="fixed inset-0 bg-gray-600 bg-opacity-75 transition-opacity"
            onClick={() => setSidebarOpen(false)}
          ></div>
          <div className="relative flex-1 flex flex-col max-w-xs w-full bg-white/90 dark:bg-gray-900/90 backdrop-blur-lg shadow-xl transition-all duration-300">
            <div className="absolute top-0 right-0 -mr-12 pt-2">
              <button
                onClick={() => setSidebarOpen(false)}
                className="ml-1 flex items-center h-10 w-10 rounded-full focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500"
              >
                <FiX className="h-6 w-6 text-white" />
              </button>
            </div>
            <div className="flex-1 h-0 pt-5 pb-4 overflow-y-auto">
              <div className="flex-shrink-0 flex items-center px-4">
                <h1 className="text-lg font-bold text-indigo-600 dark:text-indigo-300 tracking-wide">
                  Smart Finance
                </h1>
              </div>
              <nav className="mt-5 flex-1 px-2 space-y-2">
                {navigation.map((item) => (
                  <NavLink
                    key={item.name}
                    to={item.href}
                    className={({ isActive }) =>
                      `group flex items-center px-3 py-2 text-sm font-medium rounded-md transition-all duration-200 transform hover:translate-x-1 ${
                        isActive
                          ? 'bg-gradient-to-r from-indigo-500 to-indigo-700 text-white shadow-md'
                          : 'text-gray-700 dark:text-gray-300 hover:bg-indigo-100/20 hover:text-indigo-400'
                      }`
                    }
                  >
                    <item.icon className="mr-3 h-5 w-5" aria-hidden="true" />
                    {item.name}
                  </NavLink>
                ))}
              </nav>
            </div>
          </div>
        </div>
      </div>

      {/* Desktop Sidebar */}
      <div className="hidden lg:flex lg:flex-shrink-0">
        <div className="flex flex-col w-64 bg-white/80 dark:bg-gray-900/80 backdrop-blur-md border-r border-gray-200 dark:border-gray-700 shadow-lg">
          <div className="flex items-center px-6 py-5">
            <h1 className="text-lg font-bold text-indigo-600 dark:text-indigo-300 tracking-wide">
              Smart Finance
            </h1>
          </div>
          <nav className="flex-1 px-3 space-y-2">
            {navigation.map((item) => (
              <NavLink
                key={item.name}
                to={item.href}
                className={({ isActive }) =>
                  `group flex items-center px-3 py-2 text-sm font-medium rounded-md transition-all duration-200 transform hover:translate-x-1 ${
                    isActive
                      ? 'bg-gradient-to-r from-indigo-500 to-indigo-700 text-white shadow-md'
                      : 'text-gray-700 dark:text-gray-300 hover:bg-indigo-100/20 hover:text-indigo-400'
                  }`
                }
              >
                <item.icon className="mr-3 h-5 w-5" aria-hidden="true" />
                {item.name}
              </NavLink>
            ))}
          </nav>
        </div>
      </div>

      {/* Mobile Menu Button */}
      <div className="lg:hidden fixed top-4 left-4 z-30">
        <button
          onClick={() => setSidebarOpen(true)}
          className="p-2 rounded-md text-gray-700 dark:text-gray-300 hover:text-indigo-500 hover:bg-gray-100 dark:hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500 transition-all duration-300"
        >
          <FiMenu className="h-6 w-6" />
        </button>
      </div>
    </>
  );
};

export default Sidebar;
