// frontend/src/components/Navbar.jsx
import React, { useState, useContext } from 'react';
import { FinanceContext } from '../context/FinanceContext';
import { FiBell, FiUser, FiLogOut, FiSun, FiMoon } from 'react-icons/fi';

const Navbar = () => {
  const { user, logout, theme, setTheme, alerts } = useContext(FinanceContext);
  const [showProfile, setShowProfile] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);

  const toggleTheme = () => {
    setTheme(theme === 'light' ? 'dark' : 'light');
  };

  // Base styles
  const isDark = theme === 'dark';
  
  const headerStyle = {
    backgroundColor: isDark ? '#1f2937' : '#ffffff',
    boxShadow: '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
    borderBottom: `1px solid ${isDark ? '#374151' : '#e5e7eb'}`,
    transition: 'background-color 0.2s ease'
  };

  const containerStyle = {
    paddingLeft: '1rem',
    paddingRight: '1rem',
    '@media (min-width: 640px)': {
      paddingLeft: '1.5rem',
      paddingRight: '1.5rem'
    },
    '@media (min-width: 1024px)': {
      paddingLeft: '2rem',
      paddingRight: '2rem'
    }
  };

  const contentStyle = {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    height: '4rem'
  };

  const titleStyle = {
    fontSize: '1.25rem',
    fontWeight: '600',
    color: isDark ? '#ffffff' : '#1f2937'
  };

  const actionsStyle = {
    display: 'flex',
    alignItems: 'center',
    gap: '1rem'
  };

  const buttonStyle = {
    padding: '0.25rem',
    borderRadius: '9999px',
    color: isDark ? '#d1d5db' : '#4b5563',
    backgroundColor: 'transparent',
    border: 'none',
    cursor: 'pointer',
    transition: 'all 0.2s ease',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  };

  const buttonHoverStyle = {
    color: isDark ? '#ffffff' : '#111827',
    backgroundColor: isDark ? '#374151' : '#f3f4f6'
  };

  const buttonFocusStyle = {
    outline: 'none',
    boxShadow: '0 0 0 2px #6366f1'
  };

  const dropdownStyle = {
    position: 'absolute',
    right: '0',
    top: '100%',
    marginTop: '0.5rem',
    backgroundColor: isDark ? '#1f2937' : '#ffffff',
    borderRadius: '0.375rem',
    boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
    padding: '0.25rem 0',
    zIndex: '20',
    border: `1px solid ${isDark ? '#374151' : '#e5e7eb'}`
  };

  const profileAvatarStyle = {
    height: '2rem',
    width: '2rem',
    borderRadius: '50%',
    backgroundColor: '#6366f1',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    color: '#ffffff',
    fontWeight: '500',
    transition: 'background-color 0.2s ease'
  };

  const profileAvatarHoverStyle = {
    backgroundColor: '#4f46e5'
  };

  const profileButtonStyle = {
    display: 'flex',
    alignItems: 'center',
    fontSize: '0.875rem',
    borderRadius: '9999px',
    backgroundColor: 'transparent',
    border: 'none',
    cursor: 'pointer',
    transition: 'all 0.2s ease'
  };

  const dropdownHeaderStyle = {
    padding: '0.5rem 1rem',
    borderBottom: `1px solid ${isDark ? '#374151' : '#e5e7eb'}`
  };

  const dropdownNameStyle = {
    fontSize: '0.875rem',
    fontWeight: '500',
    color: isDark ? '#ffffff' : '#111827'
  };

  const dropdownEmailStyle = {
    fontSize: '0.75rem',
    color: isDark ? '#9ca3af' : '#6b7280',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap'
  };

  const dropdownItemStyle = {
    display: 'block',
    width: '100%',
    textAlign: 'left',
    padding: '0.5rem 1rem',
    fontSize: '0.875rem',
    color: isDark ? '#d1d5db' : '#374151',
    backgroundColor: 'transparent',
    border: 'none',
    cursor: 'pointer',
    transition: 'background-color 0.2s ease'
  };

  const dropdownItemHoverStyle = {
    backgroundColor: isDark ? '#374151' : '#f3f4f6'
  };

  const dropdownItemContentStyle = {
    display: 'flex',
    alignItems: 'center'
  };

  const dropdownItemIconStyle = {
    marginRight: '0.5rem',
    height: '1rem',
    width: '1rem'
  };

  const notificationBadgeStyle = {
    position: 'absolute',
    top: '0',
    right: '0',
    height: '0.5rem',
    width: '0.5rem',
    borderRadius: '50%',
    backgroundColor: '#ef4444',
    animation: 'pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite'
  };

  const notificationDropdownStyle = {
    ...dropdownStyle,
    width: '20rem'
  };

  const notificationHeaderStyle = {
    padding: '0.5rem 1rem',
    borderBottom: `1px solid ${isDark ? '#374151' : '#e5e7eb'}`
  };

  const notificationTitleStyle = {
    fontSize: '0.875rem',
    fontWeight: '500',
    color: isDark ? '#ffffff' : '#111827'
  };

  const notificationListStyle = {
    maxHeight: '15rem',
    overflowY: 'auto'
  };

  const getNotificationItemStyle = (type) => ({
    padding: '0.75rem 1rem',
    borderBottom: `1px solid ${isDark ? '#374151' : '#f3f4f6'}`,
    transition: 'background-color 0.2s ease',
    backgroundColor: type === 'danger' 
      ? (isDark ? 'rgba(127, 29, 29, 0.2)' : '#fef2f2')
      : (isDark ? 'rgba(146, 64, 14, 0.2)' : '#fffbeb')
  });

  const notificationMessageStyle = {
    fontSize: '0.875rem',
    color: isDark ? '#e5e7eb' : '#1f2937'
  };

  const notificationEmptyStyle = {
    padding: '0.75rem 1rem'
  };

  const notificationEmptyTextStyle = {
    fontSize: '0.875rem',
    color: isDark ? '#9ca3af' : '#6b7280'
  };

  return (
    <>
      <style>
        {`
          @keyframes pulse {
            0%, 100% {
              opacity: 1;
            }
            50% {
              opacity: .5;
            }
          }
        `}
      </style>
      <header style={headerStyle}>
        <div style={containerStyle}>
          <div style={contentStyle}>
            <div style={actionsStyle}>
              <h1 style={titleStyle}>
                Smart Finance Manager
              </h1>
            </div>
            <div style={actionsStyle}>
              {/* Notifications */}
              <div style={{ position: 'relative' }}>
                <button
                  onClick={() => setShowNotifications(!showNotifications)}
                  style={buttonStyle}
                  onMouseEnter={(e) => Object.assign(e.target.style, buttonHoverStyle)}
                  onMouseLeave={(e) => Object.assign(e.target.style, buttonStyle)}
                  onFocus={(e) => Object.assign(e.target.style, buttonFocusStyle)}
                  onBlur={(e) => Object.assign(e.target.style, buttonStyle)}
                >
                  <FiBell style={{ height: '1.5rem', width: '1.5rem' }} />
                  {alerts.length > 0 && (
                    <span style={notificationBadgeStyle}></span>
                  )}
                </button>
                {showNotifications && (
                  <div style={notificationDropdownStyle}>
                    <div style={notificationHeaderStyle}>
                      <h3 style={notificationTitleStyle}>
                        Notifications
                      </h3>
                    </div>
                    <div style={notificationListStyle}>
                      {alerts.length > 0 ? (
                        alerts.map((alert, index) => (
                          <div
                            key={index}
                            style={getNotificationItemStyle(alert.type)}
                          >
                            <p style={notificationMessageStyle}>
                              {alert.message}
                            </p>
                          </div>
                        ))
                      ) : (
                        <div style={notificationEmptyStyle}>
                          <p style={notificationEmptyTextStyle}>
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
                style={buttonStyle}
                onMouseEnter={(e) => Object.assign(e.target.style, buttonHoverStyle)}
                onMouseLeave={(e) => Object.assign(e.target.style, buttonStyle)}
                onFocus={(e) => Object.assign(e.target.style, buttonFocusStyle)}
                onBlur={(e) => Object.assign(e.target.style, buttonStyle)}
              >
                {theme === 'light' ? (
                  <FiMoon style={{ height: '1.5rem', width: '1.5rem' }} />
                ) : (
                  <FiSun style={{ height: '1.5rem', width: '1.5rem' }} />
                )}
              </button>

              {/* Profile */}
              <div style={{ position: 'relative' }}>
                <button
                  onClick={() => setShowProfile(!showProfile)}
                  style={profileButtonStyle}
                  onFocus={(e) => Object.assign(e.target.style, buttonFocusStyle)}
                  onBlur={(e) => Object.assign(e.target.style, profileButtonStyle)}
                >
                  <div 
                    style={profileAvatarStyle}
                    onMouseEnter={(e) => Object.assign(e.target.style, profileAvatarHoverStyle)}
                    onMouseLeave={(e) => Object.assign(e.target.style, profileAvatarStyle)}
                  >
                    {user?.name?.charAt(0).toUpperCase()}
                  </div>
                </button>
                {showProfile && (
                  <div style={dropdownStyle}>
                    <div style={dropdownHeaderStyle}>
                      <p style={dropdownNameStyle}>
                        {user?.name}
                      </p>
                      <p style={dropdownEmailStyle}>
                        {user?.email}
                      </p>
                    </div>
                    <button
                      onClick={logout}
                      style={dropdownItemStyle}
                      onMouseEnter={(e) => Object.assign(e.target.style, dropdownItemHoverStyle)}
                      onMouseLeave={(e) => Object.assign(e.target.style, dropdownItemStyle)}
                    >
                      <div style={dropdownItemContentStyle}>
                        <FiLogOut style={dropdownItemIconStyle} />
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
    </>
  );
};

export default Navbar;