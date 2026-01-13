import React, { useState, useEffect } from 'react';
import { FiAlertTriangle, FiTrendingUp, FiDollarSign, FiCalendar } from 'react-icons/fi';

const BudgetProgressCard = ({ budget, onUpdate }) => {
  const [animatedProgress, setAnimatedProgress] = useState(0);
  const [timeLeft, setTimeLeft] = useState('');
  const [isHovered, setIsHovered] = useState(false);

  const percentage = Math.min((budget.spent / budget.amount) * 100, 100);
  const remaining = budget.amount - budget.spent;
  const isOverBudget = percentage >= 100;
  const isNearLimit = percentage >= 80 && percentage < 100;

  // Animate progress bar on mount
  useEffect(() => {
    const timer = setTimeout(() => {
      setAnimatedProgress(percentage);
    }, 100);
    return () => clearTimeout(timer);
  }, [percentage]);

  // Calculate time left
  useEffect(() => {
    const now = new Date();
    const endDate = new Date(budget.endDate);
    const diffTime = endDate - now;
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    
    if (diffDays > 0) {
      setTimeLeft(`${diffDays} days left`);
    } else {
      setTimeLeft('Expired');
    }
  }, [budget]);

  const getStatusColor = () => {
    if (isOverBudget) return 'bg-red-500';
    if (isNearLimit) return 'bg-yellow-500';
    return 'bg-green-500';
  };

  const getStatusTextColor = () => {
    if (isOverBudget) return 'text-red-600 dark:text-red-400';
    if (isNearLimit) return 'text-yellow-600 dark:text-yellow-400';
    return 'text-green-600 dark:text-green-400';
  };

  const getSpendingRate = () => {
    const now = new Date();
    const startDate = new Date(budget.startDate);
    const totalDays = Math.ceil((budget.endDate - startDate) / (1000 * 60 * 60 * 24));
    const daysPassed = Math.ceil((now - startDate) / (1000 * 60 * 60 * 24));
    const expectedSpent = (budget.amount / totalDays) * daysPassed;
    
    return {
      rate: (budget.spent / expectedSpent) * 100,
      isOverspending: budget.spent > expectedSpent
    };
  };

  const spendingRate = getSpendingRate();

  return (
    <div 
      className={`bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 relative overflow-hidden transition-all duration-300 transform hover:scale-105 ${
        isOverBudget ? 'border-l-4 border-red-500' : 
        isNearLimit ? 'border-l-4 border-yellow-500' : 
        'border-l-4 border-green-500'
      }`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Alert Badge */}
      {(isOverBudget || isNearLimit) && (
        <div className="absolute top-4 right-4">
          <div className={`p-2 rounded-full ${
            isOverBudget ? 'bg-red-100 dark:bg-red-900/20' : 'bg-yellow-100 dark:bg-yellow-900/20'
          }`}>
            <FiAlertTriangle className={`h-5 w-5 ${
              isOverBudget ? 'text-red-600 dark:text-red-400' : 'text-yellow-600 dark:text-yellow-400'
            }`} />
          </div>
        </div>
      )}

      {/* Header */}
      <div className="flex justify-between items-start mb-4">
        <div>
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
            {budget.category}
          </h3>
          <p className="text-sm text-gray-500 dark:text-gray-400 flex items-center">
            <FiCalendar className="h-4 w-4 mr-1" />
            {budget.period.charAt(0).toUpperCase() + budget.period.slice(1)} Budget
          </p>
        </div>
        <div className="text-right">
          <p className="text-sm text-gray-500 dark:text-gray-400">{timeLeft}</p>
          <p className={`text-xs font-medium ${getStatusTextColor()}`}>
            {percentage.toFixed(0)}% used
          </p>
        </div>
      </div>

      {/* Main Progress Bar */}
      <div className="mb-4">
        <div className="flex justify-between text-sm mb-2">
          <span className="text-gray-700 dark:text-gray-300">
            Spent: <span className="font-semibold">${budget.spent.toLocaleString()}</span>
          </span>
          <span className="text-gray-700 dark:text-gray-300">
            Budget: <span className="font-semibold">${budget.amount.toLocaleString()}</span>
          </span>
        </div>
        
        <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-3 overflow-hidden">
          <div
            className={`h-full rounded-full transition-all duration-1000 ease-out ${getStatusColor()}`}
            style={{ width: `${animatedProgress}%` }}
          >
            {/* Animated shimmer effect */}
            <div className="h-full bg-white bg-opacity-20 animate-pulse"></div>
          </div>
        </div>
      </div>

      {/* Additional Details (shown on hover) */}
      {isHovered && (
        <div className="mt-4 pt-4 border-t border-gray-200 dark:border-gray-700 space-y-2">
          {/* Remaining Amount */}
          <div className="flex justify-between items-center">
            <span className="text-sm text-gray-600 dark:text-gray-400">Remaining:</span>
            <span className={`text-sm font-semibold ${
              remaining < 0 ? 'text-red-600 dark:text-red-400' : 'text-green-600 dark:text-green-400'
            }`}>
              ${Math.abs(remaining).toLocaleString()}
              {remaining < 0 ? ' over' : ' left'}
            </span>
          </div>

          {/* Spending Rate */}
          <div className="flex justify-between items-center">
            <span className="text-sm text-gray-600 dark:text-gray-400">Spending Rate:</span>
            <span className={`text-sm font-semibold ${
              spendingRate.isOverspending ? 'text-red-600 dark:text-red-400' : 'text-green-600 dark:text-green-400'
            }`}>
              {spendingRate.rate.toFixed(0)}% of expected
              {spendingRate.isOverspending && ' ⚠️'}
            </span>
          </div>

          {/* Daily Average */}
          <div className="flex justify-between items-center">
            <span className="text-sm text-gray-600 dark:text-gray-400">Daily Average:</span>
            <span className="text-sm font-semibold text-gray-900 dark:text-white">
              ${(budget.spent / Math.max(1, Math.ceil((new Date() - new Date(budget.startDate)) / (1000 * 60 * 60 * 24)))).toFixed(2)}
            </span>
          </div>
        </div>
      )}

      {/* Quick Actions */}
      <div className="mt-4 flex space-x-2">
        <button
          onClick={() => onUpdate(budget)}
          className="flex-1 px-3 py-2 bg-indigo-100 dark:bg-indigo-900/20 text-indigo-700 dark:text-indigo-300 text-sm rounded-md hover:bg-indigo-200 dark:hover:bg-indigo-900/30 transition-colors duration-200"
        >
          Adjust Budget
        </button>
        <button
          className="flex-1 px-3 py-2 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 text-sm rounded-md hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors duration-200"
        >
          View Details
        </button>
      </div>
    </div>
  );
};

export default BudgetProgressCard;