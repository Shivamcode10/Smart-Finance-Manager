// frontend/src/components/Sidebar.jsx
import React, { useState, useEffect } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import {
  FiHome,
  FiDollarSign,
  FiTarget,
  FiPieChart,
  FiTrendingUp,
  FiBarChart2,
  FiMenu,
  FiX,
  FiChevronLeft,
  FiChevronRight,
  FiLogOut,
  FiUser,
  FiSettings,
} from 'react-icons/fi';

const Sidebar = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [isCollapsed, setIsCollapsed] = useState(false);
  const location = useLocation();

  // Close mobile sidebar when route changes
  useEffect(() => {
    setSidebarOpen(false);
  }, [location.pathname]);

  const navigation = [
    { name: 'Dashboard', href: '/dashboard', icon: FiHome, color: 'text-blue-500' },
    { name: 'Transactions', href: '/transactions', icon: FiDollarSign, color: 'text-green-500' },
    { name: 'Goals', href: '/goals', icon: FiTarget, color: 'text-purple-500' },
    { name: 'Budgets', href: '/budgets', icon: FiPieChart, color: 'text-yellow-500' },
    { name: 'Income Streams', href: '/income-streams', icon: FiTrendingUp, color: 'text-indigo-500' },
    { name: 'Reports', href: '/reports', icon: FiBarChart2, color: 'text-red-500' },
  ];

  const userNavigation = [
    { name: 'Profile', href: '/profile', icon: FiUser },
    { name: 'Settings', href: '/settings', icon: FiSettings },
    { name: 'Logout', href: '/logout', icon: FiLogOut },
  ];

  return (
    <>
      {/* Mobile sidebar overlay */}
      <div className={`lg:hidden ${sidebarOpen ? 'block' : 'hidden'}`}>
        <div className="fixed inset-0 flex z-50">
          <div
            className="fixed inset-0 bg-black bg-opacity-50 transition-opacity"
            onClick={() => setSidebarOpen(false)}
          ></div>
          <div className="relative flex-1 flex flex-col max-w-xs w-full bg-gradient-to-b from-gray-900 to-gray-800 transform transition-transform ease-in-out duration-300">
            <div className="absolute top-0 right-0 -mr-12 pt-2">
              <button
                className="ml-1 flex items-center justify-center h-10 w-10 rounded-full focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
                onClick={() => setSidebarOpen(false)}
              >
                <FiX className="h-6 w-6 text-white" />
              </button>
            </div>
            <div className="flex-1 h-0 pt-5 pb-4 overflow-y-auto">
              <div className="flex-shrink-0 flex items-center px-4">
                <h1 className="text-xl font-bold text-white">Smart Finance</h1>
              </div>
              <nav className="mt-8 px-3 space-y-1">
                {navigation.map((item) => (
                  <NavLink
                    key={item.name}
                    to={item.href}
                    className={({ isActive }) =>
                      `group flex items-center px-3 py-2.5 text-sm font-medium rounded-lg transition-all duration-200 ease-in-out ${
                        isActive
                          ? 'bg-white bg-opacity-20 text-white shadow-lg'
                          : 'text-gray-300 hover:bg-white hover:bg-opacity-10 hover:text-white'
                      }`
                    }
                  >
                    <item.icon className={`mr-3 h-5 w-5 ${item.color}`} aria-hidden="true" />
                    {item.name}
                  </NavLink>
                ))}
              </nav>
            </div>
            {/* User Profile Section in Mobile */}
            <div className="flex-shrink-0 flex border-t border-gray-700 p-4">
              <div className="flex-shrink-0 w-full group block">
                <div className="flex items-center">
                  <div className="ml-3">
                    <p className="text-sm font-medium text-white">John Doe</p>
                    <p className="text-xs font-medium text-gray-400 group-hover:text-gray-300">View profile</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Desktop sidebar */}
      <div className={`hidden lg:flex lg:flex-shrink-0 transition-all duration-300 ease-in-out ${isCollapsed ? 'lg:w-20' : 'lg:w-64'}`}>
        <div className="flex flex-col w-full">
          <div className="flex flex-col h-0 flex-1 bg-gradient-to-b from-gray-900 to-gray-800 border-r border-gray-700">
            <div className="flex-1 flex flex-col pt-5 pb-4 overflow-y-auto">
              {/* Logo and Toggle Button */}
              <div className="flex items-center justify-between flex-shrink-0 px-4">
                <h1 className={`text-xl font-bold text-white transition-opacity duration-300 ${isCollapsed ? 'opacity-0 w-0' : 'opacity-100'}`}>
                  Smart Finance
                </h1>
                <button
                  onClick={() => setIsCollapsed(!isCollapsed)}
                  className="p-1.5 rounded-lg text-gray-400 hover:text-white hover:bg-white hover:bg-opacity-10 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white transition-all duration-200"
                >
                  {isCollapsed ? <FiChevronRight className="h-5 w-5" /> : <FiChevronLeft className="h-5 w-5" />}
                </button>
              </div>

              {/* Navigation Items */}
              <nav className={`mt-8 flex-1 px-2 space-y-1 ${isCollapsed ? 'px-2' : 'px-3'}`}>
                {navigation.map((item) => {
                  const isActive = location.pathname === item.href;
                  return (
                    <NavLink
                      key={item.name}
                      to={item.href}
                      className={`group relative flex items-center px-3 py-2.5 text-sm font-medium rounded-lg transition-all duration-200 ease-in-out ${
                        isActive
                          ? 'bg-white bg-opacity-20 text-white shadow-lg'
                          : 'text-gray-300 hover:bg-white hover:bg-opacity-10 hover:text-white'
                      }`}
                      title={isCollapsed ? item.name : ''}
                    >
                      {/* Active Indicator */}
                      {isActive && (
                        <span className="absolute left-0 top-0 h-full w-1 bg-white rounded-r-lg"></span>
                      )}
                      <item.icon className={`flex-shrink-0 h-5 w-5 ${item.color}`} aria-hidden="true" />
                      <span className={`ml-3 transition-opacity duration-300 ${isCollapsed ? 'opacity-0 w-0' : 'opacity-100'}`}>
                        {item.name}
                      </span>
                    </NavLink>
                  );
                })}
              </nav>
            </div>

            {/* User Profile Section in Desktop */}
            <div className="flex-shrink-0 flex border-t border-gray-700 p-4">
              <div className="flex-shrink-0 w-full group block">
                <div className="flex items-center">
                  <div className="flex-shrink-0">
                    <div className="h-8 w-8 rounded-full bg-indigo-500 flex items-center justify-center">
                      <FiUser className="h-5 w-5 text-white" />
                    </div>
                  </div>
                  <div className={`ml-3 transition-opacity duration-300 ${isCollapsed ? 'opacity-0 w-0' : 'opacity-100'}`}>
                    <p className="text-sm font-medium text-white">John Doe</p>
                    <p className="text-xs font-medium text-gray-400 group-hover:text-gray-300">View profile</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile menu button */}
      <div className="lg:hidden fixed top-4 left-4 z-40">
        <button
          onClick={() => setSidebarOpen(true)}
          className="p-2 rounded-md text-gray-500 bg-white dark:bg-gray-800 shadow-lg hover:text-gray-900 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500 transition-all duration-200"
        >
          <FiMenu className="h-6 w-6" />
        </button>
      </div>
    </>
  );
};

export default Sidebar;