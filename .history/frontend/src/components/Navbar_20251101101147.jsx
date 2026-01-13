import React, { useState, useContext } from 'react';
import { FinanceContext } from '../context/FinanceContext';
import { FiBell, FiUser, FiLogOut, FiSun, FiMoon } from 'react-icons/fi';
import './Navbar.css';

const Navbar = () => {
  const { user, logout, theme, setTheme, alerts } = useContext(FinanceContext);
  const [showProfile, setShowProfile] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);

  const toggleTheme = () => {
    setTheme(theme === 'light' ? 'dark' : 'light');
  };

  return (
    <header className="navbar">
      <div className="navbar-container">
        <div className="navbar-content">
          <div className="navbar-brand">
            <h1 className="navbar-title">
              Smart Finance Manager
            </h1>
          </div>
          <div className="navbar-actions">
            {/* Notifications */}
            <div className="notification-container">
              <button
                onClick={() => setShowNotifications(!showNotifications)}
                className="notification-button"
              >
                <FiBell className="notification-icon" />
                {alerts.length > 0 && (
                  <span className="notification-badge"></span>
                )}
              </button>
              {showNotifications && (
                <div className="notification-dropdown">
                  <div className="notification-header">
                    <h3 className="notification-title">
                      Notifications
                    </h3>
                  </div>
                  <div className="notification-list">
                    {alerts.length > 0 ? (
                      alerts.map((alert, index) => (
                        <div
                          key={index}
                          className={`notification-item ${
                            alert.type === 'danger' ? 'danger' : 'warning'
                          }`}
                        >
                          <p className="notification-text">
                            {alert.message}
                          </p>
                        </div>
                      ))
                    ) : (
                      <div className="notification-empty">
                        <p className="notification-empty-text">
                          No notifications
                        </p>
                      </div>
                    )}
                  </div>
                </div>
              )}
            </div>

            {/* Theme Toggle */}
            <button
              onClick={toggleTheme}
              className="theme-toggle-button"
            >
              {theme === 'light' ? (
                <FiMoon className="theme-icon" />
              ) : (
                <FiSun className="theme-icon" />
              )}
            </button>

            {/* Profile */}
            <div className="profile-container">
              <button
                onClick={() => setShowProfile(!showProfile)}
                className="profile-button"
              >
                <div className="profile-avatar">
                  {user?.name?.charAt(0).toUpperCase()}
                </div>
              </button>
              {showProfile && (
                <div className="profile-dropdown">
                  <div className="profile-header">
                    <p className="profile-name">
                      {user?.name}
                    </p>
                    <p className="profile-email">
                      {user?.email}
                    </p>
                  </div>
                  <button
                    onClick={logout}
                    className="logout-button"
                  >
                    <div className="logout-content">
                      <FiLogOut className="logout-icon" />
                      Sign out
                    </div>
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;