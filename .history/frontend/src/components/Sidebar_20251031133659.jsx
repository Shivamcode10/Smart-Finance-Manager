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
  FiSearch,
  FiSun,
  FiMoon,
  FiBell,
  FiZap,
  FiActivity,
  FiChevronDown,
} from 'react-icons/fi';

const Sidebar = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [searchFocus, setSearchFocus] = useState(false);
  const [darkMode, setDarkMode] = useState(true);
  const [expandedGroup, setExpandedGroup] = useState('main');
  const location = useLocation();

  useEffect(() => {
    setSidebarOpen(false);
  }, [location.pathname]);

  const mainNavigation = [
    { name: 'Dashboard', href: '/dashboard', icon: FiHome, gradient: 'from-cyan-400 to-blue-500' },
    { name: 'Transactions', href: '/transactions', icon: FiDollarSign, gradient: 'from-green-400 to-emerald-500' },
    { name: 'Goals', href: '/goals', icon: FiTarget, gradient: 'from-purple-400 to-pink-500' },
  ];

  const analyticsNavigation = [
    { name: 'Budgets', href: '/budgets', icon: FiPieChart, gradient: 'from-yellow-400 to-orange-500' },
    { name: 'Income', href: '/income-streams', icon: FiTrendingUp, gradient: 'from-indigo-400 to-purple-500' },
    { name: 'Reports', href: '/reports', icon: FiBarChart2, gradient: 'from-red-400 to-pink-500' },
  ];

  return (
    <>
      {/* Mobile sidebar overlay */}
      <div className={`lg:hidden ${sidebarOpen ? 'block' : 'hidden'}`}>
        <div className="fixed inset-0 flex z-50">
          <div
            className="fixed inset-0 bg-black bg-opacity-75 transition-opacity"
            onClick={() => setSidebarOpen(false)}
          ></div>
          <div className="relative flex-1 flex flex-col max-w-xs w-full bg-gray-900 transform transition-transform ease-in-out duration-300">
            {/* ... (Mobile content would mirror the desktop version) ... */}
          </div>
        </div>
      </div>

      {/* Desktop sidebar */}
      <div className="hidden lg:flex lg:flex-shrink-0">
        <div className="flex flex-col w-80">
          <div className="flex-1 flex flex-col h-screen bg-gray-900 text-white relative overflow-hidden">
            {/* Animated Background Orb */}
            <div className="absolute top-0 right-0 w-96 h-96 bg-purple-700 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse"></div>
            <div className="absolute bottom-0 left-0 w-96 h-96 bg-cyan-700 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse animation-delay-2000"></div>

            <div className="relative z-10 flex flex-col h-full">
              {/* Header with Search and Theme Toggle */}
              <div className="p-6 border-b border-gray-800">
                <div className="flex items-center justify-between mb-4">
                  <h1 className="text-2xl font-bold bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
                    FinanceHub
                  </h1>
                  <button
                    onClick={() => setDarkMode(!darkMode)}
                    className="p-2 rounded-full bg-gray-800 hover:bg-gray-700 transition-colors"
                  >
                    {darkMode ? <FiSun className="h-5 w-5 text-yellow-400" /> : <FiMoon className="h-5 w-5 text-gray-400" />}
                  </button>
                </div>
                <div className={`relative flex items-center bg-gray-800 rounded-lg transition-all duration-300 ${searchFocus ? 'ring-2 ring-cyan-500' : ''}`}>
                  <FiSearch className="h-5 w-5 text-gray-400 ml-3" />
                  <input
                    type="text"
                    placeholder="Search anything..."
                    className="w-full py-2 px-3 bg-transparent text-white placeholder-gray-500 focus:outline-none"
                    onFocus={() => setSearchFocus(true)}
                    onBlur={() => setSearchFocus(false)}
                  />
                </div>
              </div>

              {/* Activity Widget */}
              <div className="px-6 py-4">
                <div className="bg-gradient-to-r from-cyan-600 to-blue-600 rounded-xl p-4 shadow-lg">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs font-semibold text-white uppercase tracking-wider">Monthly Activity</span>
                    <FiActivity className="h-4 w-4 text-white animate-pulse" />
                  </div>
                  <div className="text-2xl font-bold text-white mb-1">$4,528</div>
                  <div className="flex items-center text-xs text-cyan-100">
                    <FiZap className="h-3 w-3 mr-1" />
                    <span>12% higher than last month</span>
                  </div>
                </div>
              </div>

              {/* Main Navigation */}
              <div className="flex-1 px-6 py-4 overflow-y-auto">
                <div className="mb-6">
                  <button
                    onClick={() => setExpandedGroup(expandedGroup === 'main' ? '' : 'main')}
                    className="flex items-center justify-between w-full text-xs font-semibold text-gray-400 uppercase tracking-wider hover:text-white transition-colors"
                  >
                    <span>Main</span>
                    <FiChevronDown className={`h-4 w-4 transform transition-transform ${expandedGroup === 'main' ? 'rotate-180' : ''}`} />
                  </button>
                  <nav className={`mt-3 space-y-2 overflow-hidden transition-all duration-500 ${expandedGroup === 'main' ? 'max-h-96' : 'max-h-0'}`}>
                    {mainNavigation.map((item) => {
                      const isActive = location.pathname === item.href;
                      return (
                        <NavLink
                          key={item.name}
                          to={item.href}
                          className={`group relative flex items-center px-4 py-3 text-sm font-medium rounded-lg transition-all duration-300 ease-out ${
                            isActive
                              ? 'text-white shadow-lg transform scale-105'
                              : 'text-gray-400 hover:text-white hover:bg-gray-800 hover:shadow-md hover:transform hover:scale-105'
                          }`}
                        >
                          {/* Animated Background */}
                          {isActive && (
                            <div className={`absolute inset-0 bg-gradient-to-r ${item.gradient} rounded-lg opacity-90`}></div>
                          )}
                          <div className="relative z-10 flex items-center w-full">
                            <div className={`p-2 rounded-lg mr-3 ${isActive ? 'bg-white bg-opacity-20' : 'bg-gray-800 group-hover:bg-gray-700'}`}>
                              <item.icon className="h-5 w-5" aria-hidden="true" />
                            </div>
                            <span className="font-semibold">{item.name}</span>
                          </div>
                        </NavLink>
                      );
                    })}
                  </nav>
                </div>

                <div>
                  <button
                    onClick={() => setExpandedGroup(expandedGroup === 'analytics' ? '' : 'analytics')}
                    className="flex items-center justify-between w-full text-xs font-semibold text-gray-400 uppercase tracking-wider hover:text-white transition-colors"
                  >
                    <span>Analytics</span>
                    <FiChevronDown className={`h-4 w-4 transform transition-transform ${expandedGroup === 'analytics' ? 'rotate-180' : ''}`} />
                  </button>
                  <nav className={`mt-3 space-y-2 overflow-hidden transition-all duration-500 ${expandedGroup === 'analytics' ? 'max-h-96' : 'max-h-0'}`}>
                    {analyticsNavigation.map((item) => {
                      const isActive = location.pathname === item.href;
                      return (
                        <NavLink
                          key={item.name}
                          to={item.href}
                          className={`group relative flex items-center px-4 py-3 text-sm font-medium rounded-lg transition-all duration-300 ease-out ${
                            isActive
                              ? 'text-white shadow-lg transform scale-105'
                              : 'text-gray-400 hover:text-white hover:bg-gray-800 hover:shadow-md hover:transform hover:scale-105'
                          }`}
                        >
                          {isActive && (
                            <div className={`absolute inset-0 bg-gradient-to-r ${item.gradient} rounded-lg opacity-90`}></div>
                          )}
                          <div className="relative z-10 flex items-center w-full">
                            <div className={`p-2 rounded-lg mr-3 ${isActive ? 'bg-white bg-opacity-20' : 'bg-gray-800 group-hover:bg-gray-700'}`}>
                              <item.icon className="h-5 w-5" aria-hidden="true" />
                            </div>
                            <span className="font-semibold">{item.name}</span>
                          </div>
                        </NavLink>
                      );
                    })}
                  </nav>
                </div>
              </div>

              {/* User Profile & Notifications */}
              <div className="p-6 border-t border-gray-800">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center">
                    <div className="h-10 w-10 rounded-full bg-gradient-to-r from-cyan-400 to-blue-500 flex items-center justify-center shadow-lg">
                      <span className="text-white font-bold">JD</span>
                    </div>
                    <div className="ml-3">
                      <p className="text-sm font-medium text-white">John Doe</p>
                      <p className="text-xs font-medium text-gray-400">Premium Plan</p>
                    </div>
                  </div>
                  <div className="relative">
                    <button className="p-2 rounded-full bg-gray-800 hover:bg-gray-700 transition-colors">
                      <FiBell className="h-5 w-5 text-gray-400" />
                    </button>
                    <span className="absolute top-0 right-0 h-3 w-3 bg-red-500 rounded-full animate-ping"></span>
                    <span className="absolute top-0 right-0 h-3 w-3 bg-red-500 rounded-full"></span>
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
          className="p-2 rounded-md text-gray-500 bg-gray-900 shadow-lg hover:text-gray-900 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-cyan-500 transition-all duration-200"
        >
          <FiMenu className="h-6 w-6" />
        </button>
      </div>
    </>
  );
};

export default Sidebar;