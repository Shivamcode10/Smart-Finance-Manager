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

// Import the CSS file
import './/index.css';

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
            className="sidebar-mobile-container"
          >
            <div className="sidebar-mobile-overlay" onClick={() => setSidebarOpen(false)} />
            <motion.aside
              initial={{ x: '-100%' }}
              animate={{ x: 0 }}
              exit={{ x: '-100%' }}
              transition={{ type: 'spring', stiffness: 140, damping: 18 }}
              className="sidebar-mobile-panel"
            >
              <div className="sidebar-header">
                <h1 className="sidebar-title">Smart Finance</h1>
                <button onClick={() => setSidebarOpen(false)} className="sidebar-close-btn">
                  <FiX />
                </button>
              </div>

              <nav className="sidebar-nav">
                {navigation.map((item) => (
                  <NavLink
                    key={item.name}
                    to={item.href}
                    onClick={() => setSidebarOpen(false)}
                    className={({ isActive }) =>
                      `nav-link ${isActive ? 'active-mobile' : ''}`
                    }
                  >
                    <item.icon className="nav-link-icon" />
                    {item.name}
                  </NavLink>
                ))}
              </nav>
            </motion.aside>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Desktop Sidebar */}
      <aside className="sidebar-desktop">
        <div className="sidebar-desktop-panel">
          <div className="sidebar-header">
            <h1 className="sidebar-title">Smart Finance</h1>
          </div>

          <nav className="sidebar-nav">
            {navigation.map((item) => (
              <NavLink
                key={item.name}
                to={item.href}
                className={({ isActive }) =>
                  `nav-link ${isActive ? 'active-desktop' : ''}`
                }
              >
                <item.icon className="nav-link-icon" />
                {item.name}
              </NavLink>
            ))}
          </nav>
        </div>
      </aside>

      {/* Mobile menu button */}
      <button className="menu-button" onClick={() => setSidebarOpen(true)}>
        <FiMenu />
      </button>
    </>
  );
};

export default Sidebar;