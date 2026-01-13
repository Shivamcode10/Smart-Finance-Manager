// frontend/src/components/Navbar.jsx
import React, { useState, useContext } from 'react';
import { FinanceContext } from '../context/FinanceContext';
import { FiBell, FiUser, FiLogOut, FiSun, FiMoon } from 'react-icons/fi';

// Import the CSS file
import './index.css';

const Navbar = () => {
  const { user, logout, theme, setTheme, alerts } = useContext(FinanceContext);
  const [showProfile, setShowProfile] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);

  const toggleTheme = () => {
    setTheme(theme === 'light' ? 'dark' : 'light');
  };

  return (
    <header className="navbar">
      <div className="navbar-wrapper">
        <div className="flex items-center">
          <h1 className="navbar-title">Smart Finance Manager</h1>
        </div>
        <div className="navbar-actions">
          {/* Notifications */}
          <div className="relative">
            <button
              onClick={() => setShowNotifications(!showNotifications)}
              className="icon-button"
              aria-label="View notifications"
            >
              <FiBell />
              {alerts.length > 0 && <span className="notification-dot"></span>}
            </button>
            {showNotifications && (
              <div className={`navbar-dropdown navbar-dropdown--wide`}>
                <div className="dropdown-header">
                  <h3 className="profile-name">Notifications</h3>
                </div>
                <div className="dropdown-content">
                  {alerts.length > 0 ? (
                    alerts.map((alert, index) => (
                      <div
                        key={index}
                        className={`navbar-alert-item ${
                          alert.type === 'danger'
                            ? 'navbar-alert-item--danger'
                            : 'navbar-alert-item--warning'
                        }`}
                      >
                        <p>{alert.message}</p>
                      </div>
                    ))
                  ) : (
                    <div className="no-notifications">
                      <p>No notifications</p>
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>

          {/* Theme Toggle */}
          <button
            onClick={toggleTheme}
            className="icon-button"
            aria-label="Toggle theme"
          >
            {theme === 'light' ? <FiMoon /> : <FiSun />}
          </button>

          {/* Profile */}
          <div className="relative">
            <button
              onClick={() => setShowProfile(!showProfile)}
              className="navbar-avatar"
              aria-label="View profile"
            >
              <div className="avatar-circle">
                {user?.name?.charAt(0).toUpperCase()}
              </div>
            </button>
            {showProfile && (
              <div className={`navbar-dropdown navbar-dropdown--narrow`}>
                <div className="dropdown-header">
                  <p className="profile-name">{user?.name}</p>
                  <p className="profile-email" title={user?.email}>
                    {user?.email}
                  </p>
                </div>
                <button onClick={logout} className="logout-button">
                  <FiLogOut />
                  Sign out
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;