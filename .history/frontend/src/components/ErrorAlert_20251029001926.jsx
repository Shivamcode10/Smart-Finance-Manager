import React, { useContext } from 'react';
import { FinanceContext } from '../context/FinanceContext';
import { FiX, FiAlertCircle } from 'react-icons/fi';

const ErrorAlert = () => {
  const { error, clearError } = useContext(FinanceContext);

  if (!error) return null;

  return (
    <div className="fixed bottom-4 right-4 bg-red-100 dark:bg-red-900/20 border border-red-400 dark:border-red-600 text-red-700 dark:text-red-300 px-4 py-3 rounded-lg shadow-lg z-50 max-w-md">
      <div className="flex items-center">
        <FiAlertCircle className="h-5 w-5 mr-2 flex-shrink-0" />
        <span className="text-sm">{error}</span>
        <button
          onClick={clearError}
          className="ml-auto pl-3 text-red-500 hover:text-red-700 dark:text-red-400 dark:hover:text-red-200"
        >
          <FiX className="h-4 w-4" />
        </button>
      </div>
    </div>
  );
};

export default ErrorAlert;