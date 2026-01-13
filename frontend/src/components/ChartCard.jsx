// frontend/src/components/ChartCard.jsx
import React from 'react';

const ChartCard = ({ title, children, className = '' }) => {
  return (
    <div className={`bg-white dark:bg-gray-800 rounded-lg shadow p-6 ${className}`}>
      <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">
        {title}
      </h3>
      <div className="h-64">{children}</div>
    </div>
  );
};

export default ChartCard;