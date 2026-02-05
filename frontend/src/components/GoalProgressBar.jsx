
import React from 'react';

const GoalProgressBar = ({ goal }) => {
  const percentage = Math.min((goal.currentAmount / goal.targetAmount) * 100, 100);
  const daysLeft = Math.ceil((new Date(goal.deadline) - new Date()) / (1000 * 60 * 60 * 24));
  
  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
      <div className="flex justify-between items-start mb-2">
        <h3 className="text-lg font-medium text-gray-900 dark:text-white">
          {goal.title}
        </h3>
        <span className={`px-2 py-1 text-xs rounded-full ${
          percentage >= 100 
            ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200' 
            : daysLeft < 30 
              ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200'
              : 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-200'
        }`}>
          {percentage >= 100 ? 'Completed' : `${daysLeft} days left`}
        </span>
      </div>
      <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
        {goal.description}
      </p>
      <div className="mb-2">
        <div className="flex justify-between text-sm mb-1">
          <span className="text-gray-700 dark:text-gray-300">
            ${goal.currentAmount.toLocaleString()}
          </span>
          <span className="text-gray-700 dark:text-gray-300">
            ${goal.targetAmount.toLocaleString()}
          </span>
        </div>
        <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2.5">
          <div
            className="bg-indigo-600 h-2.5 rounded-full"
            style={{ width: `${percentage}%` }}
          ></div>
        </div>
      </div>
      <div className="text-sm text-gray-600 dark:text-gray-400">
        {percentage.toFixed(0)}% completed
      </div>
    </div>
  );
};

export default GoalProgressBar;