import React, { useState, useEffect } from 'react';
import { FiCheckCircle, FiEdit, FiTrash2 } from 'react-icons/fi';

const RealTimeNotification = ({ type, message }) => {
  const [visible, setVisible] = useState(true);
  
  useEffect(() => {
    const timer = setTimeout(() => {
      setVisible(false);
    }, 3000);
    
    return () => clearTimeout(timer);
  }, []);

  if (!visible) return null;

  const getIcon = () => {
    switch (type) {
      case 'new':
        return <FiCheckCircle className="text-green-500" />;
      case 'updated':
        return <FiEdit className="text-blue-500" />;
      case 'deleted':
        return <FiTrash2 className="text-red-500" />;
      default:
        return null;
    }
  };

  return (
    <div className="fixed top-20 right-4 bg-white dark:bg-gray-800 rounded-lg shadow-lg p-4 z-50 animate-pulse">
      <div className="flex items-center">
        {getIcon()}
        <span className="ml-2 text-sm">{message}</span>
      </div>
    </div>
  );
};

export default RealTimeNotification;