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
  FiPlus,
  FiLogOut,
  FiUser,
  FiSettings,
  FiBell,
} from 'react-icons/fi';

const Sidebar = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    setSidebarOpen(false);
  }, [location.pathname]);

  const navigation = [
    { name: 'Dashboard', href: '/dashboard', icon: FiHome, desc: 'Main overview' },
    { name: 'Transactions', href: '/transactions', icon: FiDollarSign, desc: 'View all' },
    { name: 'Goals', href: '/goals', icon: FiTarget, desc: 'Track progress' },
    { name: 'Budgets', href: '/budgets', icon: FiPieChart, desc: 'Manage limits' },
    { name: 'Income', href: '/income-streams', icon: FiTrendingUp, desc: 'All streams' },
    { name: 'Reports', href: '/reports', icon: FiBarChart2, desc: 'Analytics' },
  ];

  const quickActions = [
    { name: 'Add Transaction', icon: FiPlus, color: 'bg-teal-500' },
    { name: 'Notifications', icon: FiBell, color: 'bg-yellow-500' },
  ];

  return (
    <>
      {/* Mobile sidebar overlay */}
      <div className={`lg:hidden ${sidebarOpen ? 'block' : 'hidden'}`}>
        <div className="fixed inset-0 flex z-50">
          <div
            className="fixed inset-0 bg-gray-600 bg-opacity-75 transition-opacity"
            onClick={() => setSidebarOpen(false)}
          ></div>
          <div className="relative flex-1 flex flex-col max-w-xs w-full bg-white transform transition-transform ease-in-out duration-300">
            <div className="absolute top-0 right-0 -mr-12 pt-2">
              <button
                className="ml-1 flex items-center justify-center h-10 w-10 rounded-full focus:outline-none focus:ring-2 focus:ring-inset focus:ring-teal-500"
                onClick={() => setSidebarOpen(false)}
              >
                <FiX className="h-6 w-6 text-white" />
              </button>
            </div>
            <div className="flex-1 h-0 pt-5 pb-4 overflow-y-auto">
              <div className="flex-shrink-0 flex items-center px-6">
                <h1 className="text-2xl font-bold text-gray-900">Smart Finance</h1>
              </div>
              <nav className="mt-8 px-4 space-y-2">
                {navigation.map((item) => (
                  <NavLink
                    key={item.name}
                    to={item.href}
                    className={({ isActive }) =>
                      `group flex items-center px-4 py-3 text-sm font-medium rounded-xl transition-all duration-200 ${
                        isActive
                          ? 'bg-teal-50 text-teal-700 border-l-4 border-teal-500'
                          : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                      }`
                    }
                  >
                    <item.icon className="mr-3 h-5 w-5 flex-shrink-0" aria-hidden="true" />
                    <div>
                      <p>{item.name}</p>
                      <p className="text-xs text-gray-400">{item.desc}</p>
                    </div>
                  </NavLink>
                ))}
              </nav>
            </div>
          </div>
        </div>
      </div>

      {/* Desktop sidebar */}
      <div className="hidden lg:flex lg:flex-shrink-0">
        <div className="flex flex-col w-72">
          <div className="flex-1 flex flex-col pt-5 pb-4 overflow-y-auto bg-white border-r border-gray-200">
            {/* Header */}
            <div className="flex items-center justify-between flex-shrink-0 px-6 mb-6">
              <h1 className="text-2xl font-bold text-gray-900">Smart Finance</h1>
            </div>

            {/* Quick Actions */}
            <div className="px-6 mb-6">
              <h3 className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-3">Quick Actions</h3>
              <div className="grid grid-cols-2 gap-3">
                {quickActions.map((action) => (
                  <button
                    key={action.name}
                    className={`flex flex-col items-center justify-center p-3 rounded-xl text-white ${action.color} hover:opacity-90 transition-opacity shadow-md`}
                  >
                    <action.icon className="h-5 w-5 mb-1" />
                    <span className="text-xs font-medium">{action.name.split(' ')[0]}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Main Navigation */}
            <div className="px-6 flex-1">
              <h3 className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-3">Main Menu</h3>
              <nav className="space-y-2">
                {navigation.map((item) => {
                  const isActive = location.pathname === item.href;
                  return (
                    <NavLink
                      key={item.name}
                      to={item.href}
                      className={`group flex items-center px-4 py-3 text-sm font-medium rounded-xl transition-all duration-200 ease-out ${
                        isActive
                          ? 'bg-teal-50 text-teal-700 shadow-sm border-l-4 border-teal-500'
                          : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900 hover:shadow-sm hover:scale-[1.02]'
                      }`}
                    >
                      <div className={`p-2 rounded-lg mr-3 ${isActive ? 'bg-teal-100' : 'bg-gray-100 group-hover:bg-gray-200'}`}>
                        <item.icon className={`h-5 w-5 ${isActive ? 'text-teal-600' : 'text-gray-500 group-hover:text-gray-700'}`} aria-hidden="true" />
                      </div>
                      <div className="flex-1">
                        <p className="font-semibold">{item.name}</p>
                        <p className="text-xs text-gray-400">{item.desc}</p>
                      </div>
                    </NavLink>
                  );
                })}
              </nav>
            </div>

            {/* User Profile Section */}
            <div className="flex-shrink-0 flex border-t border-gray-200 p-6 mt-6">
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <div className="h-10 w-10 rounded-full bg-gradient-to-r from-teal-400 to-cyan-500 flex items-center justify-center shadow-lg">
                    <FiUser className="h-6 w-6 text-white" />
                  </div>
                </div>
                <div className="ml-3 flex-1">
                  <p className="text-sm font-medium text-gray-900">John Doe</p>
                  <p className="text-xs font-medium text-gray-500">john.doe@example.com</p>
                </div>
                <button className="p-1 rounded-full text-gray-400 hover:text-gray-600 hover:bg-gray-100">
                  <FiSettings className="h-5 w-5" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile menu button */}
      <div className="lg:hidden fixed top-4 left-4 z-40">
        <button
          onClick={() => setSidebarOpen(true)}
          className="p-2 rounded-md text-gray-500 bg-white shadow-lg hover:text-gray-900 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-teal-500 transition-all duration-200"
        >
          <FiMenu className="h-6 w-6" />
        </button>
      </div>
    </>
  );
};

export default Sidebar;