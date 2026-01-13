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
            className="mobile-sidebar-overlay"
          >
            <div className="mobile-sidebar-overlay-bg" onClick={() => setSidebarOpen(false)} />
            <motion.aside
              initial={{ x: '-100%' }}
              animate={{ x: 0 }}
              exit={{ x: '-100%' }}
              transition={{ type: 'spring', stiffness: 140, damping: 18 }}
              className="mobile-sidebar"
            >
              <div className="mobile-sidebar-header">
                <h1 className="mobile-sidebar-title">Smart Finance</h1>
                <button onClick={() => setSidebarOpen(false)} className="mobile-sidebar-close">
                  <FiX className="mobile-sidebar-close-icon" />
                </button>
              </div>

              <nav className="mobile-sidebar-nav">
                {navigation.map((item) => (
                  <NavLink
                    key={item.name}
                    to={item.href}
                    onClick={() => setSidebarOpen(false)}
                    className={({ isActive }) =>
                      `nav-item ${isActive ? 'active' : ''}`
                    }
                  >
                    <item.icon className="nav-item-icon" />
                    {item.name}
                  </NavLink>
                ))}
              </nav>
            </motion.aside>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Desktop Sidebar */}
      <aside className="desktop-sidebar">
        <div className="desktop-sidebar-container">
          <div className="desktop-sidebar-header">
            <h1 className="desktop-sidebar-title">Smart Finance</h1>
          </div>

          <nav className="desktop-sidebar-nav">
            {navigation.map((item) => (
              <NavLink
                key={item.name}
                to={item.href}
                className={({ isActive }) =>
                  `nav-item ${isActive ? 'active' : ''}`
                }
              >
                <item.icon className="nav-item-icon" />
                {item.name}
              </NavLink>
            ))}
          </nav>
        </div>
      </aside>

      {/* Mobile menu button */}
      <div className="mobile-menu-button">
        <button
          onClick={() => setSidebarOpen(true)}
          className="mobile-menu-button"
        >
          <FiMenu className="mobile-menu-icon" />
        </button>
      </div>
    </>
  );
};

export default Sidebar;